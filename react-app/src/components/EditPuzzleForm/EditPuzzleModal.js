import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPuzzleForm from './index';

function EditPuzzleModal() {
  const [showModal, setShowModal] = useState(false);
  

  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
      <button className='puz-edit-button' onClick={() => setShowModal(true)}>
      <i className="fas fa-edit"></i>
      </button>
      {showModal && (
        <Modal className="add-puzzle-modal" onClose={() => setShowModal(false)}>

          <EditPuzzleForm  modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default EditPuzzleModal;
