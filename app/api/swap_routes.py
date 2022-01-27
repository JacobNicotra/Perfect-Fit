from flask import Blueprint, jsonify, request
from app.models import db, User, Puzzle, Image, Swap
from sqlalchemy.exc import IntegrityError
from flask_login import current_user

swap_routes = Blueprint('swaps', __name__)

# http://localhost:5000/channels/?title=firsttitle&description=someDescriptiveStuff&ownerId=1


@swap_routes.route('/')
def get_all_swaps():
    # if current_user.is_authenticated:
    #     user = current_user.to_dict()

    # servers = Server.query.filter(Server.ownerId == user.id).all()
    swaps = Swap.query.all()
    if swaps:
        swap_list = [{'id': swap.id,
                      'userId': swap.userId,
                      'recipientId': swap.recipientId if swap.recipientId else None,
                      'getPuzzleId': swap.getPuzzleId if swap.getPuzzleId else None,
                      'givePuzzleId': swap.givePuzzleId if swap.givePuzzleId else None,
                      'message': swap.message if swap.message else None,
                      } for swap in swaps]
        return jsonify(swap_list)
    else:
        return jsonify("swaps not found in database."), 404


@swap_routes.route('/users/<int:user_id>/')
def get_all_user_swaps(user_id):

    # userSwaps = Swap.query.filter(Swap.userId == user_id).all()

    userSwapGivePuzzles = db.session.query(Swap, Puzzle).join(
        Puzzle.swap_give_relation).filter(Swap.userId == user_id).all()

    userSwapGetPuzzles = db.session.query(Swap, Puzzle).join(
        Puzzle.swap_get_relation).filter(Swap.userId == user_id).all()


    if userSwapGivePuzzles:
        swap_list = [{'id': swap.id,
                      'userId': swap.userId,
                      'recipientId': swap.recipientId if swap.recipientId else None,
                      'getPuzzleId': swap.getPuzzleId if swap.getPuzzleId else None,
                      'givePuzzleId': swap.givePuzzleId if swap.givePuzzleId else None,
                      'message': swap.message if swap.message else None,
                      'givePuzzle': {
                          'id': give_puzzle.id,
                          'title': give_puzzle.title,
                          'userId': give_puzzle.userId,
                          'cityId': give_puzzle.cityId if give_puzzle.cityId else None,
                          'pieceCount': give_puzzle.piece_count if give_puzzle.piece_count else None,
                          'image': give_puzzle.image if give_puzzle.image else None,
                          'description': give_puzzle.description if give_puzzle.description else None
                      },
                      'getPuzzle': {
                          'id': userSwapGetPuzzles[i][1].id,
                          'title': userSwapGetPuzzles[i][1].title,
                          'userId': userSwapGetPuzzles[i][1].userId,
                          'cityId': userSwapGetPuzzles[i][1].cityId if userSwapGetPuzzles[i][1].cityId else None,
                          'pieceCount': userSwapGetPuzzles[i][1].piece_count if userSwapGetPuzzles[i][1].piece_count else None,
                          'image': userSwapGetPuzzles[i][1].image if userSwapGetPuzzles[i][1].image else None,
                          'description': userSwapGetPuzzles[i][1].description if userSwapGetPuzzles[i][1].description else None
                      }


                      } for i, (swap, give_puzzle) in enumerate(userSwapGivePuzzles)]

        return jsonify(swap_list)
    else:
        return jsonify("None"), 200


@swap_routes.route('/recipients/<int:recipientId>/')
def get_all_recipient_swaps(recipientId):
    print('----- recipient route -------')
    userSwapGivePuzzles = db.session.query(Swap, Puzzle).join(
        Puzzle.swap_give_relation).filter(Swap.recipientId == recipientId).all()
    userSwapGetPuzzles = db.session.query(Swap, Puzzle).join(
        Puzzle.swap_get_relation).filter(Swap.recipientId == recipientId).all()

    if userSwapGivePuzzles:
        swap_list = [{'id': swap.id,
                      'userId': swap.userId,
                      'recipientId': swap.recipientId if swap.recipientId else None,
                      'getPuzzleId': swap.getPuzzleId if swap.getPuzzleId else None,
                      'givePuzzleId': swap.givePuzzleId if swap.givePuzzleId else None,
                      'message': swap.message if swap.message else None,
                      'givePuzzle': {
                          'id': give_puzzle.id,
                          'title': give_puzzle.title,
                          'userId': give_puzzle.userId,
                          'cityId': give_puzzle.cityId if give_puzzle.cityId else None,
                          'pieceCount': give_puzzle.piece_count if give_puzzle.piece_count else None,
                          'image': give_puzzle.image if give_puzzle.image else None,
                          'description': give_puzzle.description if give_puzzle.description else None
                      },
                      'getPuzzle': {
                          'id': userSwapGetPuzzles[i][1].id,
                          'title': userSwapGetPuzzles[i][1].title,
                          'userId': userSwapGetPuzzles[i][1].userId,
                          'cityId': userSwapGetPuzzles[i][1].cityId if userSwapGetPuzzles[i][1].cityId else None,
                          'pieceCount': userSwapGetPuzzles[i][1].piece_count if userSwapGetPuzzles[i][1].piece_count else None,
                          'image': userSwapGetPuzzles[i][1].image if userSwapGetPuzzles[i][1].image else None,
                          'description': userSwapGetPuzzles[i][1].description if userSwapGetPuzzles[i][1].description else None
                      }


                      } for i, (swap, give_puzzle) in enumerate(userSwapGivePuzzles)]

    # userSwaps = Swap.query.filter(Swap.recipientId == recipientId).all()
    # if userSwaps:
    #     swap_list = [{'id': swap.id,
    #                   'userId': swap.userId,
    #                   'recipientId': swap.recipientId if swap.recipientId else None,
    #                   'getPuzzleId': swap.getPuzzleId if swap.getPuzzleId else None,
    #                   'givePuzzleId': swap.givePuzzleId if swap.givePuzzleId else None,
    #                   'message': swap.message if swap.message else None,
    #                   } for swap in userSwaps]
        return jsonify(swap_list)
    else:
        return jsonify("None"), 200


