# Perfect Fit
[Commoji](https://the-perfect-fit.herokuapp.com/)

[Wiki](https://github.com/JacobNicotra/perfect-fit-capstone/wiki)

## At A Glance
Perfect Fit is a full stack web application that allows users to:
 - Create an account
 - Register puzzles that they own
 - View, Edit, or Delete any of their registered puzzles
 - Initate a swap request for a puzzle owned by another user
 - Accept incoming swap request, thusly swapping the puzzles that two users own
 - Edit or delete swap requests to or from the user


## Application Architecture
Perfect Fit is built with a REACT frontend and an Flask backend. PostgreSQL is used as a database. Flask-SQAlchemy is used to manage the database. CSS is used to style front-end HTML components. 


## Technical Implementation

![Splash Page](https://the-perfect-fit.herokuapp.com/)
On the landing page you can create an account or login to an existing account. You can also use the Demo button to log in as a demo user.

***

![The Puzzles Page](https://the-perfect-fit.herokuapp.com/puzzles)
The puzzles page shows the latest puzzles that are posted to the website. You can click on any individual puzzle to see additional details about it, as well as send a swap request to the owner of the puzzle. If you are the owner of the puzzle, you can edit or delete you puzzle.  

***

![Swaps Page](https://the-perfect-fit.herokuapp.com/swaps)
On the Swaps page, you can see any pending swap requests to or from you. You can edit the swap requests, accept them, or delete them from this page. 

***

## Future Features
- Puzzle Ratings
- Puzzle Journey, showing the previous owners of a puzzle in order
- Drag an drop image uploading via AWS
- Google Maps API to allow puzzle owners to connect and swap puzzles based on location
