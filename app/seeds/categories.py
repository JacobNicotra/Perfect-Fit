from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    movies_tv = Category(
        title='Movies / TV')
    nature = Category(
        title='Nature')
    architecture = Category(
        title='Architecture')
    landmarks = Category(
        title='Landmarks')
    history = Category(
        title='History')
    fantasy = Category(
        title='Fantasy')
    animals = Category(
        title='Animals')
    kids = Category(
        title='Kids')
    art = Category(
        title='Art')
    religious = Category(
        title='Religious')
    food = Category(
        title='Food')
    comedy = Category(
        title='Comedy')
    holidays = Category(
        title='Holidays')
    celebrities = Category(
        title='Celebrities')
    sport = Category(
        title='Sport')
    space = Category(
        title='Space')
    technology = Category(
        title='Technology')
    cars = Category(
        title='Cars')
    Miscellaneous = Category(
        title='Miscellaneous')
  

    db.session.add(movies_tv)
    db.session.add(nature)
    db.session.add(architecture)
    db.session.add(landmarks)
    db.session.add(history)
    db.session.add(fantasy)
    db.session.add(animals)
    db.session.add(kids)
    db.session.add(art)
    db.session.add(religious)
    db.session.add(food)
    db.session.add(comedy)
    db.session.add(holidays)
    db.session.add(celebrities)
    db.session.add(sport)
    db.session.add(space)
    db.session.add(technology)
    db.session.add(cars)
    db.session.add(Miscellaneous)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
