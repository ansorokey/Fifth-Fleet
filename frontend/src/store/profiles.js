import { addComments } from './comments';
import { csrfFetch } from './csrf';
import { addPhotos } from './photos';

const GET_USER = 'profiles/GET_USER';
const CHANGE_AVATAR = 'profiles/CHANGE_AVATAR';
const EDIT_USER = 'profiles/EDIT_USER';

// reducer action: change avatar
function changeAvatar(user){
    return {
        type: CHANGE_AVATAR,
        user
    }
}

// reducer action: add selected user to state
function addProfile(user) {
    return {
        type: GET_USER,
        user
    }
}

// thunk action: get user by id
export function loadUser(userId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/users/${userId}`);

        if (response.ok) {
            const res = await response.json();
            dispatch(addProfile(res.user));
        }
    }
}

// thunk action: fetch all photos by userId
export function loadUserPhotos(userId) {
    return async function (dispatch) {
        const response = await csrfFetch(`/api/users/${userId}/photos`);

        if (response.ok) {
            const res = await response.json();
            dispatch(addPhotos(res.photos));
            res.photos.forEach((p) => dispatch(addComments(p.Comments, p.id)));
        }
    }
}

// thunk action: change Avatar
export function uploadAvatar(data) {
    return async function (dispatch) {
        const {image, userId} = data;

        const formData = new FormData();
        formData.append('image', image);

        const response = await csrfFetch(`/api/users/${userId}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            const res = await response.json();
            console.log(res.user)
            dispatch(changeAvatar(res.user))
        }
    }

}

// thunk action: edit user
export function editUser(data, userId) {
    return async function(dispatch) {
        const response = await csrfFetch(`api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

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
            newState = action.user;
            return newState;

        case CHANGE_AVATAR:
            newState = {...state}
            newState.avatarUrl = action.user.avatarUrl;
            return newState;

        default:
            return state;
    }
}

export default reducer;
