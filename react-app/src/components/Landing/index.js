import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/session';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import clip_puzzle from '../../images/clip-puzzle.png'

import "./Landing.css"

import landingImage from '../../landing-image.png'
import jigsaw from '../../images/jigsaw.png'
import new_puzzle from '../../images/new_puzzle.png'
import new_puzzle_art from '../../images/new_puzzle_art.png'
import browse from '../../images/browse.png'
import swap from '../../images/swap.png'
import swap_art from '../../images/swap_art.png'


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
                <span id="splash_header">
                    <h1 className='splash_text' id='title_splash'>Perfect Fit
                        <img src={jigsaw} id="jigsaw"></img></h1>
                    <span id="splash_nav">
                        <NavLink to='/login' className='visited-link'>

                            Login
                        </NavLink>
                        &nbsp;|&nbsp;
                        <NavLink to='/sign-up' className='visited-link'>

                            Sign Up
                        </NavLink>
                        &nbsp;|&nbsp;
                        <button className='button-no-style' id='demo_now' onClick={() => onClick()}>Demo Now</button>


                    </span>


                </span>
                <div id='description_holder'>
                    <div id='splash_description'>

                        <div className='description-text'>
                            What do you do with a puzzle once it’s completed?
                            <br />
                            Our favs are keepers… but what about the rest?
                            <br />
                            Throw it away?
                            <br />
                            Break it down and start all over?
                            <br />
                            <br />
                            Why not swap it!

                        </div>
                        <NavLink to='/sign-up' className='visited-link'>
                            <button className='submit_button'>Let's get started</button>
                        </NavLink>
                    </div>
                    <img src={clip_puzzle} id="clip_puzzle"></img>
                </div>

            </div>

            <div id='splash_info'>
                <div id='splash_demo_1' className='demo_container'>
                    <div className='demo_card'>
                        <p className='demo_txt'>
                            Add a puzzle that you own.
                        </p>
                        <img className='demo_img_inner' src={new_puzzle}></img>
                    </div>
                    <img className='demo_img' src={new_puzzle_art}></img>
                </div>
                <div id='splash_demo_2' className='demo_container'>
                    <div className='demo_card'>
                        <p className='demo_txt'>
                            Browse puzzles owned by users just like you!
                        </p>
                        <img className='demo_img_inner' src={browse}></img>
                    </div>
                </div>
                <div id='splash_demo_3' className='demo_container'>
                    <div className='demo_card' id='demo_car_3'>
                        <p className='demo_txt'>
                            Pick a puzzle and swap for it!
                        </p>
                        <img className='demo_img_inner' id='demo_img_inner_3' src={swap}></img>
                    </div>
                    <img className='demo_img' src={swap_art}></img>
                </div>

            </div>
            <NavLink to='/sign-up' className='visited-link'>

                <button className='submit_button'>Let's get started</button>
            </NavLink>
        </div>
    )
}

export default Landing
