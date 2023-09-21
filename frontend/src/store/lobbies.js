import { csrfFetch } from "./csrf";

const ADD_LOBBIES = 'lobbies/ADD_LOBBIES';
const SET_LOBBY = 'lobbies/SET_LOBBY';

// reducer action: add all the lobbies
function addLobbies(lobbies) {
    return {
        type: ADD_LOBBIES,
        lobbies
    }
}

// reducer action: set a lobby to te store
function setLobby(lobby) {
    return {
        type: SET_LOBBY,
        lobby
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

// thunk action: create a lobby
export function createLobby(data) {
    return async function(dispatch) {
        const response = await csrfFetch('/api/lobbies', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(setLobby(res.lobby));
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
