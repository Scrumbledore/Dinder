import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs, Tab, Icon, Button } from 'react-native-elements';

import styles from '../styles/styles.js';

export default class Recs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: undefined
    };
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.welcome}>
  //         Welcome to the Recs Page!
  //       </Text>
  //     </View>
  //   );
  // }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var initialPosition = position;
      this.setState({initialPosition: initialPosition});
      // alert(JSON.stringify(this.state.initialPosition))
      // console.log("coords", this.state.initialPosition.coords)
      // console.log("posit", this.state.initialPosition)
    },
    (error) => alert('Please enable location services.'),
    {enableHighAccurracy: true, timeout: 20000, maxinumAge: 1000}
    );
  }

  render() {  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Recs page</Text>
        <Text style={styles.welcome}>Long: {this.state.initialPosition ? this.state.initialPosition.coords.longitude : 'Please enable location services'}</Text>
        <Text style={styles.welcome}>Lat: {this.state.initialPosition ? this.state.initialPosition.coords.latitude : 'Please enable location services'}</Text>
      </View>
    );
  }
}