from .db import db
from .user import User
from .city import City


class Puzzle(db.Model):
    __tablename__ = "puzzles"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    cityId = db.Column(db.Integer, db.ForeignKey(City.id))
    piece_count = db.Column(db.Integer)
    image = db.Column(db.Text)
    description = db.Column(db.Text)

    owner_relation = db.relationship("User", back_populates="puzzles_relation")
    city_relation = db.relationship("City", back_populates="puzzles_relation")
    rating_relation = db.relationship("PuzzleReview", back_populates="reviewer_relation", cascade="all, delete")
    images_relation = db.relationship("Image", back_populates="puzzle_relation")
    previous_owners_relation = db.relationship("PreviousOwner", back_populates="puzzle_relation", cascade="all, delete")

    # swap_give_relation = db.relationship("Swap", back_populates="give_puzzle_relation", cascade="all, delete")
    # swap_give_relation = db.relationship("Swap", back_populates="get_puzzle_relation", cascade="all, delete")
    swap_give_relation = db.relationship("Swap", foreign_keys="[Swap.givePuzzleId]", cascade="all, delete")
    swap_get_relation = db.relationship("Swap", foreign_keys="[Swap.getPuzzleId]", cascade="all, delete")

    # channels_relation = db.relationship(
    #     "Channel", back_populates="server_relation", cascade="all, delete")
