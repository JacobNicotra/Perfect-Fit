import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';



import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './Home.css'
import logo from '../../logo-black.png'
import logoBW from '../../logo-black.png'


// import Intro from '../Intro';




const Home = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const serverId = params.serverId
  const [stepsEnabled, setStepsEnabled] = useState(true)
  const [initialStep, setInitalStep] = useState(0)

  const user = useSelector(state => state.session.user);

  let puzzles = useSelector(state => {
    return state.puzzles.puzzleArray
  })


  useEffect(async () => {
    await dispatch(getPuzzles());

    return
  }, [dispatch])



  if (puzzles) {
    return (

      <div className='inner-home-container' >
        <span className='center-flex-col' id='welcome-span'>
          <h1 className='text-align'>Welcome to Perfect Fit!</h1>
          <p className='text-align' >Don’t let a good puzzle go to waste. Use our free services to initiate a puzzle swap anywhere in the USA. asdfasdfasdfasdfadfasdfasdf</p>
        </span>

        <ul className='reviews-ul'>
          <li className='li-nostyle'>
            <p className='text-align'>“I completed a 1000 piece puzzle and asdfasdfdf.”</p>
            <span>☆☆☆☆☆</span>
          </li>
          <li className='li-nostyle'>
            <p className='text-align'>“I’ve been looking far and wide for a Game of Thrones puzzle afdasdfsd.”</p>
            <span>☆☆☆☆☆</span>
          </li>
          <li className='li-nostyle'>
            <p className='text-align'>“Easiest, quickest swap afdasdf”</p>
            <span>☆☆☆☆☆</span>
          </li>
        </ul>

        <span className='home-bottom'>

          <div className='left-home'>
            <ul className='popular-category-ul'>
              <li className='popular-category li-nostyle'></li>
              <li className='popular-category li-nostyle'></li>
              <li className='popular-category li-nostyle'></li>
              <li className='popular-category li-nostyle'></li>
            </ul>
            <ul className='popular-category-ul'>
              <li className='popular-category li-nostyle'></li>
              <li className='popular-category li-nostyle'></li>
              <li className='popular-category li-nostyle'></li>
              <li className='popular-category li-nostyle'></li>
            </ul>
          </div>

          <div className='right-home'>
            <div className='whats-new'></div>
            <div className='near-you'></div>
          </div>
        </span>



      </div>


    )
  }
  return (<div className="loader"></div>
  )
}

export default Home;
