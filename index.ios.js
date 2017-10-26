import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import Page1 from './src/Page1';
import Page2 from './src/Page2';

console.disableYellowBox = true;

export default class finderios_redux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:"page1"
    }
  }
  onClick = (value) => {
    this.setState({page:value})
  }
  render() {
    if (this.state.page === "page1"){
      return (
        <Page1 clickEvent={this.onClick}/>
      )
    }else {
      return <Page2 clickEvent={this.onClick}/>
    }

  }
}



AppRegistry.registerComponent('finderios_redux', () => finderios_redux);
