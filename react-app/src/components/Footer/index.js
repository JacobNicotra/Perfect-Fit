
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

import LogoutButton from '../auth/LogoutButton';
import './Footer.css'


const Footer = ({ notLanding }) => {
  const sessionUser = useSelector(state => state.session.user);

  return (

    <div className='footer'>
      <div className='about-container'>

        {notLanding ?
          // <NavLink to='/' exact={true} className='footer-about'>
          //   <div className='about-links visited-link'>
          //     About
          //   </div>
          // </NavLink>
          <ul className='user-disp-ul'>
            <li className='logout-button-li-landing'>
              <LogoutButton />
            </li>
          </ul>
          :

          <div className='about-links' id='about-link'>
            Built By: Jacob Nicotra
            <a target='_blank' rel='noreferrer' href='https://github.com/JacobNicotra'><i className="fab fa-github gh visited-link"></i></a>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/jacobnicotra/'><i className="fab fa-linkedin linkedin visited-link"></i></a>
          </div>
        }



      </div>
    </div>
  );
}

export default Footer;
