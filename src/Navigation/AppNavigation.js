import { StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from '../components/LoginScreen'
import React from 'react'
import { Text } from 'react-native'

import ForgottenPasswordScreen from '../components/ForgottenPasswordScreen'
import Screen1 from '../components/Screen1'
import Screen2 from '../components/Screen2'
import Screen3 from '../components/Screen3'
import Screen4 from '../components/Screen4'
import SignupScreen from '../components/SignupScreen'
import SideBar from '../components/SideBar'

// Manifest of possible screens
const DrawerStack = DrawerNavigator({
  screen1: { screen: Screen1 },
  screen3: { screen: Screen3 },
  screen2: { screen: Screen2 }
},
  {
    contentComponent: props => <SideBar {...props} />
  }  
)


const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
},{
  headerMode: 'none',
})

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  screen4: { screen: Screen4 },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
},{
  headerMode: 'none',
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  drawerStack: { screen: DrawerNavigation },
  loginStack: { screen: LoginStack },
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
})



export default PrimaryNav