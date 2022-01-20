from app.models import db, Swap


# Adds a demo user, you can add other users here if you want
def seed_swaps():
    swap1 = Swap(
        userId=1, recipientId=2, getPuzzleId=2, givePuzzleId=1, message="i'd like to trade for the death start please")
    swap2 = Swap(
        userId=3, recipientId=2, getPuzzleId=2, givePuzzleId=3, message="i want star wars puzzles")

    db.session.add(swap1)
    db.session.add(swap2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_swaps():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
