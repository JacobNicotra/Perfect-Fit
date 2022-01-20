from .db import db
from .user import User
from .puzzle import Puzzle


class PreviousOwner(db.Model):
    __tablename__ = "previousOwners"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    puzzleId = db.Column(db.Integer, db.ForeignKey(Puzzle.id), nullable=False)

    user_relation = db.relationship("User", back_populates="previous_owners_relation")
    puzzle_relation = db.relationship("Puzzle", back_populates="previous_owners_relation")
 