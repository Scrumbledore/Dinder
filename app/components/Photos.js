import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-redux-router';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';


import styles from '../styles/styles.js';


export default class Photos extends Component {
  constructor(props) {
    super(props);
  }

  getCamera() {
    Actions.Camera;
  }

  getCameraRoll() {
    Actions.Cameraroll;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Add your photos!
        </Text>
        <Button
          onPress={Actions.Camera}
          buttonStyle={styles.buttonBlue}
          title='Take New Picture' />
        <Button
          onPress={Actions.CameraRoll}
          buttonStyle={styles.buttonBlue}
          title='Get Photo From Library' />
        <View style={{flexDirection: 'row', top: 190}}>
          <TouchableOpacity style={styles.foodNav} onPress = {Actions.Photos}>
            <Icon name='camera' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
           <TouchableOpacity style={styles.foodNav} onPress = {Actions.Favorites}>
            <Icon name='star-border' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodNav} onPress = {Actions.Food}>
            <Icon name='local-pizza' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
             <TouchableOpacity style={styles.foodNav} onPress = {Actions.Recs}>
            <Icon name='assistant' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
             <TouchableOpacity style={styles.foodNav} onPress = {Actions.Menu}>
            <Icon name='menu' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
