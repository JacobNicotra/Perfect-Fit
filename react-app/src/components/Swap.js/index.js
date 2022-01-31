import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps, commitSwap } from '../../store/swap';
import EditSwapModal from '../EditSwapForm/EditSwapModal'

import './Swap.css'

import logoBW from '../../logo-black.png'

function Swaps() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(state => state.session.user);
  const userId = user.id
  const history = useHistory()



  const [swapEdit, setSwapEdit] = useState(false);
  // const { userId } = useParams();

  let userSwaps = useSelector(state => {
    return state.swaps.userSwapArray
  })

  // let resipientSwaps = useSelector(state => {
  //   return state.swaps.recipientSwapArray
  // })

  const swapEditDetector = () => {

    if (swapEdit === false) setSwapEdit(true)
    else setSwapEdit(true)
    return
  }


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
    await dispatch(getUserSwaps(userId));
    // await dispatch(getRecipientSwaps(userId));
    return
  }, [dispatch, swapEdit])

  if (!user) {
    return null;
  }

  console.log('userSwaps', userSwaps)

  const handleAccept = async (swap, owner) => {
    //  thunk for committing swap and deleting swap req 

    if (owner) {
      if (swap.userAccept === true) return
      if (swap.recipientAccept === false) return
      let newSwapDb = await dispatch(commitSwap(swap));
      return history.push(`/users/${userId}`)
    } else {
      if (swap.recipientAccept === true) return
      if (swap.userAccept === false) return
      let newSwapDb = await dispatch(commitSwap(swap));
      return history.push(`/users/${userId}`)
    }

  }



  if (user) {
    return (
      <div className='background'>

        <div className='user-wrapper'>

          <div className='swaps-holder-outer'>
            <h3 id='pending-swaps'>Pending Swaps</h3>
            {userSwaps?.length > 0 ?
              <div className='my-swaps-wrapper'>

                <ul className='recipient-swaps-ul'>

                  {userSwaps.map(swap => {

                    return (
                      <li className='puz-pair-li'>
                        <div className='swap-nav-top'>
                          <div className='swap-user-info'>{
                            user.id === swap.userId ?

                              <div className='swap-users-links'>

                                <div>Your swap req to&nbsp;</div>

                                <NavLink to={`/users/${swap.recipientId}`}>
                                  {swap.recipientUsername}
                                </NavLink>


                              </div>


                              :

                              <div>
                                <div>Your swap request from&nbsp;</div>

                                <NavLink to={`/users/${swap.userId}`}>
                                  {swap.userUsername}
                                </NavLink>

                              </div>





                          }

                          </div>
                          <div><EditSwapModal otherUserId={user.id === swap.userId ? swap.recipientId : swap.userId} swap={swap} swapEditDetector={swapEditDetector} /></div>

                        </div>
                        <div >{user.id === swap.userId ?
                          <span className='swap-btn-holder'>
                            <div><button className='swap-btn-accept' onClick={() => handleAccept(swap, true)}>
                              {swap.userAccept ? <i className="fas fa-check-circle green-check"></i> : <i className="fas fa-check-circle red-check"></i>}
                            </button></div>
                            <div>{swap.recipientAccept ? <i className="fas fa-user-check green-other-check other-check"></i> : <i className="fas fa-user-check red-other-check other-check"></i>}</div>
                          </span>
                          :
                          <span className='swap-btn-holder'>
                            <div><button className='swap-btn-accept' onClick={() => handleAccept(swap, false)}>{swap.recipientAccept ? <i className="fas fa-check-circle green-check"></i> : <i className="fas fa-check-circle red-check"></i>}</button></div>
                            <div>{swap.userAccept ? <i className="fas fa-user-check green-other-check other-check"></i> : <i className="fas fa-user-check red-other-check other-check"></i>}</div>
                          </span>

                        }</div>
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
                            <li><i className="fas fa-exchange-alt swap-symbol"></i></li>
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
              :
              <div className='no-swaps'>You have no pending Swap requests that you initiated. Click on another user's puzzle and send a swap request!</div>

            }

          </div>

          <div>

          </ div>
        </div>
      </div>

    );
  } else {
    return (<div className='background'>
      <div className="loader"></div> </div>
    )
  }
}
export default Swaps;
