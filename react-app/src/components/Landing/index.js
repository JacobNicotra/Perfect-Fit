import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import "./Landing.css"

const Landing = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()
    if (user) {
        return <Redirect to='/puzzles' />;
    }
    const onClick = () => {
        dispatch(login('demo@aa.io', 'password'));
        return history.push(`/puzzles`);
    };
    return (
        <div className='splash-container'>
            <div className='splash-description'>
                <h1 className='splash_text'>This is the Perfect Fit! 👁‍🗨</h1>
                <div className='description-text'>
                    <h2 className='splash_text'>The number one web application for puzzle community and puzzle swapping</h2>
                    <p className='splash_text'>take a look around</p>
                </div>
                <button className='DemoButton' onClick={() => onClick()}>Demo Now</button>
                <div className='about-container'>
                    <div className='built'>Built By:</div>
                    <div className='about-links'>
                        <a target='_blank' rel='noreferrer' href='https://github.com/JacobNicotra'>Jacob Nicotra</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing
