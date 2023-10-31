import { csrfFetch } from "./csrf";

// add comments
const ADD_COMMENTS = 'comments/ADD_COMMENTS';
// add one comment
const ADD_ONE_COMMENT = 'comments/ADD_ONE_COMMENT';
// edit a comment
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
// delete a comment
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

// reducer action: add array of comments
export function addComments(comments, photoId) {
    return {
        type: ADD_COMMENTS,
        comments,
        photoId
    }
}

// reducer action: add one comment
function addOneComment(comment, photoId) {
    return {
        type: ADD_ONE_COMMENT,
        comment,
        photoId
    }
}

// reducer action: remove a comment
function removeComment(commentId, photoId) {
    return {
        type: REMOVE_COMMENT,
        commentId,
        photoId
    }
}

// reducer action: edit a comment
function editComment(commentId, photoId, comment) {
    return {
        type: EDIT_COMMENT,
        commentId,
        photoId,
        comment
    }
}

// thunk action: update a comment
export function updateComment(commentId, data) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(editComment(res.comment.id, res.comment.photoId, res.comment));
        }
    }
}

// thunk action: upload a comment to a photo
export function uploadComment(data) {
    return async function(dispatch) {
        const {photoId} = data;
        const response = await csrfFetch(`/api/guildphotos/${photoId}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const res = await response.json();
            dispatch(addOneComment(res.comment, photoId));
            return;
        }
    }
}

// thunk action: delete a comment
export function deleteComment(commentId, photoId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(removeComment(commentId, photoId));
        }
    }
}


// The reducer
function reducer(state={}, action) {
    let newState = {};

    switch (action.type) {
        case ADD_COMMENTS:
            newState = {...state};
            newState[action.photoId] = action.comments;
            return newState;

        case ADD_ONE_COMMENT:
            newState = {...state};
            newState[action.photoId] = [...newState[action.photoId], action.comment]
            return newState;

        case EDIT_COMMENT:
            newState = {...state};
            newState[action.photoId] = state[action.photoId].map(c => {
                if (+c.id === +action.commentId) return action.comment;
                return c;
            });
            return newState;

        case REMOVE_COMMENT:
            newState = {...state};
            newState[action.photoId] = state[action.photoId].filter(c => {
                return c.id !== action.commentId;
            });
            return newState;

        default:
            return state;
    }
}

export default reducer;
