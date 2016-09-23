// import React, { Component, View, Text, StyleSheet } from 'react-native';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import Nav from './components/Nav';

var config = require('../config.js');

export default class Dinder extends Component {
  constructor(props) {
    super(props);

    var apiRoot = config.apiRoot;

    if (process.NODE_ENV !== 'production') {
      apiRoot = Platform.OS === 'android'
              ? config.androidLocalRoot
              : config.iosLocalRoot;
    }

    this.state = {
      apiRoot: apiRoot,
      showRegisterComponent: false,
      showLoginComponent:false,
      welcomeMessage: 'Loading...'
    };
  }

  getWelcomeMessage() {
    return fetch(`${this.state.apiRoot}:${config.port}/`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        welcomeMessage: data.message
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  componentDidMount() {
    this.getWelcomeMessage();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text style={styles.welcome}>
          {this.state.welcomeMessage}
        </Text>
        <Nav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
