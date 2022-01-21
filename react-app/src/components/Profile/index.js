
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../LoginFormModal';

const Profile = () => {
  const sessionUser = useSelector(state => state.session.user);


  return (
    <nav>


      <div>
        <div>PROFILE INFO IF LOGGED IN N STUFF</div>
        {sessionUser ?
          <ul>
            <li>
              <LogoutButton />
            </li>
          </ul>
          :
          <ul>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                <LoginFormModal />
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
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
