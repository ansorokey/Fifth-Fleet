import { csrfFetch } from "./csrf";

const ADD_LOBBIES = 'lobbies/ADD_LOBBIES';
const SET_LOBBY = 'lobbies/SET_LOBBY';
const REMOVE_LOBBY = 'lobbies/REMOVE_LOBBY';

// reducer action: add all the lobbies
function addLobbies(lobbies) {
    return {
        type: ADD_LOBBIES,
        lobbies
    }
}

// reducer action: set a lobby to the store
function setLobby(lobby) {
    return {
        type: SET_LOBBY,
        lobby
    }
}

// reducr action: delete a lobby
function removeLobby(lobbyId) {
    return {
        type: REMOVE_LOBBY,
        lobbyId
    }
}

// thunk action: fetch all the lobbies
export function loadLobbies(queryParams = {}) {
    const {name, questType, greeting, limit} = queryParams;
    return async function(dispatch) {
        let url = '/api/lobbies?';

        if(name) url += `name=${name}&&`;
        if(questType) url += `questType=${questType}&&`;
        if(greeting) url += `greeting=${greeting}&&`;
        if(limit) url += `limit=${limit}&&`;

        const response = await csrfFetch(url);

        if (response.ok) {
            const res = await response.json();
            dispatch(addLobbies(res.lobbies));
        }
    }
}

// thunk action: fetch a single lobby
export function loadLobby(lobbyId) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch(`/api/lobbies/${lobbyId}`);

            if(response.ok) {
                const res = await response.json();
                dispatch(setLobby(res.lobby));
            }

        } catch (e) {
            const res = await e.json();
            return res;
        }
    }
}

// thunk action: create a lobby
export function createLobby(data) {
    return async function() {
        try {
            const response = await csrfFetch('/api/lobbies', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const res = await response.json();
                return res.lobby;
            }
        } catch (e) {
            return e;
        }
    }
}

// thunk action: edit a lobby
export function editLobby(data, lobbyId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/lobbies/${lobbyId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(setLobby(res.lobby));
            return res.lobby;
        }
    }
}

// think action: delete a lobby
export function deleteLobby(lobbyId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/lobbies/${lobbyId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(removeLobby(lobbyId));
        }
    }
}

// reducer
function reducer(state = {arr: []}, action) {
    let newState = {arr: []};
    switch(action.type) {

        case ADD_LOBBIES:
            action.lobbies.forEach(l => {
                newState[l.id] = l;
            });
            newState.arr = action.lobbies;
            return newState;

        case SET_LOBBY:
            newState = {...state};
            newState[action.lobby.id] = action.lobby;
            return newState;

        case REMOVE_LOBBY:
            for (let l in state ) {
                if ( +l !== +action.lobbyId && l !== 'arr') newState[l] = state[l];
            };

            state.arr.forEach(l => {
                if (+l.id !== +action.lobbyId) newState.arr.push(l);
            });

            return newState;

        default:
            return state;
    }
}

export default reducer;
