import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Icon, Button} from 'react-native-elements';
import { Actions } from 'react-native-redux-router';

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
      <View style={styles.menuContainer}>
         <ScrollView
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          styles={{top: 20}}
          >
        <Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>

        <Text >
          Welcome to the Menu Page!
        </Text>

        <View style={{height: 30, width: 300}}>


        </View>
        </ScrollView>
        <Button
          onPress={this.userLogout}
          buttonStyle={{
            width: 100,
            height: 50
          }}
          title='Log out'
        />
        <View style={{flexDirection: 'row', bottom: 30}}>
          <TouchableOpacity style={styles.foodNav} onPress = {Actions.Photos}>
            <Icon name='camera' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
           <TouchableOpacity style={styles.foodNav} onPress = {Actions.Favorites}>
            <Icon name='star-border' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodNav} onPress = {Actions.Food}>
            <Icon name='local-pizza' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
             <TouchableOpacity style={styles.foodNav} onPress = {Actions.Recs}>
            <Icon name='assistant' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
             <TouchableOpacity style={styles.foodNav} onPress = {Actions.Menu}>
            <Icon name='menu' size={50} color={this.props.selected ? 'steelblue' : 'black' } />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
