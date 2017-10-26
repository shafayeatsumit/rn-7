import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button } from 'native-base';

console.disableYellowBox = true;

export default class Page2 extends Component {
  render() {
    return (
      <Container>
        <Button onPress={() => this.props.clickEvent("page1") }>
          <Text>
            Page2 Button
          </Text>
        </Button>
      </Container>    	
    );
  }
}