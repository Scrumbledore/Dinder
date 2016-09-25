// import React, { Component, View, Text, StyleSheet } from 'react-native';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Food extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You are in Food!
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