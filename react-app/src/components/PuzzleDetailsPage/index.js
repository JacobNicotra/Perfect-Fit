import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, Redirect, useParams } from 'react-router-dom';
import { getPuzzleOne } from '../../store/puzzle';
import ProfileModal from '../ProfileModal';
import Profile from '../Profile';
import AddPuzzleForm from '../AddPuzzleForm'
import AddPuzzleModal from '../AddPuzzleForm/AddPuzzleModal';
import { Modal } from '../../context/Modal';

// import AddServerModal from '../AddServerModal';
import './PuzzleDetailsPage.css'


const PuzzleDetails = () => {
  console.log('see puz dets ()()()()()()()(()()()()()(')
  const dispatch = useDispatch();
  const params = useParams();
  const puzzleId = params.puzzleId
  const user = useSelector(state => state.session.user);

  const [cogWheelClicked, setCogWheelClicked] = useState(true);
  const [showEditPuzzleModal, setShowEditPuzzleModal] = useState(false);





  let puzzle = useSelector(state => {
    return state.puzzles.puzzle
  })

  console.log('PUZ DETES PUZZLEES', puzzle)

  let owner = false;
  if (user && puzzle?.userId === user.id) {
    owner = true;
  };

  console.log('OWNER', owner)


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

  const [showModal, setShowModal] = useState(false);
  const modalSetter = () => {
    setShowModal(false);
  }



  if (puzzle) {
    return (
      <div id="puz-det">
        <span id="puz-det-header">
          <div className='puzzle-details-title'>{puzzle.title}</div>
          <button onClick={() => setShowEditPuzzleModal(true)}
            hidden={owner !== true}> {cogWheelClicked ? <i className='fas fa-cog cogSpin' id={`cog-icon-${puzzle.id}`}></i> : <i className='fas fa-cog cogStatic' id={`cog-icon-${puzzle.id}`}></i>}</button>
          {/* {showEditPuzzleModal && (
            <AddPuzzleModal edit={true} puzzleId={ puzzleId}/>
          )} */}
          {showEditPuzzleModal && (
            <Modal onClose={() => setShowEditPuzzleModal(false)}>
              <AddPuzzleForm edit={true} puzzleId={puzzleId} modalSetter={modalSetter}/>
            </Modal>
          )}
        </span>
        {puzzle?.images && 
        
        <span id="puz-det-images">

          <div id="puz-det-image-wrap"><img id="puz-det-image" src={puzzle?.image}></img></div>
          <ul id="puzzle-details-ul">
            {puzzle.images.map(image => {
              return (
                <li key={image.id} className='puzzle-details-li'>
                  <div >

                    <img className="puzzle-details-image" src={image.image} alt=''></img>



                  </div>

                </li >
              )
            })}
          </ul >
        </span>
        
        }
        <div className='puzzle-details-description'>{puzzle.description}</div>
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
  return ('loading puzzle details')
}

export default PuzzleDetails;
http
