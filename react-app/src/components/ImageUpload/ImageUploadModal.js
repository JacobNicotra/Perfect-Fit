import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageUpload from './index';

function ImageUploadModal() {
  const [showModal, setShowModal] = useState(false);
  

  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
      {/* <button className='add-img-btn' onClick={() => setShowModal(true)}><i className="fas fa-plus-circle"></i></button> */}
      <button className='add-img-btn' onClick={() => setShowModal(true)}>      <i className="fas fa-edit edit-puz"></i>
</button>
      {showModal && (
        <Modal className="add-img-modal" onClose={() => setShowModal(false)}>

          <ImageUpload  modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default ImageUploadModal;
