
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProfileModal from './ProfileModal'
import LoginFormModal from './LoginFormModal'
import logo from './../logobg.png'
const Logo = () => {
  return (
    <nav id="nav">
      <img id="logo" src={logo}></img>

       
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
      
    </nav>
  );
}

export default NavBar;
