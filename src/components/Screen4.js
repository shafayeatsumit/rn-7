import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'



export default class Screen4 extends Component {
  render() {

    return (
      <View style={styles.container}>
        
        <Text
          style={styles.linky}
          onPress={() => this.props.navigation.goBack()} >
          Go to Screen3
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