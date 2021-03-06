from .db import db
from .user import User
from .puzzle import Puzzle


class Swap(db.Model):
    __tablename__ = "swaps"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    recipientId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    userUsername = db.Column(db.Text)
    recipientUsername = db.Column(db.Text)
    getPuzzleId = db.Column(db.Integer, db.ForeignKey(Puzzle.id), nullable=False)
    givePuzzleId = db.Column(db.Integer, db.ForeignKey(Puzzle.id), nullable=False)
    message = db.Column(db.Text)
    userAccept = db.Column(db.Boolean, default=False)
    recipientAccept = db.Column(db.Boolean, default=False)

    # owner_relation = db.relationship("User", back_populates="swap_relation")
    # recipient_relation = db.relationship("User", back_populates="swap_relation")
    owner_relation = db.relationship("User", foreign_keys=[userId])
    recipient_relation = db.relationship("User", foreign_keys=[recipientId])

    give_puzzle_relation = db.relationship("Puzzle", foreign_keys=[givePuzzleId])
    get_puzzle_relation = db.relationship("Puzzle", foreign_keys=[getPuzzleId])

    # channels_relation = db.relationship(
    #     "Channel", back_populates="server_relation", cascade="all, delete")
