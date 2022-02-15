import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';


import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './PuzzlePage.css'
import logo from '../../logo-black.png'
import logoBW from '../../logo-black.png'

import Intro from '../Intro';


const Puzzle = () => {
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
    // const newPersist = document.querySelector(`.server-${serverId}`);
    // const anotherPersist = document.querySelector('.current-chosen-server');
    // if (anotherPersist) anotherPersist.classList.remove('current-chosen-server');
    // if (newPersist) newPersist.classList.add('current-chosen-server');
    return
  }, [dispatch])

  // if (!user) {
  //     return <Redirect to='/' />;
  // }



  if (puzzles) {
    return (

      <div className='background'>
        <Intro puzzle={puzzles[6]} />

        <div className='puz-page-holder'>
          <div className='latest'>Latest Puzzles</div>
          <ul id="puzzle-cards">
            {puzzles.map(puzzle => {
              let color
              if (puzzle.image !== 'none') {
                color = 'transparent'
              } else {
                color = 'white'
              }
              return (
                <li key={puzzle.id} className='puzzle-card-wrapper' id={`puzzle-${puzzle.id}`}>
                  <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                    <span className='puzzle-card-title'>{puzzle.title}</span>
                    <span className='puzzle-card-rating'></span>
                    <NavLink to={`/puzzles/${puzzle.id}`}>
                      <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                    </NavLink>


                  </div>

                </li >
              )
            })}
          </ul >
        </div >
      </div >


    )
  }
  return (<div className="loader"></div>
  )
}

export default Puzzle;
