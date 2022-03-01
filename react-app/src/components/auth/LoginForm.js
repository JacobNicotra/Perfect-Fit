import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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


      <form onSubmit={onLogin} className='login-form'>
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
          className='login-form-input'
          placeholder='Email'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className='login-form-input'
          placeholder='Password'


        />
        <button className='new-puzzle-submit-button' type='submit'>Login</button>
      </form>

  );
};

export default LoginForm;
