import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


import styles from '../styles/styles.js';

export default class ViewUserPhoto extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.welcome}>Photo Gallery</Text>
        <View style={styles.container}>
          <Text style={styles.phototaken}><Icon name='long-arrow-left' onPress={Actions.menu} size={40} color={'#1da1f2'}/> Back to gallery</Text>
          <View style={styles.foodCard}>
            <Image source={{uri: this.props.url}} style={styles.foodImg}/>        
          </View>
        </View>
        {this.props.nav()}
      </View>
    );
  }
}