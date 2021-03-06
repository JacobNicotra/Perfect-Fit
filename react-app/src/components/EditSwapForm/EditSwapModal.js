import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSwapForm from './index';

function EditSwapModal({ otherUserId, swap, swapEditDetector }) {
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
            otherUserId={otherUserId}
            swap={swap}
            modalSetter={modalSetter}
            swapEditDetector={swapEditDetector}
          />
        </Modal>
      )}
    </>
  );
}

export default EditSwapModal;
