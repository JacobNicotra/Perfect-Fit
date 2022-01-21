import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddPuzzleForm from './index';

function AddPuzzleModal() {
  const [showModal, setShowModal] = useState(false);

  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          
          <AddPuzzleForm modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default AddPuzzleModal;
