import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import { signUp } from '../../store/session';
import signup_art from '../../images/signup.png'
import jigsaw from '../../images/jigsaw.png'

import "./Auth.css"


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [location, setLocation] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory()

  let outsideErrors = []

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    let tempErrors = [];

    if (!username.replace(/\s/g, '').length) {
      tempErrors = ["Providing a Username..."]

    }
    if (username.length < 3) {
      tempErrors = [...tempErrors, 'Username must be longer than 2 characters.']

    }
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      tempErrors = [...tempErrors, 'Provide a valid email']

    }
    if (location == '') {
      tempErrors = [...tempErrors, 'Provide a city']


    }
    if (password !== repeatPassword) {
      tempErrors = [...tempErrors, 'Passwords do not match.']



    }
    if (tempErrors.length > 0) {
      return setErrors(tempErrors)
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
      return history.push(`/puzzles`)

    }
  };

  const onClick = () => {
    dispatch(login('demo@aa.io', 'password'));
    return history.push(`/puzzles`);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div class='form_and_image_holder'>
      <span className="Perfect_Fit_header">

        <h1 className='splash_text' id='title_splash'>Perfect Fit
          <img src={jigsaw} id="jigsaw"></img></h1>

      </span>

      <img id="new_puzzle_img" src={signup_art}></img>

      <form onSubmit={onSignUp} className='auth-form'>
        {errors.length > 0 ?
          <div className='errors_signup'>
            {errors.map((error, ind) => (
              <div className='error_signup' key={ind}><i className="fas fa-exclamation-triangle"></i>{error}</div>
            ))}
          </div>
          :

          <div className='login-title'>Sign Up</div>

        }


        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          className='login-input'
          placeholder='Username'

        ></input>


        {/* <label className="puzzle-form-label">Number of Pieces</label> */}
        <select name="category" id="category-select" className='login-input puz-form-sel'

          onChange={updateLocation}
          value={location}
        >

          <option value="empty">Location</option>
          <option value={1} >San Francisco</option>
          <option value={2} >New York	</option>
          <option value={3} >Chicago	</option>
          <option value={4} >Los Angeles	</option>
          <option value={5} >Miami	</option>
          <option value={6} >Boston</option>
          <option value={7} >Denver</option>
          <option value={8} >San Diego	</option>
          <option value={9} >Dallas</option>
          <option value={10}>Las Vegas	</option>
          <option value={11}>Seattle</option>
          <option value={12}>Philadelphia</option>
          <option value={13}>Houston</option>
          <option value={14}>Phoenix</option>

        </select>

        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          className='login-input'
          placeholder='Email'


        ></input>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className='login-input'
          placeholder='Password'


        ></input>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          className='login-input'
          placeholder='Confirm Password'


        ></input>

        <button type='submit' className='new-puzzle-submit-button auth-btn'>Sign Up</button>
        <button type='submit' className='new-puzzle-submit-button' id='demo_button' onClick={() => onClick()}>Demo Login</button>
        <NavLink to='/login' className='visited-link already'>
          Create an account.
        </NavLink>
      </form>
    </div>

  );
};

export default SignUpForm;
