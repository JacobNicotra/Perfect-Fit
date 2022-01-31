import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { createPuzzle } from '../../store/puzzle';
import { getPuzzlesUser, getPuzzlesRecipient } from '../../store/puzzle';
import { useEffect } from 'react';
import "./EditSwap.css"
import logoBW from '../../logo-black.png'
import { createSwap, editSwap, deleteSwap, getUserSwaps } from '../../store/swap'


const SwapForm = ({ modalSetter, otherUserId, swap, swapEditDetector }) => {

  let oldSelectedGetPuzzle = document.getElementById(`${swap.getPuzzleId}`);
  let oldSelectedGivePuzzle = document.getElementById(`${swap.givePuzzleId}`);

  console.log('--------preload ---> swap', swap, 'swap.getPuzzleId', swap.getPuzzleId, 'oldSelectedGetPuzzle', oldSelectedGetPuzzle, 'swap.givePuzzleId', swap.givePuzzleId,)


  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [givePuzzleId, setGivePuzzleId] = useState('');
  const [getPuzzleId, setGetPuzzleId] = useState('');


  const [getPuzzleSelected, setGetPuzzleSelected] = useState('');
  const [givePuzzleSelected, setGivePuzzleSelected] = useState('');

  const user = useSelector(state => state.session.user);
  const userPuzzles = useSelector(state => state.puzzles.userPuzzleArray);
  const recipientPuzzles = useSelector(state => state.puzzles.recipientPuzzleArray);

  console.log('otherUserId', otherUserId)

  const dispatch = useDispatch()
  const history = useHistory()

  const params = useParams();

  // console.log('___________puzzleOWNERID', puzzleOwnerId, 'USERID', user.id)


  useEffect(() => {
    dispatch(getPuzzlesUser(user.id))
    dispatch(getPuzzlesRecipient(otherUserId))

  }, [dispatch])

  console.log('swap.userId', swap.userId, 'user.Id', user.id)

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('#############SUBMIT')
    setErrors([])

    let owner = swap.userId === user.id

    let newSwap;

    if (owner) {

      newSwap = {
        givePuzzleId,
        getPuzzleId,
        recipientAccept: false,
        userAccept: true
      }
    } else {
      newSwap = {
        givePuzzleId,
        getPuzzleId,
        userAccept: false,
        recipientAccept: true
      }
    }

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
      newSwapDb = await dispatch(editSwap(newSwap, swap.id));
      // dispatch(getPuzzles())

    }
    modalSetter(true);
    swapEditDetector()

    // history.push(`/swaps`)
    return

  };

  const onPuzzleSelectGet = async (first, e) => {
    console.log('_____ onPuzzleSelectGet _invoked')
    if (first) {
      console.log('eeeee', e)
      setGetPuzzleId(e.id)
      if (getPuzzleSelected !== '') {
        getPuzzleSelected.className = 'puz-select-button'
      }
      setGetPuzzleSelected(e)
      e.className = "puz-select-button selected-give-puzzle"
      return
    }

    e.preventDefault();

    console.log(' e.currentTarget', e.currentTarget, 'e.currentTarget.id', e.currentTarget.id)

    setGetPuzzleId(e.currentTarget.id)

    if (getPuzzleSelected !== '') {
      getPuzzleSelected.className = 'puz-select-button'
    }
    setGetPuzzleSelected(e.currentTarget)
    e.currentTarget.className = "puz-select-button selected-give-puzzle"

  }

  const onPuzzleSelectGive = async (first, e) => {
    console.log('_____ onPuzzleSelectGive _invoked')


    if (first) {
      console.log('eeeee', e)
      setGivePuzzleId(e.id)
      if (givePuzzleSelected !== '') {
        givePuzzleSelected.className = 'puz-select-button'
      }
      setGivePuzzleSelected(e)
      e.className = "puz-select-button selected-give-puzzle"
      return
    }
    e.preventDefault();

    console.log(' e.currentTarget', e.currentTarget, 'e.currentTarget.id', e.currentTarget.id)

    setGivePuzzleId(e.currentTarget.id)

    if (givePuzzleSelected !== '') {
      givePuzzleSelected.className = 'puz-select-button'
    }
    setGivePuzzleSelected(e.currentTarget)
    e.currentTarget.className = "puz-select-button selected-give-puzzle"

  }


  useEffect(async () => {

    let oldSelectedGetPuzzle = document.getElementById(`${swap.getPuzzleId}`);
    let oldSelectedGivePuzzle = document.getElementById(`${swap.givePuzzleId}`);

    if (oldSelectedGetPuzzle && oldSelectedGivePuzzle) {
      console.log('OLD ARE TRUTHY')

      if (getPuzzleSelected == '') {

        console.log('onPuzzleSelectGive EMPTY')
        onPuzzleSelectGet(true, oldSelectedGetPuzzle)
        onPuzzleSelectGive(true, oldSelectedGivePuzzle)
      }
    }

  }, [dispatch])


  const handleDelete = async () => {
    console.log('DELETE PRESSED')
    const deletedSwap = await dispatch(deleteSwap(swap.id));
    dispatch(getUserSwaps(user.id))
    // dispatch(getRecipientSwaps(user.id))

    modalSetter(true);

    swapEditDetector()
    // return history.push(`/puzzles/`)
    return

  }


  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  if (swap) {
    return (

      <div>

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
          <span className='edit-swap-lists-wrapper'>
            put stuff here

            <div>
              <div>Change the Puzzle that you are requesting</div>
              <ul className='user-puz-selection'>
                {recipientPuzzles &&
                  recipientPuzzles.map(puzzle => {
                    return (
                      <button id={puzzle.id} onClick={(e) => {
                        e.preventDefault();
                        onPuzzleSelectGet(false, e);
                      }} className='puz-select-button'>
                        <li key={puzzle.id} className='puzzle-card-wrapper puz-card-wrap-form'>
                          <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background puzzle-card-background-swap-form'}>
                            <span className='puzzle-card-title puz-title-swap-form'>{puzzle.title}</span>
                            <span className='puzzle-card-rating'></span>
                            <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo logo-swap-form'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>


                          </div>

                        </li >
                      </button>
                    )
                  })
                }
              </ul>
            </div>
            <div>
              <div>Change the puzzle of yours that you wish to exchange</div>
              <ul className='user-puz-selection'>
                {userPuzzles &&
                  userPuzzles.map(puzzle => {
                    return (
                      <button id={puzzle.id} onClick={(e) => {
                        e.preventDefault();
                        onPuzzleSelectGive(false, e);
                      }} className='puz-select-button'>
                        <li key={puzzle.id} className='puzzle-card-wrapper puz-card-wrap-form'>
                          <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background puzzle-card-background-swap-form'}>
                            <span className='puzzle-card-title puz-title-swap-form'>{puzzle.title}</span>
                            <span className='puzzle-card-rating'></span>
                            <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo logo-swap-form'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>


                          </div>

                        </li >
                      </button>
                    )
                  })
                }
              </ul>
            </div>
          </span>

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
        <button onClick={handleDelete} className='new-puzzle-submit-button'>{'Revoke this swap request'}</button>

      </div>

    )

  }
  return (<div className="loader"></div>)


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
