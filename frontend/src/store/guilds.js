import { csrfFetch } from "./csrf";

export const ADD_GUILDS = 'guilds/ADD_GUILDS';
export const SET_GUILD = 'guilds/SET_GUILD';
export const ADD_PHOTO = 'guilds/ADD_PHOTO';

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
export function addPhoto(guildId, image) {
    return {
        type: ADD_PHOTO,
        guildId: +guildId,
        image
    }
};

// thunk action: query for all guilds
export function loadGuilds() {
    return async function(dispatch) {
        try{
            const response = await csrfFetch('/api/guilds');

            if (response.ok) {
                const res = await response.json();
                dispatch(addGuilds(res.guilds));
            }
        } catch (e) {
            // catch error
        }
    }
}

// thunk action: query the latest guilds
export function latestGuilds() {
    return async function(dispatch) {
        try{
            const response = await csrfFetch('/api/guilds?order');

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
        const { guildId, image, caption } = data;
        const formData = new FormData();

        formData.append('guildId', guildId);
        formData.append('image', image);
        formData.append('caption', caption);
        const response = await csrfFetch(`/api/guilds/${data.guildId}/photos`, {
            method: 'POST',
            body: formData
        });

        if(response.ok){
            const res = await response.json();
            dispatch(addPhoto(guildId, res.image));
        }
    }
}

// thunk action: create a new guild
export function createGuild(data) {
    return async function(dispatch) {
        const response = await csrfFetch('/api/guilds', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(setSingleGuild(res.guild));
            return res.guild.id;
        }
    }
}

let initialState = {arr: [], guildPhotos: {}}
function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {

        case ADD_GUILDS:
            action.guilds.forEach( g => {
                newState[+g.id] = g;
            });
            newState.arr = action.guilds;
            return newState;

        case SET_GUILD:
            newState = {...state};
            newState[action.guild.id] = action.guild;
            newState.guildPhotos[action.guild.id] = action.guild.Photos;
            newState.arr.push(action.guild);
            return newState;

        case ADD_PHOTO:
            newState = {...state};
            newState.guildPhotos[+action.guildId] = [...newState.guildPhotos[+action.guildId], action.image];
            return newState;

        default:
            return state;
    }
}

export default reducer;
