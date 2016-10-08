import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Icon, Button} from 'react-native-elements';

import styles from '../styles/styles.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  userLogout() {
    AsyncStorage.removeItem('jwt')
    .then((value) => {
      console.log('removed JWT2', value);
      Actions.signin();
    }).done();
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>My DinDin Profile</Text>

          {/*<Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>*/}

        <View style={styles.menuContainer}>

          <ScrollView
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}
            styles={{top: 20}} >

            <Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>

            <Text>Welcome to the Menu Page!</Text>

          </ScrollView>

          <Button
            onPress={this.userLogout}
            buttonStyle={{
              width:100,
              height:50,
              borderRadius: 6,
              backgroundColor: '#1da1f2',
            }}
            title='Log out' />

        </View>

        {this.props.nav()}

      </View>
    );
  }
}