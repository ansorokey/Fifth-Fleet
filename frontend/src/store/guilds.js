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
export function addPhoto(image) {
    return {
        type: ADD_PHOTO,
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
                console.log(res.guilds);
                // dispatch(addGuilds(res.guilds));
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
            const res = await e.json();
            return res;
            // console.log(res);
        }
    }
}

// thunk action: upload a photo
export function uploadPhoto(data) {
    return async function(dispatch) {
        const { guildId, image } = data;
        const formData = new FormData();
        formData.append('guildId', guildId);
        formData.append('image', image);
        const response = await csrfFetch(`/api/guilds/${data.guildId}/photos`, {
            method: 'POST',
            body: formData
        });

        if(response.ok){
            const res = await response.JSON();
            console.log()
        }
    }
}

function reducer(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case ADD_GUILDS:
            action.guilds.forEach( g => {
                newState[g.id] = g;
            });
            return newState;

        case SET_GUILD:
            newState = {...state};
            newState[action.guild.id] = action.guild;
            return newState;

        default:
            return state;
    }
}

export default reducer;
