import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

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


    <form onSubmit={onSignUp} className='login-form'>
      {errors.length > 0 ? 
      <div className='errors_signup'>
        {errors.map((error, ind) => (
          <div className='error_signup' key={ind}><i className="fas fa-exclamation-triangle"></i>{error}</div>
        ))}
        </div>
        :

        <div className='login-title'>Signup</div>

      }


      <input
        type='text'
        name='username'
        onChange={updateUsername}
        value={username}
        className='login-form-input'
        placeholder='Username'

      ></input>


      {/* <label className="puzzle-form-label">Number of Pieces</label> */}
      <select name="category" id="category-select" className='login-form-input login-select'

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
        className='login-form-input'
        placeholder='Confirm Password'


      ></input>

      <button type='submit' className='new-puzzle-submit-button'>Sign Up</button>
    </form>

  );
};

export default SignUpForm;
