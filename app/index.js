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

export default class Dinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegisterComponent: false,
      showLoginComponent:false,
      message: 'Loading...'
    };
  }

  getWelcomeMessage() {
    // if android use specific url for local
    if (Platform.OS === 'android') {
      var fetchUrl = 'http://10.0.2.2:1337/'
    } else {
      var fetchUrl = 'http://localhost:1337/'
    }
    return fetch(fetchUrl)
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

    };
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onRegisterClick() {
    this.setState({
      showRegisterComponent: !this.state.showRegisterComponent,
    });
  }

  onLoginClick() {
    this.setState({
      showLoginComponent: !this.state.showLoginComponent,
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>

          {this.state.message}


        </Text>
       <Button
        onPress={(e) => {this.onRegisterClick();  console.log('abcdefg');} }
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}} style={{fontSize: 20, color: 'white'}}>
         Register
      </Button>
        {this.state.showRegisterComponent ?
           <Text style={styles.instructions}>It works insert Register component here!  </Text> :
           null
        }
       <Button
        onPress={(e) => {this.onLoginClick(); console.log('Login clicked')}}
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}style={{fontSize: 20, color: 'white'}}>
         Log in
      </Button>
        {this.state.showLoginComponent ?
           <Text style={styles.instructions}>It works insert Log in component here! </Text> :
           null
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