import React, { Component } from 'react';
import { Picker,  DatePickerIOS, AppRegistry,AlertIOS, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import CustomButton from './Button';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Header,
  Title,
  Button,
  Left, 
  Right, 
  Body
} from 'native-base';
import { fetchHistoryData } from './api';
const {width, height} = Dimensions.get('window');

console.disableYellowBox = true;

export default class Page1 extends Component {
  constructor(){
    super();
    this.state = {
      visibleModal: null,
      date: new Date(),
      startDate: null, //place holder for start Date
      endDate: null, //place holder for end Date
      startButtonName: "Select Start Date", // start button text
      endButtonName: "Select End Date", // end button text
      modalFor: null,
      loading: false
    }
  }
  onDateChange =(date)=> {
    this.setState({
      date: date
    });
  }
  onCloseCall = () => {
    this.setState({ visibleModal: null })
    if(this.state.modalFor === "startDate"){
      this.setState({"startDate":this.state.date})
      let localTime = this.state.date.toLocaleString()
      this.setState({"startButtonName":localTime})
    }else if (this.state.modalFor === "endDate"){
      this.setState({"endDate":this.state.date})
      let localTime = this.state.date.toLocaleString()
      this.setState({endButtonName:localTime})
    }   
  }
  renderModalContent = () => (
    <View style={[styles.modalContent, styles.adjustCenter]}>
      <Text>Pick A Date {'\n\n'}</Text>
      <DatePickerIOS           
          date={ this.state.date }
          maximumDate = {new Date()}
          onDateChange={ (date) => this.onDateChange(date) }
          style={{ width: width -100}} />
    <View style={{flexDirection: "row"}}>
      <TouchableOpacity style={{marginTop: 20, flex:1, alignItems: "center"}} onPress={this.onCloseCall}>
        <Text>Set</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 20, flex:1, alignItems: "center"}} onPress={() => this.setState({ visibleModal: null })}>
        <Text>Close</Text>
      </TouchableOpacity>
      </View>      
    </View>
  ); 

  onSubmit = () => {
    let hours = Math.abs(this.state.endDate.getTime() - this.state.startDate.getTime()) / 3600000;
    console.log("submit date in hours",hours);
    if (this.state.endDate.getTime() < this.state.startDate.getTime()) {
        AlertIOS.alert("invalid time input")
        let date = new Date()
        this.setState({date: date})
        this.setState({startButtonName: "Select Start Date", endButtonName: "Select End Date"})
    }else if (hours>25) {
        AlertIOS.alert("Please select less than 24 hours")
        let date = new Date()
        this.setState({date: date})
        this.setState({startButtonName: "Select Start Date", endButtonName: "Select End Date"})
    }else{
        let historyData = null;    
        let historyDataUrl = "https://api.finder-lbs.com/v1/assets/"+"55ba04283141495cec6b1848"+"/history_data?";    
        let url = historyDataUrl+"from="+Math.floor(this.state.startDate.getTime()/1000)+"&to="+Math.floor(this.state.endDate.getTime()/1000)
        this.setState({loading: true})
        let response = fetchHistoryData(url)        
        response.then((response)=>{
          historyData = response
          this.setState({loading:false})
          // if no data show alert
          if (response.length === 0){
            let date = new Date()
            this.setState({date: date})
            this.setState({startButtonName: "Select Start Date", endButtonName: "Select End Date"})
            AlertIOS.alert("No Data Found")        
          }else {
            // data is available for the asset
            let filterDuplicate = historyData.filter(function(item, pos, arr){
              return pos === 0 || (item.loc.coordinates[0] !== arr[pos-1].loc.coordinates[0] && item.loc.coordinates[1] !== arr[pos-1].loc.coordinates[1]);
            });
            console.log("result ++",filterDuplicate.length);
            console.log("response length",response.length)
            this.props.clickEvent("page2",filterDuplicate)            
          }
        })

    }    
  } 
  render() {
    if (this.state.loading === false){
      return (
        <View style={[styles.flexBox, styles.backDrop]}>

          {/* Header */}
        <Header>
          <Left>
            <Button
              transparent
            >
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>  
              <Text style={{fontSize: 10,fontWeight: 'bold',color: 'red'}}>12345</Text>
          </Body>
          <Right/>
        </Header>  
      
          {/* Body */}
          <View style={[{flex: 0.9, backgroundColor: '#EEEEEE'}, styles.adjustCenter]}>
            
          <CustomButton 
              styles={{button: styles.transparentButton}}
              onPress={() => this.setState({ visibleModal: 1, modalFor:"startDate" })}
          >
              <View style={styles.inline}>
                  <Icon name="md-calendar" size={25} color="#282c37" />
                  <Text style={styles.buttonBlueText}>{this.state.startButtonName}</Text>
              </View>
          </CustomButton>


            
          <CustomButton 
              styles={{button: styles.transparentButton}}
              onPress={() => this.setState({ visibleModal: 1, modalFor:"endDate" })}
          >
              <View style={styles.inline}>
                  <Icon name="md-calendar" size={25} color="#282c37" />
                  <Text style={styles.buttonBlueText}>{this.state.endButtonName}</Text>
              </View>
          </CustomButton>

          <CustomButton 
              styles={{button: styles.submitButton}}
              onPress={() => this.onSubmit()}
          >
              <View style={styles.inline}>
                  <Text style={styles.buttonBlueText}>Submit</Text>
              </View>
          </CustomButton>
            {/* <Text>Body</Text> */}
            <Modal
            isVisible={this.state.visibleModal === 1}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
            {this.renderModalContent()}
          </Modal>
          </View>

        </View>
        ) 
      }else if(this.state.loading){
        return(
          <Loading/>
        )
    } 
  }
}

const Loading = () => {
  return (
    <View style={styles.adjustLoading}>
        <Text>Loading .......</Text>
    </View>    
  )
}

const styles = StyleSheet.create({
  flexBox:{
    flex: 1
  },
  adjustLoading:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',    
  },  
  adjustCenter:{
    justifyContent: 'center',
    alignItems: 'center',    
  },
  backDrop: {
    backgroundColor: '#F5FCFF',
  },
  button:{
    height: 40,
    width: width - 100,
    marginBottom: 20,
    backgroundColor: '#80DEEA',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },  
transparentButton: {
    marginTop: 30,
    width: width - 100,
    borderColor: '#282c37',
    borderWidth: 2
},
submitButton: {
    marginTop: 30,
    backgroundColor: '#34A853',
    borderColor: '#282c37',
    width: width - 100,
    borderWidth: 2
},
buttonBlueText: {
    fontSize: 20,
    color: '#282c37',
    marginLeft: 5,
},
inline: {
    flexDirection: 'row'
}  
});
