import shutil
from logger import logger
from flask import Flask, request, jsonify
from validation import Sanitize
from file_operations import FileOperations
import os
from Detect import Plagiarism
from vs_github import Git
import json
from models import db, User, Plague
from uuid import UUID


class Router:
    WORKING_DIRECTORY = os.getcwd()
    app = Flask(__name__)
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///your_database.db"

    db.init_app(app)
    app.app_context().push()
    db.create_all()

    def __init__(self):
        pass

    @staticmethod
    def run():
        Router.app.run(debug=True, port=5000, use_reloader=False)

    @app.route("/api/upload", methods=['GET', 'POST'])
    def root():
        # print("Hit")
        if request.files:
            zip_file = request.files['file']
            sanitize_object = Sanitize(zip_file)
            if sanitize_object.check_file_name() and sanitize_object.check_allowed_file_types():
                logger.info("Successfully validated file.")
                project_name = sanitize_object.zip_file.filename
                extension = sanitize_object.extension
                extraction_directory = os.path.join(
                    Router.WORKING_DIRECTORY, "project")
                file_operation_object = FileOperations(
                    zip_file, extraction_directory, extension, project_name)
                file_operation_object.make_directory(
                    Router.WORKING_DIRECTORY, "project")
                file_operation_object.save_file()

                git_object = Git(extraction_directory,
                                 project_name.split(".")[0])
                plagiarism_object = Plagiarism(extraction_directory,
                                               git_object.language_used,
                                               project_name=project_name.split(".")[
                                                   0]
                                               )
                repositories = git_object.search_repository()

                for x in repositories[:10]:
                    print(extraction_directory, x.name, x.full_name)
                    if os.path.exists(os.path.join(extraction_directory, x.name)):
                        logger.info("Path exists, switching to cache")
                        with open(os.path.join(extraction_directory, x.name, "result.json")) as f:
                            data = json.load(f)

                            return jsonify(data)
                    git_object.clone_repository(x)
                    results = plagiarism_object.analyze(
                        os.path.join(extraction_directory, x.name))
                    print(f"Similarity: {results}")
                    percent = (sum(results) / len(results)) * 100
                    db_plague = Plague(projectName=f"{project_name.replace('-master', '').replace('-main', '')}",
                                       percentage=percent,
                                       repository=x.clone_url[:-6])
                    if percent >= 0.80:
                        print("Plagiarized material detected.")
                    else:
                        try:
                            shutil.rmtree(os.path.join(
                                extraction_directory, x.name))
                            print("Directory Deleted Successfully.")
                        except Exception as e:
                            print("Error occurred when deleting a directory", e)
                    db.session.add(db_plague)
                    db.session.commit()
                    print("Successful Commit")
                    content = {"Message": "Successful analysis", "percentage": percent,
                               "redirect_id": db_plague.id}
                    with open(f"{os.path.join(extraction_directory, x.name)}/result.json", "w") as f:
                        json.dump(content, f)
                    return jsonify(content)
        return jsonify({"Message": "Failure"})

    @app.route("/api/get_reports/<string:item_id>", methods=["GET"])
    def get_item_with_id(item_id):
        report = Plague.query.get(item_id)

        if report:
            print(report)
            return jsonify(report.as_dict())
        else:
            return jsonify({'message': 'Item not found'})

    @app.route("/api/signup", methods=["POST"])
    def register():
        json_data = request.get_json()
        name = json_data['name']
        email = json_data['email']
        password = json_data['password']

        user_register = User(username=name, email=email)
        user_register.set_password(password)

        db.session.add(user_register)
        db.session.commit()
        logger.info("Committed User Successfully")
        return {"Message": "Successful"}


if __name__ == "__main__":
    router = Router()
    router.run()
