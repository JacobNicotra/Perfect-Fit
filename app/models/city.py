from .db import db


class City(db.Model):
    __tablename__ = "cities"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)

    # owner_relation = db.relationship("User", back_populates="servers_relation")
    # channels_relation = db.relationship(
    #     "Channel", back_populates="server_relation", cascade="all, delete")

    puzzles_relation = db.relationship("Puzzle", back_populates="city_relation", cascade="all, delete")
    user_relation = db.relationship("User", back_populates="city_relation", cascade="all, delete")
