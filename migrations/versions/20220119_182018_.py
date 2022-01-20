"""empty message

Revision ID: 284726bc1347
Revises: 
Create Date: 2022-01-19 18:20:18.914719

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '284726bc1347'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('cityId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cityId'], ['cities.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('puzzles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('cityId', sa.Integer(), nullable=True),
    sa.Column('authority', sa.Integer(), nullable=True),
    sa.Column('piece_count', sa.Integer(), nullable=True),
    sa.Column('image', sa.Text(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['cityId'], ['cities.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('puzzleId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['puzzleId'], ['puzzles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('previousOwners',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('puzzleId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['puzzleId'], ['puzzles.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('puzzleReviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('puzzleId', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['puzzleId'], ['puzzles.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('swaps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('recipientId', sa.Integer(), nullable=False),
    sa.Column('getPuzzleId', sa.Integer(), nullable=False),
    sa.Column('givePuzzleId', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['getPuzzleId'], ['puzzles.id'], ),
    sa.ForeignKeyConstraint(['givePuzzleId'], ['puzzles.id'], ),
    sa.ForeignKeyConstraint(['recipientId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('swaps')
    op.drop_table('puzzleReviews')
    op.drop_table('previousOwners')
    op.drop_table('images')
    op.drop_table('puzzles')
    op.drop_table('users')
    op.drop_table('cities')
    # ### end Alembic commands ###
