from .db import db
from .user import User
from .puzzle import Puzzle


class PuzzleReview(db.Model):
    __tablename__ = "puzzleReviews"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    puzzleId = db.Column(db.Integer, db.ForeignKey(Puzzle.id), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)

    user_relation = db.relationship("User", back_populates="review_relation")
    reviewer_relation = db.relationship("Puzzle", back_populates="rating_relation")
    # channels_relation = db.relationship(
    #     "Channel", back_populates="server_relation", cascade="all, delete")
