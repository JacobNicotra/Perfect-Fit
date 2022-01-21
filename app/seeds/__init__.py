from flask.cli import AppGroup
from .cities import seed_cities, undo_cities
from .users import seed_users, undo_users
from .puzzles import seed_puzzles, undo_puzzles
from .swaps import seed_swaps, undo_swaps
from .images import seed_Images, undo_images

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_cities()
    seed_users()
    seed_puzzles()
    seed_swaps()
    seed_Images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cities()
    undo_users()
    undo_puzzles()
    undo_swaps()
    undo_cities()
    undo_images()

    # Add other undo functions here
