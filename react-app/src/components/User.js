import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps, getRecipientSwaps } from '../store/swap';

import logoBW from '../logo-bw-bg.png'

function User() {
  const dispatch = useDispatch();
  const params = useParams();


  const [user, setUser] = useState({});
  const { userId } = useParams();

  let userSwaps = useSelector(state => {
    return state.swaps.userSwapArray
  })

  let resipientSwaps = useSelector(state => {
    return state.swaps.recipientSwapArray
  })


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(async () => {
    console.log('USERID', userId)
    await dispatch(getUserSwaps(userId));
    await dispatch(getRecipientSwaps(userId));
    return
  }, [dispatch])

  if (!user) {
    return null;
  }


  if (user) {
    return (
      <>
        <ul>
          <li>
            <strong>User Id</strong> {userId}
          </li>
          <li>
            <strong>Username</strong> {user.username}
          </li>
          <li>
            <strong>Email</strong> {user.email}
          </li>
        </ul>

        {userSwaps &&
          <ul>
            {userSwaps.map(swap => {

              return (
                <li key={swap.id} className='swap-card-wrapper'>
                  <div className='swap-card'>
                    {/* <span className='swap-card-title'>{swap.getPuzzleId}</span> */}
                    <span className='swap-card-title'>{swap.givePuzzle.title}</span>
                    {/* <span className='swap-card-title'>{swap.recipientId}</span> */}
                    {/* <span className='swap-card-title'>{swap?.message}</span> */}

                  </div>

                </li >
              )
            })}
          </ul>

        }
        {resipientSwaps &&
          <ul className='recipient-swaps-ul'>
            {resipientSwaps.map(swap => {

              return (
                <li className='puz-pair-li'>
                <ul className='puz-pair-ul'>
                  <li key={swap.getPuzzle.id} className='puzzle-card-wrapper'>
                    <div className={swap.getPuzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                      <span className='puzzle-card-title'>{swap.getPuzzle.title}</span>
                      <span className='puzzle-card-rating'></span>
                      <NavLink to={`/puzzles/${swap.getPuzzle.id}`}>
                        <img className={swap.getPuzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={swap.getPuzzle.image ? swap.getPuzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                      </NavLink>
                    </div>
                  </li >
                  <li key={swap.givePuzzle.id} className='puzzle-card-wrapper'>
                    <div className={swap.givePuzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                      <span className='puzzle-card-title'>{swap.givePuzzle.title}</span>
                      <span className='puzzle-card-rating'></span>
                      <NavLink to={`/puzzles/${swap.givePuzzle.id}`}>
                        <img className={swap.givePuzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={swap.givePuzzle.image ? swap.givePuzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                      </NavLink>
                    </div>
                  </li >
                </ul>
                </li>


              )
            })}
          </ul>

        }
      </>

    );
  } else {
    return (<div class="loader"></div>
    )
  }
}
export default User;
