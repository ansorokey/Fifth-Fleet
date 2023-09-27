import { csrfFetch } from './csrf';

const GET_USER = 'profiles/GET_USER';

// reducer action: add selected user to state
function addProfile(user) {
    return {
        type: GET_USER,
        user
    }
}

// thunk action: get user by id
export function loadFullUser(userId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/users/${userId}`);

        if (response.ok) {
            const res = await response.json();
            dispatch(addProfile(res.user));
        }
    }
}

function reducer(state={}, action) {
    let newState = {};

    switch (action.type) {
        case GET_USER:
            newState = {...state};
            newState[action.user.id] = action.user;
            return newState;

        default:
            return state;
    }
}

export default reducer;
