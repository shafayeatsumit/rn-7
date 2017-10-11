import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import AppNavigation from '../Navigation/AppNavigation'

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}



const appReducer = combineReducers({
  nav: navReducer
})

export default appReducer;