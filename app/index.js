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
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onRegisterClick() {
    this.setState({
      showRegisterComponent: !this.state.showRegisterComponent
    });
  }

  onLoginClick() {
    this.setState({
      showLoginComponent: !this.state.showLoginComponent
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.welcomeMessage}
        </Text>
        <Button onPress={(e) => {this.onRegisterClick()} }
                containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
                style={{fontSize: 20, color: 'white'}}>
           Register
        </Button>
        {this.state.showRegisterComponent ?
           <Text style={styles.instructions}>
            It works insert Register component here!
           </Text> : null
        }
        <Button onPress={(e) => {this.onLoginClick()}}
                containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
                style={{fontSize: 20, color: 'white'}}>
          Log in
        </Button>
        {this.state.showLoginComponent ?
          <Text style={styles.instructions}>
            It works insert Log in component here!
          </Text> : null
        }
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