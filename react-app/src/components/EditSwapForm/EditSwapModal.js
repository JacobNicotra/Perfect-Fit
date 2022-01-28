import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSwapForm from './index';

function EditSwapModal({ recipient }) {
  const [showModal, setShowModal] = useState(false);
  

  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
      <button className='swap-btn' onClick={() => setShowModal(true)}> <i className="fas fa-edit edit-puz"></i></button>
      {showModal && (
        <Modal className="add-puzzle-modal" onClose={() => setShowModal(false)}>

          <EditSwapForm 
          recipient={recipient} 
          modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default EditSwapModal;
