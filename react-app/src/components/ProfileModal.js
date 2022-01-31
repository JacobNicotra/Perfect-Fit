import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';


function ProfileModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {sessionUser ?
        <button className='profile-button-signedin' onClick={() => setShowModal(true)}>{ sessionUser.username}</button>
        :
        <button className='profile-button' onClick={() => setShowModal(true)}></button>

      }
      {showModal && (
        // <Modal style={{opacity:1}} onClose={() => setShowModal(false)}>
        //   <Profile />
        // </Modal>
        <Modal animation={false} style={{ opacity: 1 }} onClose={() => setShowModal(false)}>
          <Profile />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
