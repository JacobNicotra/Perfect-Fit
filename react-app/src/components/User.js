import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps } from '../store/swap';
import Swaps from './Swap.js';
import { getPuzzlesUser } from '../store/puzzle';
import AddPuzzleModal from './AddPuzzleForm/AddPuzzleModal';
import LogoutButton from './auth/LogoutButton';
import logoBW from '../logo-black.png'

function User() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  if (!sessionUser) {
    history.push(`/`)
  }

  const dispatch = useDispatch();
  const params = useParams();


  const [user, setUser] = useState({});
  const { userId } = useParams();

  let userSwaps = useSelector(state => {
    return state.swaps.userSwapArray
  })


  let userPuzzles = useSelector(state => {
    return state.puzzles.userPuzzleArray
  })

  let owner = sessionUser?.id === parseInt(userId)



  useEffect(async () => {
    await dispatch(getPuzzlesUser(userId));
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [dispatch, userId]);

  if (userId) {
    return (
      <div className='user_wrapper'>
      
        <span>
          <span className='nav-username-pro-btn'>
            {owner ?
              <div className='nav-middle'>
                <NavLink to='/new' exact={true} data-hover="Add a New Puzzle" className="hovertext">
                  <button className='nav-swap-btn'>Add Puzzle</button>
                </NavLink >
                <div className='user-page-owner'>Puzzles Owned by {sessionUser?.id === parseInt(userId) ? 'You' : 'This User'}</div>
                <NavLink to='/swaps' exact={true} data-hover="See your Swap Requests" className="hovertext">
                  <button className='nav-swap-btn'><i className="fas fa-envelope swap-icon"></i></button>
                </NavLink >
                <LogoutButton/>
              </div>

              :
              <div className='user-page-owner'>Puzzles Owned by {sessionUser?.id === parseInt(userId) ? 'You' : 'This User'}</div>
            }

          </span>
        </span>
        <div className='user-holder'>
          <ul id="puzzle-cards">
            {userPuzzles ? userPuzzles.map(puzzle => {
              let color
              if (puzzle.image !== 'none') {
                color = 'transparent'
              } else {
                color = 'white'
              }
              return (
                <li key={puzzle.id} className='puzzle-card-wrapper'>
                  <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                    <span className='puzzle-card-title'>{puzzle.title}</span>
                    <span className='puzzle-card-rating'></span>
                    <NavLink to={`/puzzles/${puzzle.id}`}>
                      <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                    </NavLink>


                  </div>

                </li >
              )
            })
              :
              <li className='nothing'>Nothing Here Yet...</li>
            }
          </ul >
        </div >
        </div>

    )
  } else {
    return (<div className='background'><div className="loader"></div></div>
    )
  }
}
export default User;
