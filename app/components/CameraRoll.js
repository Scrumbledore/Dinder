import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import styles from '../styles/styles';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class CameraRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
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

  render() {
    return (
      <View style={styles.CRcontainer}>
        <View style={styles.CRcontent}>
          <Text style={styles.CRtext}>
            <Text style={styles.CRbold}> {this.state.num} </Text> image(s) selected
          </Text>
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
      </View>
    );
  }
}