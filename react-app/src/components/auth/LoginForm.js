import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import jigsaw from '../../images/jigsaw.png'
import login_art from '../../images/login.png'



const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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

      <img id="new_puzzle_img" src={login_art}></img>

      <form onSubmit={onLogin} className='auth-form'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}

        </div>

        <div className='login-title'>Login</div>


        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          className='puzzle-form-input'
          placeholder='Email'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className='puzzle-form-input'
          placeholder='Password'


        />
        <button className='new-puzzle-submit-button' type='submit'>Login</button>
      </form>
    </div>

  );
};

export default LoginForm;
