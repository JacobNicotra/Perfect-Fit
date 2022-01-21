import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, Redirect, useParams } from 'react-router-dom';
import { getPuzzleOne } from '../../store/puzzle';
import ProfileModal from '../ProfileModal';
import Profile from '../Profile';

// import AddServerModal from '../AddServerModal';
import './PuzzleDetailsPage.css'


const PuzzleDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const puzzleId = params.puzzleId
    const user = useSelector(state => state.session.user);

  let puzzle = useSelector(state => {
      console.log('_____!!!!!___state', state)
        return state.puzzles.puzzle
    })
  
  console.log('_____puzzle', puzzle)

    useEffect(async () => {
        await dispatch(getPuzzleOne(puzzleId));
        // const newPersist = document.querySelector(`.server-${serverId}`);
        // const anotherPersist = document.querySelector('.current-chosen-server');
        // if (anotherPersist) anotherPersist.classList.remove('current-chosen-server');
        // if (newPersist) newPersist.classList.add('current-chosen-server');
        return
    }, [dispatch])

    // if (!user) {
    //     return <Redirect to='/' />;
    // }

    if (puzzle) {
      return (
        <div>
          <div className='puzzle-details-title'>{puzzle.title}</div>
          <div className='puzzle-details-description'>{puzzle.description}</div>
          <Profile/>
          <ProfileModal/>
          </div>
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

export default PuzzleDetails;
