import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';

import styles from '../styles/styles.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.menuContainer}>
        <Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>
        <Text >
          Welcome to the Menu Page!
        </Text>
      </View>
    );
  }
}
