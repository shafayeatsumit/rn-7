import React, { Component } from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'


class ReduxNavigation extends Component {
  render() {
  	  const { dispatch, nav } = this.props
	  const navigation = ReactNavigation.addNavigationHelpers({
	    dispatch,
	    state: nav
	  })

    return (
      <AppNavigation navigation={navigation} />
    );
  }
}

const mapStateToProps = state => {
	return { nav: state.nav }
}
export default connect(mapStateToProps)(ReduxNavigation)