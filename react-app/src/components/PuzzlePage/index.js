import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, Redirect, useParams } from 'react-router-dom';
import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './PuzzlePage.css'
import logo from '../../logobg.png'


const Puzzle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const serverId = params.serverId
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
      <div>
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
                <div className='puzzle-card'>
                  <span className='puzzle-card-title'>{puzzle.title}</span>
                  <span className='puzzle-card-rating'></span>
                  <NavLink to={`/puzzles/${puzzle.id}`}>
                    <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={puzzle.image ? puzzle.image : logo} alt='Puzzle Thumbnail'></img>
                  </NavLink>


                </div>

              </li >
            )
          })}
        </ul >
      </div >
      //         <>
      //             <div className='ServerContainer'>
      //                 <NavLink to='/channels/'>
      //                     <div title='Home' className='server-buttons home-button server-pop'></div>
      //                 </NavLink>
      //                 <ul className="Bar">
      //                 <div key='seperator' className='seperator'></div>
      //                     {servers.map(server => {
      //                         let color
      //                         if (server.image !== 'none') {
      //                            color = 'transparent'
      //                         } else {
      //                             color = 'white'
      //                         }
      //                         return (
      //                             <li className={`serverButtons server-pop server-${server.serverId}`} key={server.id} title={`${server.title}`}>
      //                                 <NavLink title={`${server.title}`} to={`/channels/${server.serverId}`}><button className='server-buttons'
      //                                     style={{backgroundImage: `url(${server.image})`,
      //                                     backgroundSize: 'cover',
      //                                     backgroundRepeat: "no-repeat",
      //                                     backgroundClip: "text",
      //                                     color: color
      //                                 }}>{(server.title[0])}</button></NavLink>
      //                             </li>
      //                         )
      //                     })}
      //                     <div key='seperator-bottom' className='seperator'></div>
      //                     <li className="server-pop" title="Add a server" key='add-server-modal'>
      //                         <AddServerModal />
      //                     </li>
      //                     <div key='empty-space' className='emptySpace'></div>
      //                 </ul>
      //             </div>
      //         </>
    )
  }
  return ('no puzzles')
}

export default Puzzle;
