const LOAD_USER = 'swaps/LOAD_USER';
const LOAD_RECIPIENT = 'swaps/LOAD_RECIPIENT';
const LOAD_ONE = 'swaps/LOAD_ONE';
const ADD_ONE = 'swaps/ADD_ONE';
const DELETE_ONE = 'swaps/DELETE_ONE'
const EDIT_ONE = 'swaps/EDIT_ONE'

const loadUser = swapArray => ({
    type: LOAD_USER,
    swapArray
})

const loadRecipient = swapArray => ({
    type: LOAD_RECIPIENT,
    swapArray
})

const loadOne = swap => ({
    type: LOAD_ONE,
    swap
})

const addOneswap = swap => ({
    type: ADD_ONE,
    swap
})

const deleteOneswap = swapId => ({
    type: DELETE_ONE,
    swapId
})

const editOneswap = swap => ({
    type: EDIT_ONE,
    swap
})

// export const getSwaps = () => async dispatch => {

//     const response = await fetch(`/api/swaps/`)

//     if (response.ok) {
//         const swapArray = await response.json()
//         dispatch(load(swapArray))
//     }
// }

export const getSwapOne = (swapId) => async dispatch => {

    const response = await fetch(`/api/swaps/${swapId}/`)

    if (response.ok) {
        const swap = await response.json()
        dispatch(loadOne(swap))
    }
}

export const getUserSwaps = (userId) => async dispatch => {

    const response = await fetch(`/api/swaps/users/${userId}/`)



    if (response.ok) {
        const swaps = await response.json()
            console.log('---------user swaps res from backend', swaps)

        if (swaps === "None") return "None"
        dispatch(loadUser(swaps))
    }
}

export const getRecipientSwaps = (userId) => async dispatch => {


    const response = await fetch(`/api/swaps/recipients/${userId}/`)

    if (response.ok) {
        const swaps = await response.json()
        if (swaps === "None") return "None"
        dispatch(loadRecipient(swaps))
    }
}

export const createSwap = (newSwap) => async dispatch => {
    const response = await fetch(`/api/swaps/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSwap)
    })
    const swap = await response.json()
    console.log('- - - - - - store response from backend', swap)
    if (response.ok) dispatch(addOneswap(swap))
    return swap
}

export const deleteSwap = (swapId) => async dispatch => {
    const response = await fetch(`/api/swaps/${swapId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swapId)
    })

    if (response.ok) dispatch(deleteOneswap(swapId))
}

export const editSwap = (swapToEdit) => async dispatch => {
    const response = await fetch(`/api/swaps/${swapToEdit.id}/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swapToEdit)
    })
    const edittedSwap = await response.json()
    if (response.ok) dispatch(editOneswap(edittedSwap))
    return edittedSwap
}


const initialState = {};

const swapReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD_USER:{
            const userSwaps = {}
            const userSwapArray = action.swapArray
            action.swapArray.forEach(swap => {
                userSwaps[swap.id] = swap
            });
            return {
                ...state, userSwaps, userSwapArray
            }}
        case LOAD_RECIPIENT: {
            console.log('_____LOAD_RECIPIENT')
            const recipientSwaps = {}
            const recipientSwapArray = action.swapArray
            action.swapArray.forEach(swap => {
                recipientSwaps[swap.id] = swap
            });
            return {
                ...state, recipientSwaps, recipientSwapArray
            }}
        case LOAD_ONE:{
            const swap = action.swap
            return {
                ...state, swap
            }}
        case ADD_ONE:{
            let newState = Object.assign({}, state);
            newState[action.swap.id] = action.swap;
            return newState;
        }
        case DELETE_ONE:{
            const deleteswapId = action.swapId;
            const swapArray = state.swapArray;
            const swaps = state.swaps;
            delete swaps[deleteswapId]
            let index;
            for (let i = 0; i < swapArray.length; i++) {
                const swap = swapArray[i];
                if (swap.id === deleteswapId) {
                    index = i
                }
            }
            swapArray.splice(index, 1)
            const newState = {
                ...state, swaps, swapArray
            }
            return newState
        }
        case EDIT_ONE: {
            let newState = Object.assign({}, state);
            newState[action.swap.id] = action.swap;
            return newState
        }

    }
}

export default swapReducer
