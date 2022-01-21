import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPuzzle } from '../../store/puzzle';
import { getPuzzles } from '../../store/puzzle';
import { useEffect } from 'react';
import "./PuzzleForm.css"

const AddPuzzleForm = ({ modalSetter }) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getPuzzles())
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id
    const newPuzzle = {
      title,
      userId,
    }

    if (pieceCount.length > 0) {
      newPuzzle.pieceCount = parseInt(pieceCount)
    }
    if (image.replace(/\s/g, '').length) {
      newPuzzle.image = image
    }
    if (description.replace(/\s/g, '').length) {
      newPuzzle.description = description
    }
    if (user.cityId) {
      newPuzzle.cityId = user.cityId
    }
    let newPuzzleDb = null
    if (newPuzzle) {
      newPuzzleDb = await dispatch(createPuzzle(newPuzzle));
      dispatch(getPuzzles())
    }
    // modalSetter(newServerDb['id']);

    return history.push(`/puzzles/${newPuzzleDb['id']}`)
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updatePieceCount = (e) => {
    setPieceCount(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
  const updateImage = (e) => {
    setImage(e.target.value);
  };

  return (
    <>
      <h2 className='modal-label'>New Puzzle</h2>
      <form autoComplete="off" className='add-server-form' onSubmit={onSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='LabelAndInputContainer'>
          <label>Puzzle Name</label>
          <input
            type='text'
            name='title'
            onChange={updateTitle}
            value={title}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className='LabelAndInputContainer'>
          <label>Number of Pieces</label>
          <input
            type='number'
            name='title'
            onChange={updatePieceCount}
            value={pieceCount}
            // required
            autoComplete="off"
          ></input>
        </div>
        <div className='LabelAndInputContainer'>
          <label>Description</label>
          <input
            type='text'
            name='title'
            onChange={updateDescription}
            value={description}
            // required
            autoComplete="off"
          ></input>
        </div>
        <div className='LabelAndInputContainer'>
          <label>Image Url</label>
          <input
            type='text'
            name='image'
            onChange={updateImage}
            value={image}
            autoComplete="off"
          ></input>
        </div>
        <button className='newserver-submit-button' type='submit'>Create Puzzle</button>
      </form>
    </>
  );
};

export default AddPuzzleForm;
