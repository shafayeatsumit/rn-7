import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, listItems } from './items';


export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    listItems
});