import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps, getRecipientSwaps } from '../../store/swap';

import './Swap.css'

import logoBW from '../../logo-bw-bg.png'

function Swaps() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(state => state.session.user);
  const userId = user.id

  // const [user, setUser] = useState({});
  // const { userId } = useParams();

  let userSwaps = useSelector(state => {
    return state.swaps.userSwapArray
  })

  console.log('USERSWAPS_____________', userSwaps)

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
      // setUser(user);
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
      <div className='user-wrapper'>

        {userSwaps &&
          <div className='my-swaps-wrapper'>

            <ul className='recipient-swaps-ul'>

              {userSwaps.map(swap => {

                return (
                  <li className='puz-pair-li'>
                    <div>{ swap.recipientId }</div>
                    <div className='puz-pair-ul-wrapper'>

                      <ul className='puz-pair-ul'>
                        <li key={swap.getPuzzle.id} className='puzzle-card-wrapper'>
                          <div className={swap.getPuzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                            <span className='puzzle-card-title title-swap'><i className="fas fa-arrow-alt-circle-down download"></i>{swap.getPuzzle.title}</span>
                            <span className='puzzle-card-rating'></span>
                            <NavLink to={`/puzzles/${swap.getPuzzle.id}`}>
                              <img className={swap.getPuzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={swap.getPuzzle.image ? swap.getPuzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                            </NavLink>
                          </div>
                        </li >
                        <li key={swap.givePuzzle.id} className='puzzle-card-wrapper'>
                          <div className={swap.givePuzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                            <span className='puzzle-card-title title-swap'><i className="fas fa-arrow-alt-circle-up upload"></i>{swap.givePuzzle.title}</span>
                            <span className='puzzle-card-rating'></span>
                            <NavLink to={`/puzzles/${swap.givePuzzle.id}`}>
                              <img className={swap.givePuzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={swap.givePuzzle.image ? swap.givePuzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                            </NavLink>
                          </div>
                        </li >
                      </ul>
                      <div>{swap.message}</div>

                    </div>

                  </li>

                )
              })}
            </ul>

          </div>

        }
        {resipientSwaps &&
          <div className='others-swaps-wrapper'>



            <ul className='recipient-swaps-ul'>
              {resipientSwaps.map(swap => {

                return (
                  <li className='puz-pair-li'>
                    <div className='puz-pair-ul-wrapper'>

                      <ul className='puz-pair-ul'>
                        <li key={swap.getPuzzle.id} className='puzzle-card-wrapper'>
                          <div className={swap.getPuzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                            <span className='puzzle-card-title title-swap'><i className="fas fa-arrow-alt-circle-down download"></i>{swap.getPuzzle.title}</span>
                            <span className='puzzle-card-rating'></span>
                            <NavLink to={`/puzzles/${swap.getPuzzle.id}`}>
                              <img className={swap.getPuzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={swap.getPuzzle.image ? swap.getPuzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                            </NavLink>
                          </div>
                        </li >
                        <li key={swap.givePuzzle.id} className='puzzle-card-wrapper'>
                          <div className={swap.givePuzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                            <span className='puzzle-card-title title-swap'><i className="fas fa-arrow-alt-circle-up upload"></i>{swap.givePuzzle.title}</span>
                            <span className='puzzle-card-rating'></span>
                            <NavLink to={`/puzzles/${swap.givePuzzle.id}`}>
                              <img className={swap.givePuzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={swap.givePuzzle.image ? swap.givePuzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                            </NavLink>
                          </div>
                        </li >
                      </ul>
                      <div>{swap.message}</div>

                    </div>

                  </li>

                )
              })}
            </ul>

          </div>

        }
      </ div>

    );
  } else {
    return (<div class="loader"></div>
    )
  }
}
export default Swaps;
