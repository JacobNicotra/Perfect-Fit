from flask import Blueprint, jsonify, request
from app.models import db, User, Puzzle, Image
from sqlalchemy.exc import IntegrityError
from flask_login import current_user

puzzle_routes = Blueprint('servers', __name__)

# http://localhost:5000/channels/?title=firsttitle&description=someDescriptiveStuff&ownerId=1


@puzzle_routes.route('/')
def get_all_puzzles():
    # if current_user.is_authenticated:
    #     user = current_user.to_dict()

    # servers = Server.query.filter(Server.ownerId == user.id).all()
    puzzles = Puzzle.query.all()
    if puzzles:
        puzzle_list = [{'id': puzzle.id, 'title': puzzle.title, 'userId': puzzle.userId,
                        'cityId': puzzle.cityId if puzzle.cityId else None,
                        'pieceCount': puzzle.piece_count if puzzle.piece_count else None,
                        'image': puzzle.image if puzzle.image else None,
                        'description': puzzle.description if puzzle.description else None,
                        } for puzzle in puzzles]
        return jsonify(puzzle_list)
    else:
        return jsonify("Puzzles not found in database."), 404


@puzzle_routes.route('/cities/<int:city_id>/')
def get_all_puzzles_for_city(city_id):
    puzzles = Puzzle.query.filter(Puzzle.cityId == city_id).all()
    if puzzles:
        puzzle_list = [{'id': puzzle.id, 'title': puzzle.title, 'userId': puzzle.userId,
                        'cityId': puzzle.cityId if puzzle.cityId else None,
                        'pieceCount': puzzle.piece_count if puzzle.piece_count else None,
                        'image': puzzle.image if puzzle.image else None,
                        'description': puzzle.description if puzzle.description else None,
                        } for puzzle in puzzles]
        return jsonify(puzzle_list)
    else:
        return jsonify("Puzzles not found in database."), 404


@puzzle_routes.route('/', methods=['POST'])
def new_puzzle():
    data = request.json
    title = data["title"]
    if title == '':
        return jsonify("bad data")
    try:
        new_puzzle = {
            'title': data['title'],
            'userId': data['userId']
        }
        if 'image' in data and data["image"] != '':
            new_puzzle['image'] = data['image']
        if 'cityId' in data and data["cityId"] != '':
            new_puzzle['cityId'] = data['cityId']
        if 'pieceCount' in data and data["pieceCount"] != '':
            new_puzzle['piece_count'] = int(data['pieceCount'])
        if 'description' in data and data["description"] != '':
            new_puzzle['description'] = data['description']
        new_puzzle_db = Puzzle(
            **new_puzzle
        )
        db.session.add(new_puzzle_db)
        db.session.commit()

        new_puzzle_db_dict = {
            'id': new_puzzle_db.id,
            'title': new_puzzle_db.title,
            'userId': new_puzzle_db.userId,
            'cityId': new_puzzle_db.cityId if new_puzzle_db.cityId else None,
            'piece_count': new_puzzle_db.piece_count if new_puzzle_db.piece_count else None,
            'image': new_puzzle_db.image if new_puzzle_db.image else None,
            'description': new_puzzle_db.description if new_puzzle_db.description else None,
        }
        return new_puzzle_db_dict
    except IntegrityError as e:
        print(e)
        return jsonify('Database entry error'), 400

# {
#     "title": "Magic Title for 6",
#     "userId": 1,
#     "cityId": 2,
#     "piece_count": 250,
#     "image": "url for image for 6",
#     "description": "STRING OF DESCR FOR 6"
# }


@puzzle_routes.route('/<int:puzzle_id>/')
def get_puzzle(puzzle_id):
    puzzle = Puzzle.query.filter(Puzzle.id == puzzle_id).first()
    images = Image.query.filter(Image.puzzleId == puzzle_id).all()
    images_list = None
    if len(images) > 0:
        images_list = [{'id': image.id,'puzzleId': image.puzzleId, 'image': image.image} for image in images]

    if puzzle:
        puzzle_db_dict = {
            'id': puzzle.id,
            'title': puzzle.title,
            'userId': puzzle.userId,
            'cityId': puzzle.cityId if puzzle.cityId else None,
            'pieceCount': puzzle.piece_count if puzzle.piece_count else None,
            'image': puzzle.image if puzzle.image else None,
            'description': puzzle.description if puzzle.description else None,
            'images': images_list
        }
        return puzzle_db_dict
    else:
        return jsonify("puzzle not found in database."), 404


