from app.models import db, Puzzle


# Adds a demo user, you can add other users here if you want
def seed_puzzles():
    howl = Puzzle(
        title="Howl's Moving Castle", userId=1, piece_count=1000, cityId=1)
    death_star = Puzzle(
        title='StarWars Death Star', userId=2, piece_count=500, cityId=2, description="Death Star fully constructed!")
    everest = Puzzle(
        title='Mount Everest', userId=3, piece_count=2000, cityId=3)

    db.session.add(howl)
    db.session.add(death_star)
    db.session.add(everest)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_puzzles():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
