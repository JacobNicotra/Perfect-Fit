import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { createPuzzle } from '../../store/puzzle';
import { getPuzzlesUser, getPuzzlesRecipient } from '../../store/puzzle';
import { useEffect } from 'react';
import "./SwapForm.css"
import logoBW from '../../logo-bw-bg.png'
import {createSwap} from '../../store/swap'


const SwapForm = ({ modalSetter, puzzleOwnerId }) => {


  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [givePuzzleId, setGivePuzzleId] = useState('');
  const [getPuzzleId, setGetPuzzleId] = useState('');

  const user = useSelector(state => state.session.user);
  const userPuzzles = useSelector(state => state.puzzles.userPuzzleArray);

  const dispatch = useDispatch()
  const history = useHistory()

  const params = useParams();
  const puzzleId = params.puzzleId

  console.log('___________puzzleOWNERID', puzzleOwnerId, 'USERID', user.id)
  useEffect(() => {
    dispatch(getPuzzlesUser(user.id))
    // dispatch(getPuzzlesRecipient(puzzleOwnerId))
  }, [dispatch])

  const onSubmit = async (e) => {
      e.preventDefault();
      console.log('#############SUBMIT')
      setErrors([])

      let newSwap = {
        userId: user.id,
        recipientId: puzzleOwnerId,
        givePuzzleId,
        getPuzzleId: puzzleId
      }
      console.log('_______NEW SWAP', newSwap)

    //   if (!title.replace(/\s/g, '').length) {
    //     return setErrors(['Please name your puzzle.'])
    //   }
      if (!givePuzzleId) {
        return setErrors(['Please choose one of your puzzles to trade.'])
      }


      if (message.replace(/\s/g, '').length) {
        newSwap.message = message
      }

      let newSwapDb = null
      if (newSwap) {

          newSwapDb = await dispatch(createSwap(newSwap));
          // dispatch(getPuzzles())

      }
    modalSetter(true);

      return history.push(`/swaps`)

  };

  const onPuzzleSelect = async(e) => {
    e.preventDefault();

    console.log(' ** *** ** *** give puzzle id', e.currentTarget.id, 'get puzzle id', puzzleId, 'recipient', puzzleOwnerId)
    setGivePuzzleId(e.currentTarget.id)
    // setGetPuzzleId(puzzleId)
  }


  // const updateTitle = (e) => {
  //   setTitle(e.target.value);
  // };
  // const updatePieceCount = (e) => {
  //   setPieceCount(e.target.value);
  // };
  // const updateDescription = (e) => {
  //   setDescription(e.target.value);
  // };
  // const updateImage = (e) => {
  //   setImage(e.target.value);
  // };


  const updateMessage = (e) => {
    setMessage(e.target.value);
  };


  return (<div>

    <span className='puzzle-decor-holder'>
      <div className='puzzle-decor1'><i className="fas fa-puzzle-piece"></i></div>
      <div className='puzzle-decor2'><i className="fas fa-puzzle-piece"></i></div>
      <div className='puzzle-decor3'><i className="fas fa-puzzle-piece"></i></div>
      <div className='puzzle-decor4'><i className="fas fa-puzzle-piece"></i></div>
      <div className='puzzle-decor5'><i className="fas fa-puzzle-piece"></i></div>
      <div className='puzzle-decor6'><i className="fas fa-puzzle-piece"></i></div>
    </span>

    <h1 className='swap-form-title'>Swap for this Puzzle!</h1>
    <form autoComplete="off" className='add-puzzle-form' onSubmit={onSubmit}>
      <div>Choose a Puzzle of Yours To Exchange</div>
      <ul className='user-puz-selection'>
        {userPuzzles &&
          userPuzzles.map(puzzle => {
            return (
                  <button  id={puzzle.id} onClick={(e) => {
                    e.preventDefault();
                    onPuzzleSelect(e);
                  }} className='puz-select-button'>
              <li key={puzzle.id} className='puzzle-card-wrapper'>
                <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background puzzle-card-background-swap-form'}>
                  <span className='puzzle-card-title puz-title-swap-form'>{puzzle.title}</span>
                  <span className='puzzle-card-rating'></span>
                    <img   className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo logo-swap-form'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>


                </div>

              </li >
                  </button>
            )
          })
        }
      </ul>

 <div className='LabelAndInputContainer'>
          {/* <label className="puzzle-form-label">Puzzle Name</label> */}
          <input
            type='text'
            name='message'
            onChange={updateMessage}
            value={message}
            // required
            autoComplete="off"
            className="puzzle-form-input swap-message-input"
            placeholder="Leave a message with your swap request"

          ></input>
                  <button className='new-puzzle-submit-button' type='submit'>{'Submit Swap Request!'}</button>

        </div>








    </form>

  </div>

  )


  // return (
  //   <>
  //     <h2 className='modal-label'>{'New Puzzle'}</h2>
  //     <form autoComplete="off" className='add-puzzle-form' onSubmit={onSubmit}>
  //       {errors.length > 0 && <div className='puz-form-erros'>
  //         {errors.map((error, ind) => (
  //           <div key={ind}>{error}</div>
  //         ))}
  //       </div>
  //       }
  //       <div className='LabelAndInputContainer'>
  //         {/* <label className="puzzle-form-label">Puzzle Name</label> */}
  //         <input
  //           type='text'
  //           name='title'
  //           onChange={updateTitle}
  //           value={title}
  //           // required
  //           autoComplete="off"
  //           className="puzzle-form-input"
  //           placeholder="Name of Puzzle"

  //         ></input>
  //       </div>
  //       <div className='LabelAndInputContainer'>
  //         {/* <label className="puzzle-form-label">Number of Pieces</label> */}
  //         <input
  //           type='number'
  //           name='pieceCount'
  //           onChange={updatePieceCount}
  //           value={pieceCount}
  //           // required
  //           autoComplete="off"
  //           className="puzzle-form-input"
  //           placeholder="Number of Pieces"


  //         ></input>
  //       </div>
  //       <div className='LabelAndInputContainer'>
  //         {/* <label className="puzzle-form-label">Description</label> */}
  //         <input
  //           type='text'
  //           name='title'
  //           onChange={updateDescription}
  //           value={description}
  //           // required
  //           autoComplete="off"
  //           className="puzzle-form-input"
  //           placeholder="Description"


  //         ></input>
  //       </div>
  //       <div className='LabelAndInputContainer'>
  //         {/* <label className="puzzle-form-label">Image Url</label> */}
  //         <input
  //           type='text'
  //           name='image'
  //           onChange={updateImage}
  //           value={image}
  //           autoComplete="off"
  //           className="puzzle-form-input"
  //           placeholder="Image Url"

  //         ></input>
  //       </div>
  //       <button className='new-puzzle-submit-button' type='submit'>{'Create Puzzle'}</button>
  //     </form>
  //   </>
  // );
};

export default SwapForm;
