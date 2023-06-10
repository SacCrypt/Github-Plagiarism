from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=True, unique=True)
    email = db.Column(db.String(120), nullable=True, unique=True)
    password = db.Column(db.String(60), nullable=True)
    # plagiarism = db.relationship('Plague', lazy=True, backref="author")

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"User('{self.username} {self.email} {self.plagiarism}')"


class Plague(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    projectName = db.Column(db.String(40), nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    repository = db.Column(db.String(100), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)





