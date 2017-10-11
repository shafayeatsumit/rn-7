import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: "sumit"
    }
  }
  render() {
    console.log("props in login screen",this.props.navigation)
    return (
      <View style={styles.container}>
        <Text>I am Login Screen</Text>

        <Text
          style={styles.linky}
          onPress={() => this.props.navigation.navigate('signupScreen',this.state)} >
          Go to Signup
        </Text>

        <Text
          style={styles.linky}
          onPress={() => this.props.navigation.navigate('drawerStack')} >
          Go to Forgot Password
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
  linky: {
    color: 'blue',
    paddingTop: 10
  }
})