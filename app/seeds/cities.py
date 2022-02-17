from app.models import db, City


# Adds a demo user, you can add other users here if you want
def seed_cities():
    san_francisco = City(
        title='San Francisco')
    new_York = City(
         title='New York')
    chicago = City(
         title='Chicago')
    los_angeles= City(
         title='Los Angeles')
    miami = City(
         title='Miami')
    boston = City(
         title='Boston')
    denver = City(
         title='Denver')
    san_diego = City(
         title='San Diego')
    dallas = City(
         title='Dallas')
    las_vegas = City(
         title='Las Vegas')
    seattle = City(
         title='Seattle')
    philadelphia = City(
         title='Philadelphia')
    houston = City(
         title='Houston')
    phoenix = City(
         title='Phoenix')

    db.session.add(san_francisco)
    db.session.add(new_York)
    db.session.add(chicago)
    db.session.add(los_angeles)
    db.session.add(miami)
    db.session.add(boston)
    db.session.add(denver)
    db.session.add(san_diego)
    db.session.add(dallas)
    db.session.add(las_vegas)
    db.session.add(seattle)
    db.session.add(philadelphia)
    db.session.add(houston)
    db.session.add(phoenix)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cities():
    db.session.execute('TRUNCATE cities RESTART IDENTITY CASCADE;')
    db.session.commit()
