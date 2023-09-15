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

// thunk action: sign up user
export function signup(data) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const res = await response.json();
                dispatch(setUser(res));
            }
        } catch (e) {
            return e.json();
        }
    }
}

// thunk action: restore user
export function restoreUser() {
    return async function(dispatch) {
        // get the current user: a user or null
        const response = await csrfFetch('/api/session');

        const res = await response.json();

        dispatch(setUser(res));
    }
}

// thunk action: log in user
export function logIn(data) {
    return async function (dispatch) {
        const { credential, password } = data;
        try {
            const response = await csrfFetch('/api/session', {
                method: 'POST',
                body: JSON.stringify({ credential, password})
            });

            // no need to return a success
            if (response.ok) {
                const res = await response.json();
                dispatch(setUser(res.user));
            }
        } catch (e) {
            return e.json();
        }


    }
}

// reducer
const sessionReducer = (state = {user: null}, action) => {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload.user };

        case REMOVE_USER:
            return { user: null };

        default:
            return state;
    }
}

export default sessionReducer;
