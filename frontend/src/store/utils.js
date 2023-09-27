import { csrfFetch } from "./csrf";

const ADD_MONSTERS = 'utils/ADD_MONSTERS';
const ADD_GREETINGS = 'utils/ADD_GREETINGS';
const ADD_QUESTTYPES = 'utils/ADD_QUESTTYPES';

// reducer adction: add monsters to state
function addMonsters(monsters) {
    return {
        type: ADD_MONSTERS,
        monsters
    }
}

// reducer action: add greetings
function addGreetings(greetings) {
    return {
        type: ADD_GREETINGS,
        greetings
    }
}

// reducer action: add quest types
function addQuestTypes(questTypes) {
    return {
        type: ADD_QUESTTYPES,
        questTypes
    }
}

// thunk action: get all monsters, names, and ids
export function loadMonsters() {
    return async function(dispatch){
        const response = await csrfFetch('/api/monsters');

        if (response.ok) {
            const res = await response.json();
            dispatch(addMonsters(res.monsters));
        }
    }
}

// thunk action: get all grettings
export function loadGreetings() {
    return async function(dispatch) {
        const response = await csrfFetch('/api/greetings');
        if (response.ok) {
            const res = await response.json();
            dispatch(addGreetings(res.greetings));
        }
    }
}

// thunk action: get all quest types
export function loadQuestTypes() {
    return async function(dispatch) {
        const response = await csrfFetch('/api/questTypes');

        if (response.ok) {
            const res = await response.json();
            dispatch(addQuestTypes(res.questTypes));
        }
    }
}

// reducer
const initialState = {monsters: {}, greetings: {}, questTypes: {}};
const reducer = function(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case ADD_MONSTERS:
            newState = {...state};
            action.monsters.forEach(m => {
                newState.monsters[m.id] = m;
            });
            return newState;

        case ADD_GREETINGS:
            newState = {...state};
            action.greetings.forEach(g => {
                newState.greetings[g.id] = g;
            });
            return newState;

        case ADD_QUESTTYPES:
            newState = {...state};
            action.questTypes.forEach(q => {
                newState.questTypes[q.id] = q;
            });
            return newState;

        default:
            return state;
    }
}

export default reducer;
