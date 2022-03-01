import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/session';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import "./Landing.css"

import landingImage from '../../landing-image.png'


const Landing = () => {
    const sessionUser = useSelector(state => state.session.user);
    let user = sessionUser
    const dispatch = useDispatch();
    const history = useHistory()
    if (user) {
        return <Redirect to='/home' />;
    }
    const onClick = () => {
        dispatch(login('demo@aa.io', 'password'));
        return history.push(`/puzzles`);
    };
    return (

        <div className='splash-container'>
            <div className='splash-container-inner'>
                <h1 className='splash_text'>Perfect Fit</h1>
                <div className='description-text'>

                    <h5 className='splash_text'>Continue as a  <button className='DemoButton signup-button landing-btn' onClick={() => onClick()}>Guest</button> user.</h5>
                    <h5 className='splash_text'>Alternatively, sign up or login.</h5>
                </div>
            </div>

            <div id='login_forms'>
                <SignUpForm />
                <LoginForm />


            </div>

            {/* {sessionUser ?
                        <ul className='user-disp-ul'>
                            <li className='logout-button-li-landing'>
                                <LogoutButton />
                            </li>
                        </ul>
                        :
                        <ul className='user-disp-ul-logged-out'>
                            <li className='login-button-li'>
                            </li>
                            <li className='login-button-li'>
                                <NavLink to='/login' exact={true} activeClassName='active'>
                                    <LoginFormModal />
                                </NavLink>
                            </li>
                            <li className='signup-button-li'>
                                <NavLink to='/sign-up' exact={true} className='signup-button landing-btn'>
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>

                    } */}


        </div>
    )
}

export default Landing
