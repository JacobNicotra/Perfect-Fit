import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, Redirect, useParams } from 'react-router-dom';
import { getPuzzleOne } from '../../store/puzzle';
import ProfileModal from '../ProfileModal';
import Profile from '../Profile';
// import AddPuzzleForm from '../AddPuzzleForm'
import AddPuzzleModal from '../AddPuzzleForm/AddPuzzleModal';
import EditPuzzleModal from '../EditPuzzleForm/EditPuzzleModal'
import { Modal } from '../../context/Modal';
import SwapFormModal from '../SwapForm/SwapFormModal';

import ImageUploadModal from '../ImageUpload/ImageUploadModal';
// import AddServerModal from '../AddServerModal';
import './PuzzleDetailsPage.css'
import logoBW from '../../logo-black.png'


const PuzzleDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const puzzleId = params.puzzleId
  const user = useSelector(state => state.session.user);

  const [cogWheelClicked, setCogWheelClicked] = useState(true);
  const [showEditPuzzleModal, setShowEditPuzzleModal] = useState(false);


  let puzzle = useSelector(state => {
    return state.puzzles.puzzle
  })


  let owner = false;
  if (user && puzzle?.userId === user.id) {
    owner = true;
  };

  useEffect(async () => {
    await dispatch(getPuzzleOne(puzzleId));
    // const newPersist = document.querySelector(`.server-${serverId}`);
    // const anotherPersist = document.querySelector('.current-chosen-server');
    // if (anotherPersist) anotherPersist.classList.remove('current-chosen-server');
    // if (newPersist) newPersist.classList.add('current-chosen-server');
    return
  }, [dispatch, puzzleId])

  // if (!user) {
  //     return <Redirect to='/' />;
  // }

  const [showModal, setShowModal] = useState(false);
  const modalSetter = () => {
    setShowModal(false);
  }



  if (puzzle && puzzle.id === parseInt(puzzleId)) {
    return (

      <div className='background'>

        <div id="puz-det">
          <span id="puz-det-header">
            <div className='puz-det-title-owner'>
              <div className='puzzle-details-title'>{puzzle.title}</div>
              <div>{user?.id === puzzle.user.id ? 'This puzzle is owned by you' :
                <div className='puz-det-other-owner'>

                  <div>This puzzle is owned by&nbsp;</div>
                  <NavLink className='user-link-page' to={`/users/${puzzle.userId}`}>{puzzle.user.username}</NavLink>

                </div>


              }</div>
            </div>
            <div className="puz-edit-div"
              hidden={owner !== true}> <EditPuzzleModal className="puzzle-modal" />
            </div>
            <div className="puz-edit-div"
              hidden={owner == true}> <SwapFormModal puzzleOwner={puzzle.user} className="puzzle-modal" />
            </div>



          </span>

          <span id="puz-det-images">

            <div id="puz-det-image-wrap"><img id="puz-det-image" src={puzzle.image ? puzzle.image : logoBW}></img></div>
            <ImageUploadModal />
            {puzzle?.images &&
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
            }
          </span>

          <div className='puzzle-details-description'>{puzzle?.pieceCount} pieces</div>
          <div className='puzzle-details-description'>{puzzle?.description}</div>
        </div>
      </div>
    )
  }
  return (<div className='background'>
    <div className="loader"></div></div>)
}

export default PuzzleDetails;
