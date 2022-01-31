import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editPuzzle } from '../../store/puzzle';
import { getPuzzleOne, deletePuzzle } from '../../store/puzzle';
import { useEffect } from 'react';
import "./EditPuzzle.css"

const EditPuzzleForm = ({ modalSetter }) => {
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
    dispatch(getPuzzleOne(puzzleId))
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id
    setErrors([])

    let newPuzzle = {
      'id': puzzleId
    }

    if (title.replace(/\s/g, '').length) {
      newPuzzle.title = title
    }
    if (pieceCount.length > 0) {
      newPuzzle.pieceCount = parseInt(pieceCount)
      console.log(pieceCount, 'pieceCount')
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
      console.log(newPuzzle)
      newPuzzleDb = await dispatch(editPuzzle(newPuzzle));
      dispatch(getPuzzleOne(puzzleId))

    }
    modalSetter(true);

    // return history.push(`/puzzles/${newPuzzleDb['id']}`)
    return

  };

  const handleDelete = async () => {

    const deletedPuzzleId = await dispatch(deletePuzzle(puzzleId));
    // dispatch(getPuzzleOne(puzzleId))

    modalSetter(true);
    return history.push(`/puzzles/`)
    return

  }


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
      <h2 className='modal-label'>{'Edit Puzzle'}</h2>
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
        <button className='new-puzzle-submit-button' type='submit'>{'Submit'}</button>
        <button className='edit-puzzle-delete-button puzzle-form-input' onClick={(e) => {
          e.preventDefault();

          handleDelete()
        }
        }>{'Remove This Puzzle'}</button>

      </form>
    </>
  );
};

export default EditPuzzleForm;
