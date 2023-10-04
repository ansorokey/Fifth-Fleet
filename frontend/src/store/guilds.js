import { csrfFetch } from "./csrf";

export const ADD_GUILDS = 'guilds/ADD_GUILDS';
export const SET_GUILD = 'guilds/SET_GUILD';
export const ADD_PHOTO = 'guilds/ADD_PHOTO';
export const EDIT_GUILD = 'guilds/EDIT_GUILD';
export const REMOVE_GUILD = 'guilds/REMOVE_GUILD';
export const ADD_COMMENT = 'guilds/POST_PHOTO_COMMENT';

// reducer action: add all guilds to state
export function addGuilds(guilds) {
    return {
        type: ADD_GUILDS,
        guilds
    }
};

// reducer action: add/update a single guild by id
export function setSingleGuild(guild) {
    return {
        type: SET_GUILD,
        guild
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

// reducer action: edit a guild
export function updateGuild(guild, guildId) {
    return {
        type: EDIT_GUILD,
        guild,
        guildId
    }
}

// reducer action: remove a guild from store
function removeGuild(guildId) {
    return {
        type: REMOVE_GUILD,
        guildId
    }
}

// thunk action: query for all guilds
export function loadGuilds(data={}) {
    const {greetingId, limit} = data;
    let url = '/api/guilds?';
    if(greetingId) url += 'greetingId=' + greetingId + '&&';
    if(limit) url += 'limit=' + limit + '&&';
    return async function(dispatch) {
        try{
            const response = await csrfFetch(url);

            if (response.ok) {
                const res = await response.json();
                dispatch(addGuilds(res.guilds));
            }
        } catch (e) {
            // catch error
        }
    }
}

// thunk action: fetch a single guild by id
export function loadGuild(guildId) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch(`/api/guilds/${guildId}`);

            if ( response.ok) {
                const res = await response.json();
                dispatch(setSingleGuild(res.guild));
            }
        } catch (e) {
            const res = await e;
            return res;
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

// thunk action: add a comment to a photo
export function uploadComment(data) {
    return async function(dispatch) {
        const {photoId} = data;
        const response = await csrfFetch(`/api/guildphotos/${photoId}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // just fetch the image and set it to guild i guess?
            // fetch all images for this guild and re-set them?
            const imageFetch = await csrfFetch(`/api/guildphotos/photos/${photoId}`);
            if (imageFetch.ok) {
                const res2 = await imageFetch.json();
                dispatch(addPhoto(res2.photo.guildId, res2.photo));
                return res2.photo;
            }
        }
    }
}

// thunk action: delete a comment for a photo
export function deleteComment(commentId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const res = await response.json();
            // console.log(res.photo.guildId);
            // console.log(res.photo);
            dispatch(addPhoto(res.photo.guildId, res.photo))
            return res.photo;
        }
    }
}

// thunk action: create a new guild
export function createGuild(data) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch('/api/guilds', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const res = await response.json();
                dispatch(setSingleGuild(res.guild));
                return res.guild.id;
            }
        } catch(e) {
            return e.json();
        }

    }
}

// thunk action: edit guild
export function editGuild(data, guildId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/guilds/${guildId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(updateGuild(res.guild, guildId));
        }
    }
}

// thunk action: delete a guild
export function deleteGuild(guildId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/guilds/${guildId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(removeGuild(guildId))
        }
    }
}

// thunk action: edit a photo
export function editPhoto(photoId, data) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/guildphotos/photos/${photoId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(addPhoto(res.photo.guildId, res.photo));
            return res.photo;
        }
    }
}

let initialState = {arr: [], guildPhotos: {}}
function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {

        case ADD_GUILDS:
            newState = {arr: [], guildPhotos: {}};
            action.guilds.forEach( g => {
                newState[+g.id] = g;
            });
            newState.arr = action.guilds;
            return newState;

        case EDIT_GUILD:
        case SET_GUILD:
            newState = {...state};
            newState[action.guild.id] = action.guild;
            newState.guildPhotos[action.guild.id] = action.guild.Photos;
            newState.arr.push(action.guild);
            return newState;

        case ADD_PHOTO:
            newState = {...state};
            // [...newState.guildPhotos[+action.guildId], action.image];
            let found = false;
            newState.guildPhotos[+action.guildId] = state.guildPhotos[+action.guildId].map( gp => {
                // add every photo but the current (updated one) to the array
                if (gp.id === action.image.id) {
                    found = true;
                    return action.image
                }

                return gp;
            });
            // now add the updated one at the end
            if (!found) newState.guildPhotos[+action.guildId].push(action.image);
            return newState;

        case ADD_COMMENT:
            newState = {...state};
            newState.guildPhotos[action.guildId] = []

        case REMOVE_GUILD:
            newState = {...state};
            delete newState[action.guildId];
            delete newState.guildPhotos[action.guildId];
            newState.arr = state.arr.filter(g => +g.id !== +action.guildId)
            return newState;

        default:
            return state;
    }
}

export default reducer;
