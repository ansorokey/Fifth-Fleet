import { csrfFetch } from './csrf';

const GET_USER = 'profiles/GET_USER';
const GET_PICS = 'profiles/GET_PICS';
const CHANGE_AVATAR = 'profiles/CHANGE_AVATAR';

// reducer action: add selected user to state
function addProfile(user) {
    return {
        type: GET_USER,
        user
    }
}

// reducer action: add photos uploaded by user
function addPics(pics) {
    return {
        type: GET_PICS,
        pics
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

// thunk action: fetch all photos by userId
export function loadMyPics(userId) {
    return async function (dispatch) {
        const response = await csrfFetch(`/api/users/${userId}/photos`);

        if (response.ok) {
            const res = await response.json();
            dispatch(addPics(res.photos));
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
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const res = await response.json();
            console.log(res);
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

        case GET_PICS:
            newState = {...state};
            newState[action.pics[0].userId].pics = {};
            action.pics.forEach(p => {
                newState[p.userId].pics[p.id] = p;
            });
            return newState;

        default:
            return state;
    }
}

export default reducer;
