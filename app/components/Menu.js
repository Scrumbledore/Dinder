import React, { Component } from 'react';
import { Text, View,  ScrollView, Image} from 'react-native';
import { Icon, Button} from 'react-native-elements';

import styles from '../styles/styles.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }
  userLogout() {
    console.log('I am logging out now !');
  }
  render() {
    return (
      <View style={styles.menuContainer}>
        <Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>
         <ScrollView
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          styles={{top: 20}}
          >

          <Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>
        <Text >
          Welcome to the Menu Page!
        </Text>
        <Button
          onPress={this.userLogout.bind(this)}
          buttonStyle={{
            position: 'absolute',
            right: 0,
            left: 0,
            width:100,
            height:50,
            borderRadius: 6,
            backgroundColor: '#1da1f2',
          }}
          title='Log out'
        />
        </ScrollView>

       <View style={{marginBottom: 100}}>
          </View>
      </View>
    );
  }
}
