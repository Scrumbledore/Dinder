import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import styles from '../styles/styles';
import {Actions} from 'react-native-redux-router';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class CameraRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      uploadSuccess: ''
    };
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    console.log(current);
    console.log(this.state.selected);
  }

  renderSuccessMessage() {

    this.setState({
      uploadSuccess: 'Upload Successful!'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.CRcontent}>
          <Button
            onPress={this.renderSuccessMessage.bind(this)}
            buttonStyle={styles.buttonBlue}
            title='Upload My Picture' />
          <Text style={styles.CRtext}>{this.state.uploadSuccess}</Text>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={true}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={5}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
        <View style={{flexDirection: 'row', top: -10}}>
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