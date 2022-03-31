import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams, useHistory } from 'react-router-dom';



import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './Home.css'
import logo from '../../logo-black.png'
import logoBW from '../../logo-black.png'
import background from '../../images/default.jpeg'

import moviePoster from '../../images/movie_poster.png'
import natureImage from '../../images/nature.png'
import arch from '../../images/arch.png'
import landmark from '../../images/landmark.png'
import hist from '../../images/history.png'
import fantasy from '../../images/fantasy.png'
import space from '../../images/space.png'
import tech from '../../images/tech.png'
import usa from '../../images/usa.webp'

import jigsaw from '../../images/jigsaw.png'


// import Intro from '../Intro';




const Home = () => {

  const user = useSelector(state => state.session.user);
  const history = useHistory()

  if (!user) {
    history.push(`/`)

  }

  const dispatch = useDispatch();
  const params = useParams();
  // const serverId = params.serverId
  const [stepsEnabled, setStepsEnabled] = useState(true)
  const [initialStep, setInitalStep] = useState(0)


  let puzzles = useSelector(state => {
    return state.puzzles.puzzleArray
  })
  let puzzle;

  if (puzzles) {
    puzzle = puzzles[0]
  }


  useEffect(async () => {
    await dispatch(getPuzzles());

    return
  }, [dispatch])



  if (puzzles) {
    return (

      <div className='inner-home-container' >
        <span className="Perfect_Fit_header_home">

          <h1 className='splash_text' id='title_splash'>Perfect Fit
            <img src={jigsaw} id="jigsaw"></img></h1>

        </span>

        <ul className='reviews-ul'>
          <li className='li-nostyle review_li'>
            <p className='text-align'>“I completed a 1000 piece puzzle and wanted to move onto something more challenging. Perfect Fit helped me do just that!.”</p>
            <span>★★★★★</span>
          </li>
          <li className='li-nostyle review_li'>
            <p className='text-align'>“Easiest, quickest swap ever! Very easy-to-use and fun to browse!"</p>
            <span>★★★★★</span>
          </li>
          <li className='li-nostyle review_li'>
            <p className='text-align'>“I’ve been looking far and wide for a Game of Thrones puzzle. Found a great one on this site.”</p>
            <span>★★★★★</span>
          </li>
        </ul>

        <span className='home-bottom'>

          <div className='left-home'>
            <div id='browse_title'>Browse Popular Categories</div>
            <ul className='popular-category-ul'>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 1
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={moviePoster} className='pop_category_img'></img> </li>
              </NavLink>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 2
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={natureImage} className='pop_category_img'></img></li>
              </NavLink>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 3
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={arch} id='arch' className='pop_category_img'></img></li>
              </NavLink>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 4
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={landmark} id='landmark' className='pop_category_img'></img></li>
              </NavLink>
            </ul>
            <ul className='popular-category-ul'>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 5
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={hist} id='history' className='pop_category_img'></img></li>
              </NavLink>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 6
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={fantasy} id='fantasy' className='pop_category_img'></img></li>
              </NavLink>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 16
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={space} id='space' className='pop_category_img'></img></li>
              </NavLink>
              <NavLink to={{
                pathname: '/puzzles',
                state: {
                  filter: {
                    category: 17
                  }
                }
              }}>
                <li className='popular-category li-nostyle'><img src={tech} id='tech' className='pop_category_img'></img></li>
              </NavLink>
            </ul>
          </div>

          <div className='right-home'>
            <div className='whats-new'>
              <NavLink to={`/puzzles/${puzzle.id}`} className='visited-link'>
                <div className='right_home_title'>See What's New</div>

                <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={puzzle.image ? puzzle.image : background} alt='Puzzle Thumbnail' id='whats_new_img'></img>
              </NavLink>
            </div>
            <div className='near-you'>
              <NavLink className='visited-link'
                to={{
                  pathname: '/puzzles',
                  state: {
                    filter: {
                      location: user ? user.cityId : 1
                    }
                  }
                }}>
                <div className='right_home_title'>Find Puzzles Near You</div>
                <img src={usa} alt='Puzzle Thumbnail' id='near_you_img'></img>
              </NavLink>
            </div>
          </div>
        </span>



      </div>


    )
  }
  return (<div className="loader"></div>
  )
}

export default Home;
