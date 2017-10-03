import React, { Component } from 'react';
import { Text, 
		View ,
		TouchableWithoutFeedback
} from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {
	renderDescription () {
		const { library,libraryId } = this.props
		if (library.id === libraryId) {
			
			return <Text>{library.description}</Text>
		}
	}
	render() {
		console.log("this props",this.props)
		const { titleStyle } = styles;
		const { id,title } = this.props.library
		return(
			<TouchableWithoutFeedback
			 onPress = { () => this.props.selectLibrary(id)}
			>
				<View>
					<CardSection>
						<Text style={titleStyle}>
							{ title }
						</Text>
					</CardSection>
					{this.renderDescription()}
				</View>
			</TouchableWithoutFeedback>				
		)
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
}

mapStateToProps = state => {
	return {
		libraryId : state.selectedLibraryId
	}
}
export default connect(mapStateToProps, actions)(ListItem);