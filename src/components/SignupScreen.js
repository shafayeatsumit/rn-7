import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'


export default class SignupScreen extends Component {
  render() {

    return (
      <View style={styles.container}>
        
        <Text
          style={styles.linky}
          onPress={() => this.props.navigation.navigate('screen4')} >
          I am Screen3
          Go to previous
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})