@swap_routes.route('/<int:swap_id>/')
def get_swap(swap_id):
    swap = Swap.query.filter(Swap.id == swap_id).first()

    if swap:
        swap_dict = {'id': swap.id,
                     'userId': swap.userId,
                     'recipientId': swap.recipientId if swap.recipientId else None,
                     'getPuzzleId': swap.getPuzzleId if swap.getPuzzleId else None,
                     'givePuzzleId': swap.givePuzzleId if swap.givePuzzleId else None,
                     'message': swap.message if swap.message else None,
                     }
        return swap_dict
    else:
        return jsonify("swap not found in database."), 404


@swap_routes.route('/', methods=['POST'])
def new_swap():
    data = request.json

    try:
        new_swap = {
            'userId': data['userId'],
            'recipientId': data['recipientId'],
            'getPuzzleId': data['getPuzzleId'],
            'givePuzzleId': data['givePuzzleId'],
            'recipientId': data['recipientId'],
            'message': data['message'],
        }

        if 'message' in data and data["message"] != '':
            new_swap['message'] = data['message']
        new_swap_db = Swap(
            **new_swap
        )
        db.session.add(new_swap_db)
        db.session.commit()

        new_Swap_db_dict = {'id': new_swap_db.id,
                            'userId': new_swap_db.userId,
                            'recipientId': new_swap_db.recipientId if new_swap_db.recipientId else None,
                            'getPuzzleId': new_swap_db.getPuzzleId if new_swap_db.getPuzzleId else None,
                            'givePuzzleId': new_swap_db.givePuzzleId if new_swap_db.givePuzzleId else None,
                            'message': new_swap_db.message if new_swap_db.message else None,
                            }
        return new_Swap_db_dict
    except IntegrityError as e:
        print(e)
        return jsonify('Database entry error'), 400

# {
#     "userId": 1,
#     "recipientId": 3,
#     "getPuzzleId": 2,
#     "givePuzzleId": 1,
#     "message": "trade with me"
# }


@swap_routes.route('/<int:swap_id>/', methods=['PUT'])
def update_swap(swap_id):

    # title = None
    # image = None
    # ownerId = None
    swap = Swap.query.filter(Swap.id == swap_id).first()

    if not request.json:
        return jsonify('bad data'), 400
    elif swap:
        data = request.json
        if 'userId' in data:
            swap.userId = data['userId']
        if 'recipientId' in data:
            swap.recipientId = data['recipientId']
        if 'getPuzzleId' in data:
            swap.getPuzzleId = data['getPuzzleId']
        if 'givePuzzleId' in data:
            swap.givePuzzleId = data['givePuzzleId']
        if 'message' in data:
            swap.message = data['message']

        db.session.commit()
        if swap:
            swap_db_dict = {'id': swap.id,
                            'userId': swap.userId,
                            'recipientId': swap.recipientId if swap.recipientId else None,
                            'getPuzzleId': swap.getPuzzleId if swap.getPuzzleId else None,
                            'givePuzzleId': swap.givePuzzleId if swap.givePuzzleId else None,
                            'message': swap.message if swap.message else None,
                            }
        return swap_db_dict
    else:
        return jsonify("server not found in database."), 404

  #
  # {
  #    "getPuzzleId": 2,
  #   "givePuzzleId": 3,
  #   "message": "updated message"
  # }


@swap_routes.route('/<int:swap_id>/', methods=['DELETE'])
def delete_swap(swap_id):
    pass
    swap = Swap.query.filter(Swap.id == swap_id).first()
    if swap:
        db.session.delete(swap)
        db.session.commit()
        return jsonify('deleted swap')
    else:
        return jsonify("swap not found in database."), 404
