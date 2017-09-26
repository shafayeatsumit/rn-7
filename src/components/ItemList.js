import { Text, View, ListView } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { itemsFetchData, listItemsFormatted } from '../actions/items';
import { connect } from 'react-redux';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ItemList extends Component {
  constructor (props){
    super(props)
    this.state = {
      data : [],
      loading: true
    }
  }
  componentDidMount() {
      this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
  }
  componentWillReceiveProps(newProps){
    if (newProps.items.length > 0){
      let dataSource = ds.cloneWithRows(newProps.items)
      this.setState({data: dataSource, loading:false })
    }  
  }	
  render() {
    console.log("this state",this.state.data)
    if(this.state.loading){
      return (
        <View/>
      )
    }else {
      return (
      <ListView
        dataSource={this.state.data}
        renderRow={(data) => <View><Text>{data.label}</Text></View>}
      />
      )
    }
  }
}
ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        listItems: state.listItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);