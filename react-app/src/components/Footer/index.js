
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

import './Footer.css'


const Footer = ({ notLanding }) => {
  const sessionUser = useSelector(state => state.session.user);

  return (

    <div className='footer'>
      <div className='about-container'>

        {notLanding ?
          <NavLink to='/' exact={true} className='footer-about'>
            <div className='about-links visited-link'>
              About
            </div>
          </NavLink>
          :

          <div className='about-links'>
            Built By: Jacob Arthur Nicotra
            <a target='_blank' rel='noreferrer' href='https://github.com/JacobNicotra'><i className="fab fa-github gh"></i></a>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/jacobnicotra/'><i className="fab fa-linkedin linkedin"></i></a>
          </div>
        }



      </div>
    </div>
  );
}

export default Footer;
