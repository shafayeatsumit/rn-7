import {
  Header,
  Title,
  Button,
  Left, 
  Right, 
  Body,
  Icon
} from 'native-base';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//const data = require('./historyData.json');
const carIcon = require('../car.png');

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.006339428281933124;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

console.disableYellowBox = true;

const initCoordinates = {
  latitude: 24.133765,
  longitude: 90.198258,
  latitudeDelta: 5, 
  longitudeDelta: 5,
};



export default class Page2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeData: {},
      bearing: 0,
      region: new MapView.AnimatedRegion({
          latitude: initCoordinates.latitude,
          longitude: initCoordinates.longitude,
          latitudeDelta: initCoordinates.latitudeDelta,
          longitudeDelta: initCoordinates.longitudeDelta
      }),
      coordinates: new MapView.AnimatedRegion({
        latitude: 0.0 , 
        longitude: 0.0
      })    
    }
    this.indx = 0;

  }
  iterator = () => {
    let d = {}
    data = this.state.routeData[this.indx]
    coord = data.loc.coordinates
    d = {
      latitude: coord[1],
      longitude: coord[0],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    console.log("data ==>",coord)
    this.indx += 1;
    if(this.indx<this.state.routeData.length) {
      let { region } = this.state;
      region.timing({
        latitude: coord[1],
        longitude: coord[0],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA

      },50).start() ;
      console.log("coordinates ++",this.state.coordinates)
      console.log("coordinates ++",coord)
      let { coordinates } = this.state;
      coordinates.timing({
        latitude: coord[1],
        longitude: coord[0]
      },500).start()   
      this.setState({bearing:data.bearing})

      setTimeout(this.iterator, 400);
      

      //this.setState({region: d, bearing:data.bearing})
    }

//    setTimeout(() => this.setState({region:data}),3000)

  }
//23.7722569,90.3551191
componentWillMount = () => {
   this.setState({routeData:this.props.routeData})
}
  componentDidMount = () => {       
   
    setTimeout(this.iterator,100)
  }
  render() {
    console.log("region =>",this.state.region)
    return (
      <View style={{ flex: 1 }}>
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

                        <Image
                    style={{
             zIndex: 3,
              position: 'absolute',
              marginTop: -43,
              marginLeft: -14,
              left: '50%',
              top: '50%',                      
                    width: 35,
                    height: 35,
                    transform: [
                        { rotate: `${this.state.bearing}deg` }
                    ]
                    }}
                    source={carIcon}
                  />
          <MapView.Animated
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            ref={ref => { this.map = ref; }}
            //initialRegion={initCoordinates}
            region = {this.state.region}
            >

            </MapView.Animated>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
});
