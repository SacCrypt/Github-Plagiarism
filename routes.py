import shutil
from logger import logger
from flask import Flask, request
from validation import Sanitize
from file_operations import FileOperations
import os
from Detect import Plagiarism
from vs_github import Git
import json
from models import db, User, Plague


class Router:
    WORKING_DIRECTORY = os.getcwd()
    app = Flask(__name__)
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

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
        print("Hit")
        if request.files:
            zip_file = request.files['file']
            sanitize_object = Sanitize(zip_file)
            if sanitize_object.check_file_name() and sanitize_object.check_allowed_file_types():
                logger.info("Successfully validated file.")
                project_name = sanitize_object.zip_file.filename
                extension = sanitize_object.extension
                extraction_directory = os.path.join(Router.WORKING_DIRECTORY, "project")
                file_operation_object = FileOperations(zip_file, extraction_directory, extension, project_name)
                file_operation_object.make_directory(Router.WORKING_DIRECTORY, "project")
                file_operation_object.save_file()

                git_object = Git(extraction_directory, project_name.split(".")[0])
                plagiarism_object = Plagiarism(extraction_directory,
                                               git_object.language_used,
                                               project_name=project_name.split(".")[0]
                                               )
                repositories = git_object.search_repository()
                for x in repositories[:10]:
                    git_object.clone_repository(x)
                    results = plagiarism_object.analyze(os.path.join(extraction_directory, x.name))
                    print(f"Similarity: {results}")
                    percent = sum(results) / len(results)
                    if "main" in project_name:
                        project_name = project_name[:-5]
                    else:
                        project_name = project_name[:-7]
                    db_plague = Plague(projectName=f"{project_name}", percentage=percent,
                                       repository=x.clone_url[:-5])
                    if percent >= 0.80:
                        print("Plagiarized material detected.")
                    else:
                        try:
                            shutil.rmtree(os.path.join(extraction_directory, x.name))
                            print("Directory Deleted Successfully.")
                        except Exception as e:
                            print("Error occurred when deleting a directory", e)
                    db.session.add(db_plague)
                    db.session.commit()
                    print("Successful Commit")

                    return json.dumps({"Message": "Successful analysis", "percentage": percent*100,
                                       "redirect_id": db_plague.id})
        return json.dumps({"Message": "Failure"})


if __name__ == "__main__":
    router = Router()
    router.run()



