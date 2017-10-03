import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';

// reducers produce our application state
// a reducer runs and provide us with state

export default combineReducers({
  libraries: LibraryReducer
});

//console.log(store.getState())