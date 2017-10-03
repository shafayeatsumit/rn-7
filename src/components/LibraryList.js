import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native'

class LibararyList extends Component {
	render() {
		console.log("props",this.props)
		return(
			<View/>
		)
	}
}

const mapStateToProps = state => {
	return {
		libraries: state.libraries,
	}
}

export default connect(mapStateToProps)(LibararyList);