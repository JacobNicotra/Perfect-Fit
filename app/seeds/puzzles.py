from app.models import db, Puzzle


# Adds a demo user, you can add other users here if you want
def seed_puzzles():
    howl = Puzzle(
        title="Howl's Moving Castle", userId=1, piece_count=1000,
        cityId=1, description="Great puzzle for a great movie! The sky was particularly difficult for me. Should offer a real challeng, but worth it!",
        categoryId=1, delivery='pickup', difficulty='hard',
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsUtlyO1fM_iEQBQ8wr87nPZ_ACp43lNtlSced8IuqHLnRz4FwH1P3lbldySYBBMFDxY&usqp=CAU"
    )
    death_star = Puzzle(
        title='StarWars Death Star', userId=2, piece_count=500,
        cityId=2, description="Death Star fully constructed!",
        categoryId=1, delivery='delivery', difficulty='easy',
        image="https://m.media-amazon.com/images/I/81RjC2owKZL._AC_SL1500_.jpg")
    everest = Puzzle(
        title='Mount Everest', userId=3, piece_count=2000, cityId=3,
        categoryId=2, delivery='either', difficulty='expert',
        description="Beautiful image of Mount Everest. Puzzle in great condition. I had so much fun piecing this one together!",
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK7jxD2DgoTMuCYDqJkDPd2ulBSAHe1NS1mA&usqp=CAU")

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
    db.session.execute('TRUNCATE puzzles RESTART IDENTITY CASCADE;')
    db.session.commit()
