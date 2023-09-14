import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// reducer action: set the current user
export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
};

// reducer action: remove the current user
export function removeUser() {
    return {
        type: REMOVE_USER
    }
}

// thunk action: log in user
export function logIn(data) {
    return async function (dispatch) {
        const { credential, password } = data;
        const response = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({ credential, password})
        });

        if (response.ok) {
            const res = await data.json();
            dispatch(setUser(data.user));
        }

        return response;
    }
}

// reducer
const sessionReducer = (state = {user: null}, action) => {
    switch (action.type) {
        case SET_USER:
            state = { user: action.payload };
            return state;

        case REMOVE_USER:
            state = { user: null }
            return state;

        default:
            return state;
    }
}

export default sessionReducer;
