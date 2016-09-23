// import React, { Component, View, Text, StyleSheet } from 'react-native';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...'
    };
  }
  _navigate(name) {
    this.props.navigator.push({
      name: name
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the SignIn page!
        </Text>

      {/* Register button leads to SignUp component*/}
       <Button
        onPress={(e) => { this._navigate('signup'); } }
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}} style={{fontSize: 20, color: 'white'}}>
         Register
      </Button>
      
      {/* Login button leads to Food component*/}
       <Button
        onPress={(e) => { this._navigate('food');}}
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}style={{fontSize: 20, color: 'white'}}>
         Log in
        </Button>
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