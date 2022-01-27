import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSwaps, getRecipientSwaps } from '../store/swap';
import Swaps from './Swap.js';

import logoBW from '../logo-bw-bg.png'

function User() {
  const dispatch = useDispatch();
  const params = useParams();


  const [user, setUser] = useState({});
  const { userId } = useParams();

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
      <div className='user-page'>
        <Swaps />

      </div>

    );
  } else {
    return (<div class="loader"></div>
    )
  }
}
export default User;
