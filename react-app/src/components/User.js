import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps } from '../store/swap';
import Swaps from './Swap.js';
import { getPuzzlesUser } from '../store/puzzle';

import logoBW from '../logo-bw-bg.png'

function User() {
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

  console.log('userPuzzles', userPuzzles)



  useEffect( async() => {
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

  useEffect(async () => {
    console.log('USERID', userId)
    await dispatch(getUserSwaps(userId));
    // await dispatch(getRecipientSwaps(userId));
    return
  }, [dispatch])

  if (!user) {
    return null;
  }

  if (userPuzzles) {
    return (
      <div>
        <ul id="puzzle-cards">
          {userPuzzles.map(puzzle => {
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
          })}
        </ul >
      </div >
      
    )
  } else {
    return (<div className="loader"></div>
    )
  }
}
export default User;
