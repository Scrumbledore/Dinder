import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


import styles from '../styles/styles.js';

export default class PhotoTaken extends Component {
  constructor(props) {
    super(props);
  }

render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.welcome}>Photo Saved!</Text>
        <View style={styles.container}>
          <View style={styles.foodCard}>
            <Image source={{uri: this.props.url}} style={styles.foodImg}/>
          </View>
          <Text style={styles.phototaken}>View all of your photos on your profile page <Icon name='long-arrow-right' onPress={Actions.menu} size={40} color={'#1da1f2'}/> </Text>   
        </View>
        {this.props.nav()}
      </View>
    );
  }
}