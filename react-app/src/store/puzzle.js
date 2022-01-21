const LOAD = 'puzzles/LOAD';
const LOAD_ONE = 'puzzles/LOAD_ONE';
const ADD_ONE = 'puzzles/ADD_ONE';
const DELETE_ONE = 'puzzles/DELETE_ONE'
const EDIT_ONE = 'puzzles/EDIT_ONE'

const load = puzzleArray => ({
    type: LOAD,
    puzzleArray
})

const loadOne = puzzle => ({
    type: LOAD_ONE,
    puzzle
})

const addOnePuzzle = puzzle => ({
    type: ADD_ONE,
    puzzle
})

const deleteOnePuzzle = puzzle => ({
    type: DELETE_ONE,
    puzzle
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

export const getPuzzleOne = (puzzleId) => async dispatch => {

    const response = await fetch(`/api/puzzles/${puzzleId}`)

    if (response.ok) {
        const puzzle = await response.json()
        dispatch(loadOne(puzzle))
    }
}

// export const createServer = (newServer) => async dispatch => {
//     const response = await fetch(`/api/channels/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newServer)
//     })
//     const server = await response.json()
//     if (response.ok) dispatch(addOneServer(server))
//     return server
// }

// export const deleteServer = (serverToDelete) => async dispatch => {
//     const response = await fetch(`/api/channels/${serverToDelete.serverId}/`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(serverToDelete)
//     })

//     if (response.ok) dispatch(deleteOneServer(serverToDelete))
// }

// export const editServer = (serverToEdit) => async dispatch => {
//     const response = await fetch(`/api/channels/${serverToEdit.id}/`, {
//         method: "PUT",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(serverToEdit)
//     })
//     if (response.ok) dispatch(editOneServer(serverToEdit))
// }


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
        // case DELETE_ONE:{
        //     const deleteServer = action.server;
        //     const serversArray = state.serversArray;
        //     const servers = state.servers;
        //     delete servers[deleteServer.serverId]
        //     let index;
        //     for (let i = 0; i < serversArray.length; i++) {
        //         const server = serversArray[i];
        //         if (server.id === deleteServer.serverId) {
        //             index = i
        //         }
        //     }
        //     serversArray.splice(index, 1)
        //     const newState = {
        //         ...state, servers, serversArray
        //     }
        //     return newState
        // }
        // case EDIT_ONE: {
        //     let newState = Object.assign({}, state);
        //     newState[action.server.id] = action.server;
        //     return newState
        // }

    }
}

export default puzzleReducer
