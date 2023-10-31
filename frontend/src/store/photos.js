import { csrfFetch } from "./csrf";
import { addComments } from "./comments";

const ADD_PHOTOS = 'photos/ADD_PHOTOS';
const EDIT_PHOTO = 'photos/EDIT_PHOTO';

// reducer action: add latest photos
export function addPhotos(photos) {
    return {
        type: ADD_PHOTOS,
        photos
    }
}

// reducer action: edit a single photo
function editPhoto(photo) {
    return {
        type: EDIT_PHOTO,
        photo
    }
}

// thunk action: fetch a guild's photos
export function getGuildPhotos(guildId) {
    return async function(dispatch) {
        const response = await csrfFetch()
    }
}

// thunk action: fetch latest photos
export function getLatestPhotos() {
    return async function(dispatch) {
        const response = await csrfFetch('/api/guildphotos/all?limit=10');

        if (response.ok) {
            const res = await response.json();
            dispatch(addPhotos(res.photos));
            res.photos.forEach(p => {
                dispatch(addComments(p.Comments, p.id))
            })
            return;
        }
    }
}

// thunk action: update a photo
export function updatePhoto(photoId, data) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/guildphotos/photos/${photoId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(editPhoto(res.photo));
            // dispatch(addPhoto(res.photo.guildId, res.photo));
            // return res.photo;
        }
    }
}

// the reducer
//
function reducer(state={}, action) {
    let newState = {};

    switch (action.type) {
        case ADD_PHOTOS:
            newState = {};
            action.photos.forEach(p => {
                newState[p.id] = p;
            });
            return newState;

        case EDIT_PHOTO:
            newState = {...state};
            newState[action.photo.id] = action.photo;
            return newState;

        default:
            return state;
    }
}

export default reducer;
