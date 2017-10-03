import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';

// reducers produce our application state
// a reducer runs and provide us with state

export default combineReducers({
  libraries: LibraryReducer,
  selectedLibraryId: SelectionReducer,
});

//console.log(store.getState())