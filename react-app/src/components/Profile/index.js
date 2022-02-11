
import React, { useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import User from '../User';
import getUserSwaps from '../../store/swap'

import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const sessionUser = useSelector(state => state.session.user);


  return (
    <nav>


      <div className='user-disp'>
        <span className='puzzle-decor-holder-no-center'>
          <div className='puzzle-decor1'><i className="fas fa-puzzle-piece"></i></div>
          <div className='puzzle-decor2'><i className="fas fa-puzzle-piece"></i></div>
          <div className='puzzle-decor3'><i className="fas fa-puzzle-piece"></i></div>
          <div className='puzzle-decor4'><i className="fas fa-puzzle-piece"></i></div>
          <div className='puzzle-decor5'><i className="fas fa-puzzle-piece"></i></div>
          <div className='puzzle-decor6'><i className="fas fa-puzzle-piece"></i></div>
        </span>
        {sessionUser && 

        <NavLink to={'/users/' + sessionUser.id} >
          <div className='user-disp-name'>{sessionUser && sessionUser.username}  </div>
        </NavLink>
        }
        {sessionUser ?
          <ul className='user-disp-ul'>
            <li className='logout-button-li'>
              <LogoutButton />
            </li>
          </ul>
          :
          <ul className='user-disp-ul-logged-out'>
            <li className='login-button-li'>
              <NavLink to='/login' exact={true} activeClassName='active'>
                <LoginFormModal />
              </NavLink>
            </li>
            <li className='signup-button-li'>
              <NavLink to='/sign-up' exact={true} className='signup-button'>
                Sign Up
              </NavLink>
            </li>
          </ul>

        }
      </div>



    </nav>
  );
}

export default Profile;
