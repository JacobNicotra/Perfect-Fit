import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps } from '../store/swap';

function User() {
  const dispatch = useDispatch();
  const params = useParams();


  const [user, setUser] = useState({});
  const { userId } = useParams();
  
  let swaps = useSelector(state => {
    return state.swaps.swapArray
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
    return
  }, [dispatch])

  if (!user) {
    return null;
  }


  if (swaps) {
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
        <ul>
          {swaps.map(swap => {
          
            return (
              <li key={swap.id} className='swap-card-wrapper'>
                <div className='swap-card'>
                  <span className='swap-card-title'>{swap.getPuzzleId}</span>
                  <span className='swap-card-title'>{swap.givePuzzleId}</span>
                  <span className='swap-card-title'>{swap.recipientId}</span>
                  <span className='swap-card-title'>{swap?.message}</span>

                </div>

              </li >
            )
          })}
        </ul>
      </>

    );
  } else {
    return (<div class="loader"></div>
    )
  }
}
export default User;
