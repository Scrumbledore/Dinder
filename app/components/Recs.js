import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs, Tab, Icon, Button } from 'react-native-elements';

import styles from '../styles/styles.js';

export default class Recs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the Recs Page!
        </Text>
      </View>
    );
  }
}