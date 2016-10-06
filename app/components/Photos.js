import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';


import styles from '../styles/styles.js';


export default class Photos extends Component {
  constructor(props) {
    super(props);
  }

  getCamera() {
    Actions.camera();
  }

  getCameraRoll() {
    Actions.cameraroll();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Add your photos!
        </Text>
          <Button
            onPress={this.getCamera.bind(this)}
            buttonStyle={styles.buttonBlue}
            title='Take New Picture' />
          <Button
            onPress={this.getCameraRoll.bind(this)}
            buttonStyle={styles.buttonBlue}
            title='Get Photo From Library' />

        
      </View>
    );
  }
}
