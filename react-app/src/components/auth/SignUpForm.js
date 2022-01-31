import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let outsideErrors = []

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])

console.log('errors', errors)
    if (!username.replace(/\s/g, '').length) {
      setErrors(["Really? Try providing a Username..."])
    }
    if (username.length < 3) {
      setErrors([...errors, "Username must be longer than 2 characters."])
    }
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setErrors([...errors, "Provide a valid email"])
    }
    if (password !== repeatPassword) {
      setErrors([...errors, "Passwords do not match."])

    }
    if (errors.length > 0) {
      return
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } 
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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='background'>

      <form onSubmit={onSignUp}  className='login-form'>
          <div className='login-title'>Signup</div>
        <div className='errors'>
          {errors.map((error, ind) => (
            <div className='error' key={ind}><i className="fas fa-exclamation-triangle"></i>{error}</div>
          ))}
        </div>

        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          className='login-form-input'
          placeholder='Username'

        ></input>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          className='login-form-input'
          placeholder='Email'


        ></input>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className='login-form-input'
          placeholder='Password'


        ></input>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className='login-form-input'
          placeholder='Confirm Password'


        ></input>
        <button type='submit' className='new-puzzle-submit-button'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
