import { csrfFetch } from './csrf';

const GET_USER = 'userProfile/GET_USER';

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
        const response = await csrfFetch();
    }
}
