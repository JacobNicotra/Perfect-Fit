import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPuzzleForm from './index';
import picture_edit_icon from '../../images/edit_picture_icon.png'

function EditPuzzleModal() {
  const [showModal, setShowModal] = useState(false);
  

  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
      <button className='puz-edit-button' onClick={() => setShowModal(true)}>
        <span id='edit_span'>
          <i className="fas fa-edit edit-puz"></i>
          <div id="edit_details">Edit Details</div>
        </span>
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
