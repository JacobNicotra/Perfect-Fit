const LOAD = 'puzzles/LOAD';
const LOAD_USER = 'puzzles/LOAD_USER';
const LOAD_RECIPIENT = 'puzzles/LOAD_RECIPIENT';
const LOAD_ONE = 'puzzles/LOAD_ONE';
const ADD_ONE = 'puzzles/ADD_ONE';
const DELETE_ONE = 'puzzles/DELETE_ONE'
const EDIT_ONE = 'puzzles/EDIT_ONE'

const load = puzzleArray => ({
    type: LOAD,
    puzzleArray
})

const loadUserPuzzles = userPuzzleArray => ({
    type: LOAD_USER,
    userPuzzleArray
})
const loadRecipientPuzzles = recipientPuzzleArray => ({
    type: LOAD_RECIPIENT,
    recipientPuzzleArray
})

const loadOne = puzzle => ({
    type: LOAD_ONE,
    puzzle
})

const addOnePuzzle = puzzle => ({
    type: ADD_ONE,
    puzzle
})

const deleteOnePuzzle = puzzleId => ({
    type: DELETE_ONE,
    puzzleId
})

const editOnePuzzle = puzzle => ({
    type: EDIT_ONE,
    puzzle
})

export const getPuzzles = () => async dispatch => {

    const response = await fetch(`/api/puzzles/`)

    if (response.ok) {
        const puzzleArray = await response.json()
        dispatch(load(puzzleArray))
    }
}

export const getPuzzlesUser = (userId) => async dispatch => {


    const response = await fetch(`/api/puzzles/users/${userId}/`)

    if (response.ok) {
        const userPuzzleArray = await response.json()
        dispatch(loadUserPuzzles(userPuzzleArray))
    }
}

export const getPuzzlesRecipient = (recipientId) => async dispatch => {

    const response = await fetch(`/api/puzzles/users/${recipientId}/`)

    if (response.ok) {
        const recipientPuzzleArray = await response.json()
        dispatch(loadRecipientPuzzles(recipientPuzzleArray))
    }
}

export const getPuzzleOne = (puzzleId) => async dispatch => {

    const response = await fetch(`/api/puzzles/${puzzleId}/`)

    if (response.ok) {
        const puzzle = await response.json()
        dispatch(loadOne(puzzle))
    }
}

export const createPuzzle = (newPuzzle) => async dispatch => {
    console.log('----------- --------newPuzzle', newPuzzle)
    const response = await fetch(`/api/puzzles/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPuzzle)
    })
    
    const puzzle = await response.json()
    if (response.ok) dispatch(addOnePuzzle(puzzle))
    console.log('----------STORE puzzle', puzzle)
    return puzzle
}

export const addImg = (formData, id) => async dispatch => {
    console.log('----------- --------formData', formData)
    const response = await fetch(`/api/puzzles/img/${id}/`, {
        method: 'POST',
        body: formData
    })
    const image = await response.json()
    // if (response.ok) dispatch(addOnePuzzle(puzzle))
    return image
}

export const deletePuzzle = (puzzleId) => async dispatch => {
    const response = await fetch(`/api/puzzles/${puzzleId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puzzleId)
    })

    if (response.ok) dispatch(deleteOnePuzzle(puzzleId))
}

export const editPuzzle = (puzzleToEdit) => async dispatch => {
    const response = await fetch(`/api/puzzles/${puzzleToEdit.id}/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puzzleToEdit)
    })
    const edittedPuzzle = await response.json()
    if (response.ok) dispatch(editOnePuzzle(edittedPuzzle))
    return edittedPuzzle
}


const initialState = {};

const puzzleReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD:{
            const puzzles = {}
            const puzzleArray = action.puzzleArray
            action.puzzleArray.forEach(puzzle => {
                puzzles[puzzle.id] = puzzle
            });
            return {
                ...state, puzzles, puzzleArray
            }}
        case LOAD_USER:{
            const userPuzzles = {}
            const userPuzzleArray = action.userPuzzleArray
            action.userPuzzleArray.forEach(puzzle => {
                userPuzzles[puzzle.id] = puzzle
            });
            return {
                ...state, userPuzzles, userPuzzleArray
            }}
        case LOAD_RECIPIENT:{
            const recipientPuzzles = {}
            const recipientPuzzleArray = action.recipientPuzzleArray
            action.recipientPuzzleArray.forEach(puzzle => {
                recipientPuzzles[puzzle.id] = puzzle
            });
            return {
                ...state, recipientPuzzles, recipientPuzzleArray
            }}
        case LOAD_ONE:{
            const puzzle = action.puzzle
            return {
                ...state, puzzle
            }}
        case ADD_ONE:{
            let newState = Object.assign({}, state);
            newState[action.puzzle.id] = action.puzzle;
            return newState;
        }
        case DELETE_ONE:{
            const deletePuzzleId = action.puzzleId;
            const puzzleArray = state.puzzleArray;
            const puzzles = state.puzzles;
            // delete puzzles[deletePuzzleId]
            // let index;
            // for (let i = 0; i < puzzleArray.length; i++) {
            //     const puzzle = puzzleArray[i];
            //     if (puzzle.id === deletePuzzleId) {
            //         index = i
            //     }
            // }
            // puzzleArray.splice(index, 1)
            const newState = {
                ...state, puzzles, puzzleArray
            }
            return newState
        }
        case EDIT_ONE: {
            let newState = Object.assign({}, state);
            newState[action.puzzle.id] = action.puzzle;
            return newState
        }

    }
}

export default puzzleReducer
