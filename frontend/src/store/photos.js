import { csrfFetch } from "./csrf";
import { addComments } from "./comments";

const ADD_PHOTO = 'guilds/ADD_PHOTO';
const ADD_PHOTOS = 'photos/ADD_PHOTOS';
const EDIT_PHOTO = 'photos/EDIT_PHOTO';
const REMOVE_PHOTO = 'photos/REMOVE_PHOTO';

// reducer action: remove a photo
function removePhoto(photoId) {
    return {
        type: REMOVE_PHOTO,
        photoId
    }
}

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

// reducer action: add a new photo to the guild's photos
// used for: Uploading an image, adding comment to an image
export function addPhoto(guildId, image) {
    return {
        type: ADD_PHOTO,
        guildId: +guildId,
        image
    }
};

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

// thunk action: upload a photo
export function uploadPhoto(data) {
    return async function(dispatch) {
        const { guildId, image, caption, imageType } = data;
        const formData = new FormData();

        formData.append('guildId', guildId);
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('imageType', imageType)
        const response = await csrfFetch(`/api/guilds/${data.guildId}/photos`, {
            method: 'POST',
            body: formData
        });

        if(response.ok){
            const res = await response.json();
            dispatch(addPhoto(guildId, res.image));

            if(imageType) {
                return {message: 'success', imageUrl: res.image.imageUrl}
            }
        }
    }
}

// thunk action: delete a photo
export function deletePhoto(photoId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/guildphotos/photos/${photoId}`, {
            method: 'DELETE'
        });

        if(response.ok) {
            const res = await response.json();

            dispatch(removePhoto(photoId))
        }
    }
}

// the reducer
function reducer(state={}, action) {
    let newState = {};

    switch (action.type) {

        case ADD_PHOTO:
            newState = {...state};
            newState[action.image.id] = action.image;
            return newState;

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

        case REMOVE_PHOTO:
            for(let p in state) {
                if(+p !== +action.photoId) newState[p] = state[p];
            }
            return newState;

        default:
            return state;
    }
}

export default reducer;
