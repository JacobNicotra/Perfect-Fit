import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/session';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';

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
                <div className='splash-description'>
                    <div className='splash-container-inner'>
                        <h1 className='splash_text'>This is Perfect Fit! </h1>
                        <div className='description-text'>
                            <h2 className='splash_text'>A Web Application for Puzzle Swapping!</h2>
                            <h5 className='splash_text'>If you're new here, then signup or continue as a guest user.</h5>
                            <h5 className='splash_text'>For existing users, please log in.</h5>
                        </div>
                    </div>

                    <div className='landing-btns'>

                        {sessionUser ?
                            <ul className='user-disp-ul'>
                                <li className='logout-button-li-landing'>
                                    <LogoutButton />
                                </li>
                            </ul>
                            :
                            <ul className='user-disp-ul-logged-out'>
                                <li className='login-button-li'>
                                    <button className='DemoButton signup-button landing-btn' onClick={() => onClick()}>Guest</button>
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

                        }
                    </div>

                </div>

            </div>
    )
}

export default Landing
