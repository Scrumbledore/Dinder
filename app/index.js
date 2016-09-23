// import React, { Component, View, Text, StyleSheet } from 'react-native';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Dinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...'
    };
  }

  getWelcomeMessage() {
    return fetch('http://10.0.2.2:1337/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      this.setState({
        message: data.message
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.message}
        </Text>
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