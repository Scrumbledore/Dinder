import React, { Component } from 'react';
import {
  AsyncStorage,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Actions,
  Router,
  Scene
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/styles.js';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Food from './components/Food';
import Favorites from './components/Favorites';
import Recs from './components/Recs';
import Menu from './components/Menu';
import RNCamera from './components/Camera';
import Photos from './components/Photos';
import CameraRoll from './components/CameraRoll';

const config = require('../config.js');

export default class DinDin extends Component {
  constructor(props) {
    super(props);

    var apiRoot = config.apiRoot;

    // for testing locally with npm run server
    if (process.env.NODE_ENV !== 'production') {
      apiRoot = Platform.OS === 'android'
              ? config.androidLocalRoot
              : config.iosLocalRoot;
    }
    apiRoot += ':'
            + config.port;

    this.state = {
      apiRoot: apiRoot
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('jwt')
    .then((value) => {
      if (value) {
        Actions.food();
      }
    }).done();
  }

  renderNav() {
    let color = 'hsl(215.5,23.4%,62%)';
    let size = 30;
    let navIcon = {
      textAlign: 'center',
    };
    let navBar = {
      flexDirection: 'row',
      backgroundColor: 'hsl(215.5,23.4%,36.9%)',
      alignSelf: 'stretch',
      width: null,
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderTopWidth: 2,
      borderColor: 'hsl(215.5,23.4%,26.9%)',
      borderStyle: 'solid'
    };
    return (
      <View style={navBar}>
        <TouchableOpacity onPress={Actions.photos}>
          <Icon name='camera' style={navIcon} color={color} size={size} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.favorites}>
          <Icon name='star' style={navIcon} color={color} size={size} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.food}>
          <Icon name='cutlery' style={navIcon} color={color} size={size} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.recs}>
          <Icon name='search' style={navIcon} color={color} size={size} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.menu}>
          <Icon name='bars' style={navIcon} color={color} size={size} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <Router hideNavBar={true} nav={this.renderNav} apiRoot={this.state.apiRoot} >
        <Scene key='root' >
          <Scene key='signin' type='replace' component={SignIn} initial={true} />
          <Scene key='signup' type='replace' component={SignUp} />
          <Scene key='photos' type='replace' component={Photos} />
          <Scene key='camera' type='replace' component={RNCamera} />
          <Scene key='cameraroll' type='replace' component={CameraRoll} />
          <Scene key='favorites' type='replace' component={Favorites} />
          <Scene key='food' type='replace' component={Food} />
          <Scene key='recs' type='replace' component={Recs} />
          <Scene key='menu' type='replace' component={Menu} />
        </Scene>
      </Router>
    );
  }
}