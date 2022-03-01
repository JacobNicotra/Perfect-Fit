import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/session';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';

import "./Thank.css"



const Thank = () => {
  const sessionUser = useSelector(state => state.session.user);
  let user = sessionUser
  const dispatch = useDispatch();
  const history = useHistory()
  if (!user) {
    return <Redirect to='/home' />;
  }

  return (

    <div className='splash-container'>
      <div className='splash-description'>
        <div className='splash-container-inner'>
          <h1 className='splash_text'>Thank you for your order! We will in contact you to discuss pricing and delivery!</h1>

        </div>


        <div className='landing-btns'>


          <ul className='user-disp-ul-logged-out'>

            <li className='login-button-li'>
              <NavLink to='/puzzles' exact={true} activeClassName='active'>
                <button className='new-puzzle-submit-button'>
                  Browse Puzzles
                </button>
              </NavLink>
            </li>
            <li className='login-button-li'>
              <NavLink to='/puzzles' exact={true} activeClassName='active'>
                <button className='new-puzzle-submit-button'>
                  Go to Home
                </button>
              </NavLink>
            </li>

          </ul>


        </div>

      </div>

    </div>
  )
}

export default Thank
