import { csrfFetch } from "./csrf";

const ADD_LOBBIES = 'lobbies/ADD_LOBBIES';

// reducer action: add all the lobbies
function addLobbies(lobbies) {
    return {
        type: ADD_LOBBIES,
        lobbies
    }
}

// thunk action: fetch all the lobbies
export function loadLobbies() {
    return async function(dispatch) {
        const response = await csrfFetch('/api/lobbies');

        if (response.ok) {
            const res = await response.json();
            dispatch(addLobbies(res.lobbies));
        }
    }
}

// reducer
function reducer(state= {}, action) {
    let newState = {};
    switch(action.type) {

        case ADD_LOBBIES:
            action.lobbies.forEach(l => {
                newState[l.id] = l;
            });
            return newState;

        default:
            return state;
    }
}

export default reducer;
