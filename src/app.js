import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import ReduxNavigation from './Navigation/ReduxNavigation'


//declare app componenet
const store = createStore(appReducer);


const App = () => {
	return (
		<Provider store={store}>
			<ReduxNavigation />
		</Provider>
	)
}

export default App;