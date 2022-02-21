import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createPuzzle, addImg } from '../../store/puzzle';
import { getPuzzles } from '../../store/puzzle';
import { useEffect } from 'react';
import "./PuzzleForm.css"

const AddPuzzleForm = ({ modalSetter }) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(null);
  const [pieceCount, setPieceCount] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [delivery, setDelivery] = useState(null);
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

    let modal = document.getElementById('modal-content')
    let titleInput = document.getElementById('title-input')
    let deliveryInput = document.getElementById('delivery-input')
    let difficultyInput = document.getElementById('difficulty-input')
    let categoryInput = document.getElementById('category-input')
    let descriptionInput = document.getElementById('description-input')
    let pieceCountInput = document.getElementById('pieceCountInput')

    let tempErrors = []

    if (!title || !title.replace(/\s/g, '').length) {
      titleInput.className = 'puzzle-form-input error-input'
      modal.className = 'modal-content error-input'
      tempErrors = ['Name your puzzle.']
    } else {
      let titleInput = document.getElementById('title-input')
      modal.className = 'modal-content'
      titleInput.className = 'puzzle-form-input'
    }
    if (!delivery) {
      deliveryInput.className = 'radio-wrapper error-input'
      modal.className = 'modal-content error-input'
      tempErrors = [...tempErrors, 'Specify delivery method.']
    } else {
      let deliveryInput = document.getElementById('delivery-input')
      modal.className = 'modal-content'
      deliveryInput.className = 'radio-wrapper'
    }
    if (!category) {
      categoryInput.className = 'puzzle-form-input puz-form-sel error-input'
      modal.className = 'modal-content error-input'
      tempErrors = [...tempErrors, 'Select Category.']
    } else {
      let categoryInput = document.getElementById('category-input')
      modal.className = 'modal-content'
      categoryInput.className = 'puzzle-form-input puz-form-sel'
    }
    if (!description) {
      descriptionInput.className = 'puzzle-form-input error-input'
      modal.className = 'modal-content error-input'
      tempErrors = [...tempErrors, 'Provide description.']
    } else {
      let descriptionInput = document.getElementById('description-input')
      modal.className = 'modal-content'
      descriptionInput.className = 'puzzle-form-input'
    }
    if (!difficulty) {
      difficultyInput.className = 'puzzle-form-input puz-form-sel error-input'
      modal.className = 'modal-content error-input'
      tempErrors = [...tempErrors, 'Select difficulty']
    } else {
      let difficultyInput = document.getElementById('difficulty-input')
      modal.className = 'modal-content'
      difficultyInput.className = 'puzzle-form-input puz-form-sel'
    }
    if (!pieceCount) {
      pieceCountInput.className = 'puzzle-form-input error-input'
      modal.className = 'modal-content error-input'
      tempErrors = [...tempErrors, 'Select pieceCountInput']
    } else {
      let pieceCountInput = document.getElementById('pieceCountInput')
      modal.className = 'modal-content'
      pieceCountInput.className = 'puzzle-form-input'
    }

    if (tempErrors.length > 0) {
      return setErrors(tempErrors)

    }

    
    newPuzzle.pieceCount = parseInt(pieceCount)
   
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
      newPuzzle.difficulty = difficulty
    }
    if (delivery) {
      newPuzzle.delivery = delivery
    }
    if (user.cityId) {
      newPuzzle.cityId = user.cityId
    }
    let newPuzzleDb = null
    if (newPuzzle) {
      console.log('_____frontend newPuz', newPuzzle)
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
    if (e.target.checked) {
      setDelivery(e.target.value)
    } return
  };
  const updatePickup = (e) => {
    if (pickup) {
      setPickup(false)
    } else {
      setPickup(true)
    }
  };
  const updateImage = (e) => {
    setImage(e.target.value);
  };


  return (
    <>
      <h2 className='modal-label'>{'New Puzzle'}</h2>
      <form autoComplete="off" className='add-puzzle-form' id='add-puz-form' onSubmit={onSubmit}>
        {errors.length > 0 && <div className='puz-form-erros'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        }
        <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Puzzle Name</label> */}
          <input
            id='title-input'
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
            id='pieceCountInput'
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
          <select name="category" id="category-select" className="puzzle-form-input puz-form-sel" id='category-input'

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
          <select name="category" id="category-select" className="puzzle-form-input puz-form-sel" id='difficulty-input'

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
            id='description-input'

            name='title'
            onChange={updateDescription}
            value={description}
            // required
            autoComplete="off"
            className="puzzle-form-input"
            placeholder="Description"


          ></input>
        </div>


        <div className='radio-wrapper' id='delivery-input'
        >
          <span className='radio-prompt'>How would you like users <br />to swap for this puzzle?</span>

          <div className='delivery-input'>
            <label>
              <input type="radio" name='delivery-method'
                // checked
                onChange={updateDelivery}
                checked={delivery == 'either'}
                value='either'
              >
              </input>
              <span>Mail & Local Pickup</span>
            </label>

          </div>
          <div className='delivery-input'>
            <label>
              <input type="radio" name='delivery-method'
                // checked
                onChange={updateDelivery}
                checked={delivery == 'pickup'}
                value='pickup'
              >
              </input>
              <span>Local Pickup</span>
            </label>

          </div>
          <div className='delivery-input'>
            <label>

              <input type="radio" name='delivery-method'
                // checked
                onChange={updateDelivery}
                checked={delivery == 'delivery'}
                value='delivery'

              >
              </input>
              <span>Mail</span>
            </label>

          </div>
        </div>


        {errors.length > 0 ? <p id='error-prompt'>Please Provide <br />Required Information</p>
          :


          (imageLoading) && <p>Loading...</p>}
        <button className='new-puzzle-submit-button' type='submit'>{'Create Puzzle'}</button>
      </form>
    </>
  );
};

export default AddPuzzleForm;
