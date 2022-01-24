import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddPuzzleForm from './index';

function AddPuzzleModal({ edit }) {
  const [showModal, setShowModal] = useState(false);
  

  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
      <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <Modal className="add-puzzle-modal" onClose={() => setShowModal(false)}>

          <AddPuzzleForm edit={ edit} modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default AddPuzzleModal;
