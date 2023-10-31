import { addComments } from "./comments";
import { csrfFetch } from "./csrf";
import { addPhotos } from "./photos";

export const ADD_GUILDS = 'guilds/ADD_GUILDS';
const ADD_MY_GUILDS = 'guilds/ADD_MY_GUILDS';
export const SET_GUILD = 'guilds/SET_GUILD';
export const ADD_PHOTO = 'guilds/ADD_PHOTO';
export const EDIT_GUILD = 'guilds/EDIT_GUILD';
export const REMOVE_GUILD = 'guilds/REMOVE_GUILD';
export const ADD_COMMENT = 'guilds/POST_PHOTO_COMMENT';
export const CLEAR_GUILDS = 'guilds/CLEAR_GUILDS';
const ADD_MEMBERSHIP = 'guilds/ADD_MEMBERSHIP';
const REMOVE_MEMBERSHIP = 'guilds/REMOVE_MEMBERSHIP';

// reducer action: add owned and joined guilds to state
function addMyGuilds(owned, joined) {
    return {
        type: ADD_MY_GUILDS,
        owned,
        joined
    }
}

// reducer action: remove a membership from a guild
function removeMembership(userId, guildId) {
    return {
        type: REMOVE_MEMBERSHIP,
        userId,
        guildId
    }
}

// reducer action: add a membership to the guild
function addMembership(user, guildId) {
    return {
        type: ADD_MEMBERSHIP,
        user,
        guildId
    }
}

// reducer action: clear the state
export function clearGuilds() {
    return {
        type: CLEAR_GUILDS
    }
}

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

// thunk action: delete a membership for a guild
export function deleteMembership(userId, guildId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/guildmembers/${guildId}/users/${userId}`, {
            method: 'delete'
        });

        if(response.ok) {
            dispatch(removeMembership(userId, guildId));
        }
    }
}

// thunk action: change a membership from pending to member
export function approveMembershipThunk(data) {
    return async function(dispatch) {
        const {userId, guildId} = data;
        const response = await csrfFetch(`/api/guildmembers/${guildId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if(response.ok) {
            const res = await response.json();
            dispatch(addMembership(res.user, guildId));
        }
    }
}

// thunk action: query for all guilds
export function loadMyGuilds(userId) {
    return async function(dispatch) {
        try{
            const response = await csrfFetch(`/api/guilds/users/${userId}`);

            if (response.ok) {
                const res = await response.json();
                dispatch(addMyGuilds(res.hostedGuilds, res.joinedGuilds));
            }
        } catch (e) {
            // catch error
        }
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
                dispatch(addPhotos(res.guild.Photos));
                res.guild.Photos.forEach(p => dispatch(addComments(p.Comments, p.id,)))
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

let initialState = {arr: [], owned: [], joined: []}
function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {

        case ADD_GUILDS:
            newState = {arr: []};
            action.guilds.forEach( g => {
                newState[+g.id] = g;
            });
            newState.arr = action.guilds;
            return newState;

        case ADD_MY_GUILDS:
            newState = {owned: [], joined: []}
            newState.owned = action.owned;
            newState.joined = action.joined;
        return newState;

        case EDIT_GUILD:
        case SET_GUILD:
            newState = {...state};
            newState[action.guild.id] = action.guild;
            if(newState.arr) newState.arr.push(action.guild);
            return newState;

        case REMOVE_GUILD:
            newState = {...state};
            delete newState[action.guildId];
            newState.arr = state.arr.filter(g => +g.id !== +action.guildId)
            return newState;

        case CLEAR_GUILDS:
            newState = {arr:[]};
            return newState;

        case ADD_MEMBERSHIP:
            newState = {arr:[]};
            newState.arr = [...state.arr];
            newState[action.guildId] = {...state[action.guildId]}
            newState[action.guildId].Members = state[action.guildId].Members.map(m => {
                if(+m.id === +action.user.id) return action.user;
                return m;
            });
            return newState;

        case REMOVE_MEMBERSHIP:
            newState = {arr:[]};
            newState.arr = [...state.arr];
            newState[action.guildId] = {...state[action.guildId]}
            newState[action.guildId].Members = state[action.guildId].Members.filter(m => {
                return +m.id !== +action.userId
            });
            return newState;

        default:
            return state;
    }
}

export default reducer;
