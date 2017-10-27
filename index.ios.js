import React, { Component } from 'react';
import { View, TouchableOpacity,Text, AppRegistry, AppState } from 'react-native';
import Page1 from './src/Page1';
import Page2 from './src/Page2';
import RNGooglePlaces from 'react-native-google-places';
import BackgroundTask from 'react-native-background-task'

console.disableYellowBox = true;

BackgroundTask.define(() => {
  console.log('Hello from a background task')
    RNGooglePlaces.getCurrentPlace()
      .then((results) => console.log("from background",results[0]["address"]))
      .catch((error) => console.log(error.message));  

  BackgroundTask.finish()
}) 

export default class finderios_redux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      appState: AppState.currentState

    };  
  }



  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }
 
  fetchLikelihoodData = () => {
    RNGooglePlaces.getCurrentPlace()
      .then((results) => console.log(results[0]["address"]))
      .catch((error) => console.log(error.message));  
  }
  componentWillMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentDidMount = () =>{
    setInterval(this.fetchLikelihoodData,3000) 
    AppState.addEventListener('change', this._handleAppStateChange);
        BackgroundTask.schedule()


  }
  render() {
    return(
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Current state is: {this.state.appState}</Text>
      </View>    
    )
  }
}



AppRegistry.registerComponent('finderios_redux', () => finderios_redux);
