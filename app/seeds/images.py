from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_Images():
    howl1 = Image(
        puzzleId=1, image="https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg")
    howl2 = Image(
        puzzleId=1, image="https://m.media-amazon.com/images/I/91zTsJxtz2L._AC_SX425_.jpg")
    howl3 = Image(
        puzzleId=1, image="https://i.pinimg.com/originals/82/84/6a/82846a5da272348f61a2728472cbcb2b.jpg")

    death_star1 = Image(
        puzzleId=2, image="https://cdn11.bigcommerce.com/s-gyhhtwx4/images/stencil/1280x1280/products/3099/7721/079346021024_FullProductShot_Landscape__09170.1597434248.jpg?c=2")
    death_star2 = Image(
        puzzleId=2, image="https://m.media-amazon.com/images/I/91qbUSOKHaL._AC_SX425_.jpg")

    everest1 = Image(
        puzzleId=3, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVuZhky_GDGYq6N2DNgi9aIR5boi_qKyqXrRG31oBb9-0m0HAisMSIhBBooMO1l1jCnI&usqp=CAU")
  
    db.session.add(howl1)
    db.session.add(howl2)
    db.session.add(howl3)

    db.session.add(death_star1)
    db.session.add(death_star2)

    db.session.add(everest1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
