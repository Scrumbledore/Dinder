// import React, { Component, View, Text, StyleSheet } from 'react-native';

import React, { Component } from 'react';
import { Icon, Button } from 'react-native-elements';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../styles/styles.js'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the SignIn page!
        </Text>

      <Button
          buttonStyle={styles.buttonBlue}
          title="Sign Up"
          onPress={Actions.signup}/>

      <Button 
        buttonStyle={styles.buttonBlue}
        title="Sign In"
        onPress={Actions.tabbar} />
  
      </View>

    );
  }
}