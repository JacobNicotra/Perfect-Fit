from .db import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)


    puzzles_relation = db.relationship("Puzzle", back_populates="category_relation", cascade="all, delete")
