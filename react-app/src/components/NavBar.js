
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LogoutButton from './auth/LogoutButton';
import ProfileModal from './ProfileModal'
import LoginFormModal from './LoginFormModal'
import AddPuzzleModal from './AddPuzzleForm/AddPuzzleModal';
import Swaps from './Swap.js';


import logo from './../logo-green.png'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="nav">

      <span id='nav-puzzles'>
        <NavLink to='/puzzles' exact={true} activeClassName='active' className='visited-link'>

          Puzzles
        </NavLink>
      </span>
      <span id='nav-custom-order'>
      <NavLink to='/custom' exact={true} activeClassName='active' className='visited-link' >

          Custom Order
          </NavLink>
      </span>

      <span id="nav-left">

        <NavLink to='/home' exact={true} activeClassName='active hovertext' data-hover="Go to Home">
          <i className="fas fa-puzzle-piece font-logo"></i>
        </NavLink>

      </span>

      <span id='nav-FAQs'>
        FAQs
      </span>
      <span id='nav-my-profile'>

        {sessionUser ?
           <NavLink to={'/users/' + sessionUser.id} className='visited-link' >My Profile</NavLink> 

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
      </span>




      {/* <span id="nav-left">

        <NavLink to='/puzzles' exact={true} activeClassName='active hovertext' data-hover="See Latest Puzzles">
          <i className="fas fa-puzzle-piece font-logo" ></i>
        </NavLink>
        <NavLink to='/puzzles' exact={true} activeClassName='active'>

          <h1 id="perfect-fit">Perfect Fit</h1>
        </NavLink>

      </span>

      <div className='nav-right'>

        <span className='nav-username-pro-btn'>
          {sessionUser &&
            <div className='nav-middle'>
              <AddPuzzleModal edit={false} className="puzzle-modal" />
              <NavLink to='/swaps' exact={true} data-hover="See your Swap Requests" className="hovertext">
                <button className='nav-swap-btn'><i className="fas fa-envelope swap-icon"></i></button>
              </NavLink >
            </div>
          }
          <div className='profile-buttons-holder'>
            <ProfileModal />
          </div>
        </span>


        
      </div> */}


    </nav>
  );
}

export default NavBar;
