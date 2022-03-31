import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { createPuzzle, addImg } from '../../store/puzzle';
import { getPuzzles } from '../../store/puzzle';
import { useEffect } from 'react';
import "./Custom.css"

import custom_art from '../../images/custom_order_art.png'

const Custom = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  if (!user) {
    history.push(`/`)
  }

 
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



  const [email, setEmail] = useState(user ? user.email : 'example@example.com');
  const [phone, setPhone] = useState(null);
  const [zipCode, setZipCode] = useState(false);

  const dispatch = useDispatch()

  const params = useParams();
  const puzzleId = params.puzzleId

  useEffect(() => {
    dispatch(getPuzzles())
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();

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

    let titleInput = document.getElementById('title-input')
    let deliveryInput = document.getElementById('delivery-input')
    let difficultyInput = document.getElementById('difficulty-input')
    let categoryInput = document.getElementById('custom-category')
    let descriptionInput = document.getElementById('description-input')
    let pieceCountInput = document.getElementById('pieceCountInput')
    let emailInput = document.getElementById('email_input')
    let imgInput = document.getElementById('img_input')

    let tempErrors = []

    if (!title || !title.replace(/\s/g, '').length) {
      titleInput.className = 'puzzle-form-input custom_input error-input'
      tempErrors = ['Name your puzzle.']
    } else {
      let titleInput = document.getElementById('title-input')
      titleInput.className = 'puzzle-form-input custom_input'
    }

    if (!category) {
      categoryInput.className = 'puzzle-form-input custom_input puz-form-sel error-input'
      tempErrors = [...tempErrors, 'Select Category.']
    } else {
      let categoryInput = document.getElementById('category-input')
      categoryInput.className = 'puzzle-form-input custom_input puz-form-sel'
    }
    if (!description) {
      descriptionInput.className = 'puzzle-form-input custom_input error-input'
      tempErrors = [...tempErrors, 'Provide description.']
    } else {
      let descriptionInput = document.getElementById('description-input')
      descriptionInput.className = 'puzzle-form-input custom_input'
    }

    if (!pieceCount) {
      pieceCountInput.className = 'puzzle-form-input custom_input error-input'
      tempErrors = [...tempErrors, 'Select pieceCountInput']
    } else {
      let pieceCountInput = document.getElementById('pieceCountInput')
      pieceCountInput.className = 'puzzle-form-input custom_input'
    }
    if (!email) {
      emailInput.className = 'puzzle-form-input custom_input error-input'
      tempErrors = [...tempErrors, 'Enter an email.']
    } else {
      emailInput.className = 'puzzle-form-input custom_input'
    }
    if (!image) {
      imgInput.className = 'puzzle-form-input custom_input error-input'
      tempErrors = [...tempErrors, 'Provide an image.']
    } else {
      imgInput.className = ' custom_input'
    }

    if (tempErrors.length > 0) {
      return setErrors(tempErrors)

    }


    return history.push(`/thanks`)

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
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };




  return (
    <>
      <h2 className='custom_title'>Need something a bit more personalized? Create your own puzzle!</h2>
      <p id="custom_p">We can customize a jigsaw puzzle based on any image that you upload.
        Perfect Fit is the perfect gift for any occasion -
        and something your loved ones will cherish for years to come.
        Simply fill out the custom order request form below and a member of our
        team will get back to you with a quote.</p>
      
        <div class='form_and_image_holder_custom'> 
        
        <img id="new_puzzle_img_custom" src={custom_art}></img>

      <form autoComplete="off" id='custom_form' onSubmit={onSubmit}>

        <div id='request'>Request a custom order today!</div>

        <label id='email_label' className='custom_label'>
          Your Email:
        </label>
        <div className='LabelAndInputContainer custom_label_input' id='email_custom_div'>
          {/* <label className="puzzle-form-label">Puzzle Name</label> */}
          <input
            id='email_input'
            type='text'
            onChange={updateEmail}
            value={email}
            // required
            autoComplete="off"
            className="puzzle-form-input custom_input"
          // placeholder="Your Name"

          ></input>
        </div>
        <div id='custom_info'>

          <div className='LabelAndInputContainer custom_label_input'>
            {/* <label className="puzzle-form-label">Puzzle Name</label> */}
            <input
              id='title-input'
              type='text'
              name='title'
              onChange={updateTitle}
              value={title}
              // required
              autoComplete="off"
              className="puzzle-form-input custom_input"
              placeholder="Name your puzzle!"

            ></input>
          </div>
          <div className='LabelAndInputContainer custom_label_input'>
            {/* <label className="puzzle-form-label">Number of Pieces</label> */}
            <input
              type='number'
              id='pieceCountInput'
              name='pieceCount'
              onChange={updatePieceCount}
              value={pieceCount}
              // required
              autoComplete="off"
              className="puzzle-form-input custom_input"
              placeholder="Number of Pieces"


            ></input>
          </div>
          <div className='LabelAndInputContainer custom_label_input'>
            {/* <label className="puzzle-form-label">Number of Pieces</label> */}
            <select name="category" className="puzzle-form-input custom_input puz-form-sel" id='custom-category'

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

          <div className='LabelAndInputContainer custom_label_input'>
            {/* <label className="puzzle-form-label">Description</label> */}
            <textarea
              id='description-input'
              name='title'
              onChange={updateDescription}
              value={description}
              // required
              autoComplete="off"
              className="puzzle-form-input custom_input"
              placeholder="Description"


            ></textarea>
          </div>
           

          <>
            <div className='custom_img' >Upload an Image</div>


            <div className='LabelAndInputContainer'>
              {/* <label className="puzzle-form-label">Image Url</label> */}


              <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                className='img-input'
                id='img_input'
              ></input>

            </div>
          </>
        </div>


        {errors.length > 0 ? <p id='error-prompt'><i className="fas fa-exclamation-triangle"></i>&ensp;Please Provide the<br />Required Information</p>
          :


          (imageLoading) && <p>Loading...</p>}
        <button className='new-puzzle-submit-button' type='submit'>Submit</button>
        </form>
        </div>

    </>
  );
};

export default Custom;
