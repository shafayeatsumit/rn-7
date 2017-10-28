import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import Page1 from './src/Page1';
import Page2 from './src/Page2';

console.disableYellowBox = true;

export default class finderios_redux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:"page1",
      routeData : null
    }
  }
  onClick = (value,data) => {
    if(value==="page2"){
      this.setState({page:value,routeData:data})      
    }else if (value==="page2"){
      this.setState({page:value})
      console.log("data ==>",data)      
    }
  }
  render() {
    if (this.state.page === "page1"){
      return (
        <Page1 clickEvent={this.onClick}/>
      )
    }else {
      return <Page2 clickEvent={this.onClick} routeData={this.state.routeData} />
    }

  }
}



AppRegistry.registerComponent('finderios_redux', () => finderios_redux);
