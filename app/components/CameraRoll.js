import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import styles from '../styles/styles';

import CameraRollPicker from 'react-native-camera-roll-picker';
import { Button } from 'react-native-elements';

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

        <Button
          onPress={this.renderSuccessMessage.bind(this)}
          buttonStyle={styles.buttonBlue}
          title='Upload My Picture' />
        <Text style={styles.CRtext}>{this.state.uploadSuccess}</Text>

        {this.props.nav()}

      </View>
    );
  }
}