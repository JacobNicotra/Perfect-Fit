from .db import db
from .user import User
from .puzzle import Puzzle


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    puzzleId = db.Column(db.Integer, db.ForeignKey(Puzzle.id), nullable=False)

    puzzle_relation = db.relationship("Puzzle", back_populates="images_relation", cascade="all, delete")
 