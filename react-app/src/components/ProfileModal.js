import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import Profile from './Profile';


function ProfileModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='NavButtons' onClick={() => setShowModal(true)}>Profile</button>
      {showModal && (
        // <Modal style={{opacity:1}} onClose={() => setShowModal(false)}>
        //   <Profile />
        // </Modal>
        <Modal animation={false} style={{opacity:1}} onClose={() => setShowModal(false)}>
          <Profile />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
