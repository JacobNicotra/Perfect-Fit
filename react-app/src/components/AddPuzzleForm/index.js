import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createPuzzle, addImg } from '../../store/puzzle';
import { getPuzzles } from '../../store/puzzle';
import { useEffect } from 'react';
import "./PuzzleForm.css"

const AddPuzzleForm = ({ modalSetter }) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [pieceCount, setPieceCount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);



  const user = useSelector(state => state.session.user);
  console.log('-=-=-=-=-=-=-=-=-=-=-=- =-=- =-=- =-=-=-=- user from addpuzzlefrom', user)
  const dispatch = useDispatch()
  const history = useHistory()

  const params = useParams();
  const puzzleId = params.puzzleId

  useEffect(() => {
    dispatch(getPuzzles())
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    // console.log('_____________formData', formData)
    setImageLoading(true);

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


    if (pieceCount.length > 0) {
      newPuzzle.pieceCount = parseInt(pieceCount)
    }
    // if (image.replace(/\s/g, '').length) {
    //   newPuzzle.image = image
    // }
    if (description.replace(/\s/g, '').length) {
      newPuzzle.description = description
    }
    if (category) {
      newPuzzle.categoryId = parseInt(category)
    }
    if (difficulty) {
      newPuzzle.difficultyId = difficulty
    }
    if (delivery) {
      newPuzzle.deliveryId = delivery
    }
    if (user.cityId) {
      newPuzzle.cityId = user.cityId
    }
    let newPuzzleDb = null
    if (newPuzzle) {
      newPuzzleDb = await dispatch(createPuzzle(newPuzzle));
      if (newPuzzleDb) {
      }
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
  const updateCategory = (e) => {
    setCategory(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
  const updateDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const updateDelivery = (e) => {
    if (delivery) {
      setDelivery(false)
    } else {
      setDelivery(true)
    }
  };
  const updatePickup = (e) => {
    if (pickup) {
      setPickup(false)
    } else {
      setPickup(true)
    }  };
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
          {/* <label className="puzzle-form-label">Number of Pieces</label> */}
          <select name="category" id="category-select" className="puzzle-form-input"
            onChange={updateCategory}
            value={category}
          >

            <option value="">Category</option>
            <option value={1}>Movies</option>
            <option value={2}>Nature</option>
            <option value={3}>Architecture</option>
            <option value={4}>Landmarks</option>
            <option value={5}>History</option>
            <option value={6}>Fantasy</option>
            <option value={7}>Animals</option>
            <option value={8}>Kids</option>
            <option value={9}>Art</option>
            <option value={10}>Religious</option>
            <option value={11}>Food</option>
            <option value={12}>Comedy</option>
            <option value={13}>Holidays</option>
            <option value={14}>Celebrities</option>
            <option value={15}>Sport</option>
            <option value={16}>Space</option>
            <option value={17}>Technology</option>
            <option value={18}>Cars</option>
            <option value={19}>Miscellaneous</option>
          </select>
        </div>
        <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Number of Pieces</label> */}
          <select name="category" id="category-select" className="puzzle-form-input"
            onChange={updateDifficulty}
            value={category}
          >

            <option value="">Difficulty level</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
            <option value='expert'>Expert</option>

          </select>
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



        <div>
         
          <input type="radio" id="huey" name="delivery" 
            // checked
            onChange={updateDelivery}
            checked={delivery}
          >
            </input>
          
        </div>


        <button className='new-puzzle-submit-button' type='submit'>{'Create Puzzle'}</button>
        {(imageLoading) && <p>Loading...</p>}
      </form>
    </>
  );
};

export default AddPuzzleForm;
