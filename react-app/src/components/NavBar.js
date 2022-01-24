
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProfileModal from './ProfileModal'
import LoginFormModal from './LoginFormModal'
import AddPuzzleModal from './AddPuzzleForm/AddPuzzleModal';

import logo from './../logobg.png'

const NavBar = () => {
  return (
    <nav id="nav">
      <span id="nav-left">

        {/* <img id="logo" src={logo}></img> */}
        <NavLink to='/puzzles' exact={true} activeClassName='active'>
        <i className="fas fa-puzzle-piece font-logo"></i>
          </NavLink>

        {/* <div><i className='fas fa-plus add-puzzle-button'></i></div> */}
        <AddPuzzleModal edit={false} className="puzzle-modal"/>
      </span>
      <h1 id="perfect-fit">Perfect Fit</h1>

      <ProfileModal />
       
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
      
    </nav>
  );
}

export default NavBar;
