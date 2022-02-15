import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import Tour from 'reactour'

import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './PuzzlePage.css'
import logo from '../../logo-black.png'
import logoBW from '../../logo-black.png'


const Puzzle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const serverId = params.serverId
  const user = useSelector(state => state.session.user);
  const [isTourOpen, setIsTourOpen] = useState(true);

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

  const steps = [
    {
      selector: '.first-step',
      content: 'This is my first Step',
    },
    {
      selector: '.second-step',
      content: 'This is my second Step',
    },
    {
      selector: '.third-step',
      content: 'This is my third Step',
    },
    // ...
  ]

  if (puzzles) {
    return (

      <div className='background'>

        <>
          { /* other stuff */}
          <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}
          />
        </>
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
                <li key={puzzle.id} className='puzzle-card-wrapper'>
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
