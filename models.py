from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

import uuid

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(20), nullable=True, unique=True)
    email = db.Column(db.String(120), nullable=True, unique=True)
    password = db.Column(db.String(60), nullable=True)
    # plagiarism = db.relationship('Plague', lazy=True, backref="author")

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"User('{self.username} {self.email}')"


class Plague(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    projectName = db.Column(db.String(40), nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    repository = db.Column(db.String(100), nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