@puzzle_routes.route('/<int:puzzle_id>/', methods=['PUT'])
def update_server(puzzle_id):

    # title = None
    # image = None
    # ownerId = None
    puzzle = Puzzle.query.filter(Puzzle.id == puzzle_id).first()

    if not request.json:
        return jsonify('bad data'), 400
    elif puzzle:
        data = request.json
        if 'title' in data:
            puzzle.title = data['title']
        if 'userId' in data:
            puzzle.userId = data['userId']
        if 'cityId' in data:
            puzzle.cityId = data['cityId']
        if 'piece_count' in data:
            puzzle.piece_count = data['pieceCount']
        if 'image' in data:
            puzzle.image = data['image']
        if 'description' in data:
            puzzle.description = data['description']

        db.session.commit()
        if puzzle:
                puzzle_db_dict = {
                    'id': puzzle.id,
                    'title': puzzle.title,
                    'userId': puzzle.userId,
                    'cityId': puzzle.cityId if puzzle.cityId else None,
                    'pieceCount': puzzle.piece_count if puzzle.piece_count else None,
                    'image': puzzle.image if puzzle.image else None,
                    'description': puzzle.description if puzzle.description else None,
                    # 'images': images_list
                }
        return puzzle_db_dict
    else:
        return jsonify("server not found in database."), 404


@puzzle_routes.route('/<int:puzzle_id>/', methods=['DELETE'])
def delete_server(puzzle_id):
    pass
    puzzle = Puzzle.query.filter(Puzzle.id == puzzle_id).first()
    if puzzle:
        db.session.delete(puzzle)
        db.session.commit()
        return jsonify('deleted puzzle')
    else:
        return jsonify("puzzle not found in database."), 404

# # Channel Routes:


# @server_routes.route('/<int:server_id>/', methods=["POST"])
# def new_channel(server_id):
#     data = request.get_json(force=True)
#     title = data["title"]
#     if title == '' or server_id == '':
#         return jsonify("bad data")
#     channel = Channel(title=title, serverId=server_id)
#     db.session.add(channel)
#     db.session.commit()

#     # new_user = User(username=channel.title,
#     #                 email=f'{channel.title}@channel.com', hashed_password='pbkdf2:sha256:2600000$PCG9')
#     # db.session.add(new_user)
#     # db.session.commit()
#     new_message = Message(
#         message=f'Welcome to #{channel.title}!', userId=2, channelId=channel.id)

#     db.session.add(new_message)
#     db.session.commit()
#     return jsonify({"id": channel.id, "title": channel.title, "serverId": channel.serverId})


# @server_routes.route('/<int:server_id>/')
# def get_all_channels(server_id):
#     channels = Channel.query.filter(
#         Channel.serverId == server_id).all()
#     server = Server.query.filter(
#         Server.id == server_id).first()
#     length = Channel.query.filter(Channel.serverId == server_id).count()
#     if length:
#         channels_list = [{"id": channel.id, "title": channel.title,
#                           "serverId": channel.serverId} for channel in channels]
#         servers_list = {"id": server.id, "title": server.title,
#                         "image": server.image, "ownerId": server.ownerId}
#         return jsonify(channels_list, servers_list)
#     else:
#         return jsonify("no servers with that channel")


# @server_routes.route('/<int:server_id>/<int:channel_id>/', methods=["PUT"])
# def edit_channel(server_id, channel_id):
#     data = request.get_json(force=True)
#     channel = Channel.query.filter(Channel.id == channel_id).first()
#     title = data["title"]
#     if channel:
#         channel.title = title
#         db.session.commit()
#         return jsonify({"title": title})
#     else:
#         return jsonify("Channel Dosnt Exsist")


# @server_routes.route('/<int:server_id>/<int:channel_id>/', methods=["DELETE"])
# def delete_channel(server_id, channel_id):
#     channel = Channel.query.filter(Channel.id == channel_id).first()
#     if channel:
#         db.session.delete(channel)
#         db.session.commit()
#         return jsonify("Success")
#     else:
#         return jsonify("Failed to Delete")
