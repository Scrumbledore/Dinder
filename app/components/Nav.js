import React, { Component } from 'react';
import { Animations, Actions, Schema} from 'react-native-redux-router';
import { AppRegistry, Text, View, Platform, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class Nav extends Component {
  render() {
    return (
      <View>
        <Icon name={camera} size={24} color={this.props.selected ? 'steelblue' : 'black' } />
        <Text style={{ color: this.props.selected ? 'steelblue' : 'black' }}>{camera}</Text>
      </View>
    );
  }
}