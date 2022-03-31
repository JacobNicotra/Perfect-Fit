import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageUpload from './index';
import edit_puzzle_img from '../../images/edit_picture_icon.png'
import "./ImageUpload.css"

function ImageUploadModal() {
  const [showModal, setShowModal] = useState(false);


  const modalSetter = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* <button className='add-puzzle-button puzzle-buttons' onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
      {/* <button className='add-img-btn' onClick={() => setShowModal(true)}><i className="fas fa-plus-circle"></i></button> */}
      <button className='add-img-btn' onClick={() => setShowModal(true)}>
        <img src={edit_puzzle_img} id='edit_puzzle_img'></img>
        <div>Edit Image</div>
      </button>
      {showModal && (
        <Modal className="add-img-modal" id='add_img_modal' onClose={() => setShowModal(false)} size='img'>

          <ImageUpload modalSetter={modalSetter} />
        </Modal>
      )}
    </>
  );
}

export default ImageUploadModal;
