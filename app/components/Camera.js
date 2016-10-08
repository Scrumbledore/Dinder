import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-redux-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-vector-icons/Ionicons';
import { RNS3 } from 'react-native-aws3';

import styles from '../styles/styles';
import config from '../../config';


export default class RNCamera extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      }
    }
    this.takePicture = this.takePicture.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  };

  takePicture() {
    const userId = this.props.userId;
    const timestamp = new Date().getTime().toString();
    this.camera.capture()
      .then((data) => {
        console.log(data);
        const file = {
          uri: data.path,
          name:  userId + '_' + timestamp + '.jpg',
          type: 'image/jpeg'
        };

        const options = {
          keyPrefix: config.S3_NAME_PREFIX,
          bucket: config.S3_BUCKET,
          region: config.S3_REGION,
          accessKey: config.S3_ACCESS_KEY,
          secretKey: config.S3_SECRET_KEY,
          successActionStatus: 201
        };

        RNS3.put(file, options)
          .then(response => {
            if (response.status !== 201) {
              throw new Error('Failed to upload image to S3', response);
             }
            //decide how to integrate into database
            //else {
            //   fetch('http://localhost:1337/api/userimages' {
            //     method: 'POST',
            //     headers: {
            //       'Accept': 'application/json',
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //       uri: file.uri,
            //       user: file.name,
            //     })
            //   }
            // }
            console.log('*** BODY ***', response.body);
          });
      })
      .catch(err => console.error(err));
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.camContainer}>
        <StatusBar animated hidden />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          captureAudio={false}
          defaultTouchtoFocus
          mirrorImage={false} />

        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}
            >
              <Image
                  source={require('../assets/ic_photo_camera_36pt.png')}
              />
            </TouchableOpacity>
          }

        </View>
          <View style={{flexDirection: 'row', top: 10}}>
            <TouchableOpacity style={styles.cameraNav} onPress = {Actions.Photos}>
              <Icon name='camera' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
            </TouchableOpacity>
             <TouchableOpacity style={styles.cameraNav} onPress = {Actions.Favorites}>
              <Icon name='star-border' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraNav} onPress = {Actions.Food}>
              <Icon name='local-pizza' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
            </TouchableOpacity>
               <TouchableOpacity style={styles.cameraNav} onPress = {Actions.Recs}>
              <Icon name='assistant' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
            </TouchableOpacity>
               <TouchableOpacity style={styles.cameraNav} onPress = {Actions.Menu}>
              <Icon name='menu' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}