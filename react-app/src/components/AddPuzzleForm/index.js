import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
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

  const params = useParams();
  const puzzleId = params.puzzleId

  useEffect(() => {
    dispatch(getPuzzles())
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id
    setErrors([])

    let newPuzzle = {

    }


    newPuzzle = {
      title,
      userId,
    }

    if (!title.replace(/\s/g, '').length) {
      return setErrors(['Please name your puzzle.'])
    }

    if (title.replace(/\s/g, '').length ) {
      newPuzzle.title = title
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
    modalSetter(true);

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
      <h2 className='modal-label'>{'New Puzzle'}</h2>
      <form autoComplete="off" className='add-puzzle-form' onSubmit={onSubmit}>
        {errors.length > 0 && <div className='puz-form-erros'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        }
        <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Puzzle Name</label> */}
          <input
            type='text'
            name='title'
            onChange={updateTitle}
            value={title}
            // required
            autoComplete="off"
            className="puzzle-form-input"
            placeholder="Name of Puzzle"

          ></input>
        </div>
        <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Number of Pieces</label> */}
          <input
            type='number'
            name='pieceCount'
            onChange={updatePieceCount}
            value={pieceCount}
            // required
            autoComplete="off"
            className="puzzle-form-input"
            placeholder="Number of Pieces"


          ></input>
        </div>
        <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Description</label> */}
          <input
            type='text'
            name='title'
            onChange={updateDescription}
            value={description}
            // required
            autoComplete="off"
            className="puzzle-form-input"
            placeholder="Description"


          ></input>
        </div>
        <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Image Url</label> */}
          <input
            type='text'
            name='image'
            onChange={updateImage}
            value={image}
            autoComplete="off"
            className="puzzle-form-input"
            placeholder="Image Url"

          ></input>
        </div>
        <button className='new-puzzle-submit-button' type='submit'>{'Create Puzzle'}</button>
      </form>
    </>
  );
};

export default AddPuzzleForm;
