import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import guildsReducer from './guilds';
import lobbyReducer from './lobbies';
import utilsReducer from './utils'
import profileReducer from './profiles';
import photosReducer from './photos';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  session: sessionReducer,
  guilds: guildsReducer,
  lobbies: lobbyReducer,
  utils: utilsReducer,
  profiles: profileReducer,
  photos: photosReducer,
  comments: commentsReducer
});

// declare an enhancer that will have
//  different functionality based on development or production
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
