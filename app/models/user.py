from .db import db
from .city import City
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    cityId = db.Column(db.Integer, db.ForeignKey(City.id), nullable=False)
    authority = db.Column(db.Integer) 

    city_relation = db.relationship("City", back_populates="user_relation")
    puzzles_relation = db.relationship("Puzzle", back_populates="owner_relation", cascade="all, delete")

    # swap_owner_relation = db.relationship("Swap", back_populates="owner_relation", cascade="all, delete")
    # swap_recipient_relation = db.relationship("Swap", back_populates="recipient_relation", cascade="all, delete")
    swap_owner_relation = db.relationship("Swap", foreign_keys="[Swap.userId]", cascade="all, delete")
    swap_recipient_relation = db.relationship("Swap", foreign_keys="[Swap.recipientId]", cascade="all, delete")

    review_relation = db.relationship("PuzzleReview", back_populates="user_relation", cascade="all, delete")
    previous_owners_relation = db.relationship("PreviousOwner", back_populates="user_relation", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
