import React, { Component } from 'react';
import { Picker,  DatePickerIOS,Button, AppRegistry, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

import {
  Header,
  Title,
  Container,
  
  Left, 
  Right, 
  Body
} from 'native-base';

console.disableYellowBox = true;

export default class Page1 extends Component {
  constructor(){
    super();
    this.state = {
      visibleModal: null,
      date: new Date(),
      transport: 'none',
      startDate: null, //place holder for start Date
      endDate: null, //place holder for end Date
      startButtonName: "Start Date", // start button text
      endButtonName: "End Date", // end button text
      modalFor: null
    }
  }
  onValueChange = (value) => {
    this.setState({
        transport: value,
    });
  }
  onDateChange =(date)=> {
    this.setState({
      date: date
    });
  }
  onCloseCall = () => {
    console.log("hey",this.state)
    this.setState({ visibleModal: null })
    if(this.state.modalFor === "startDate"){
      let localTime = this.state.date.toLocaleString()
      this.setState({"startDate":this.state.date})
      this.setState({startButtonName:localTime})
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
          onDateChange={ (date) => this.onDateChange(date) }
          style={{ width: width -100}} />

      <TouchableOpacity style={{marginTop: 20}} onPress={this.onCloseCall}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );  
  render() {  
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
          
          <TouchableOpacity onPress={() => this.setState({ visibleModal: 1, modalFor:"startDate" })} style={[styles.button, styles.adjustCenter]}>
            <Text>{this.state.startButtonName}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({ visibleModal: 1, modalFor:"endDate" })} style={[styles.button, styles.adjustCenter]}>
            <Text>{this.state.endButtonName}</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.buttonSmall, styles.adjustCenter]}>
            <Text>{this.state.startButtonName}</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={[styles.buttonSmall, styles.adjustCenter]}>
            <Text>{this.state.startButtonName}</Text>
          </TouchableOpacity>

    <Button styles={styles.transparentButton}>
        <View style={styles.inline}>
            <Icon name="facebook-official" size={30} color="#3B5699" />
            <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text> 
            <Text style={styles.buttonBlueText}>with Facebook</Text>
        </View>
    </Button>          
          
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
    );
  }
}

const styles = StyleSheet.create({
  flexBox:{
    flex: 1
  },
  adjustCenter:{
    justifyContent: 'center',
    alignItems: 'center',    
  },
  adjustTop:{
    justifyContent: 'flex-start',
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
buttonSmall:{
    height: 40,
    width: width - 200,
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
    borderColor: '#3B5699',
    borderWidth: 2
},
buttonBlueText: {
    fontSize: 20,
    color: '#3B5699'
},
buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
},
inline: {
    flexDirection: 'row'
},  
});

