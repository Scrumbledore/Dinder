import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Profile extends Component {
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
          Welcome to the Profile page!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});