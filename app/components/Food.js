// import React, { Component, View, Text, StyleSheet } from 'react-native';
var config = require('../../config.js');
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

import styles from '../styles/styles.js';

// var image1 = require('../images/image1.jpg');
// var image2 = require('../images/image2.jpg');
// var image3 = require('../images/image3.jpg');
// var image4 = require('../images/image4.jpg');
// var image5 = require('../images/image5.jpg');
// var image6 = require('../images/image6.jpg');

// const Cards = [{
//   'id': 1,
//   'first_name': 'Pikachu salad',
//   'image': image1
// }, {
//   'id': 2,
//   'first_name': 'Les Vegetables',
//   'image': image2
// }, {
//   'id': 3,
//   'first_name': 'Bonne Tuna pocket',
//   'image': image3
// }, {
//   'id': 4,
//   'first_name': 'Chicken sticks',
//   'image': image4
// }, {
//   'id': 5,
//   'first_name': 'Interstellar doughnuts',
//   'image': image5
// }, {
//   'id': 6,
//   'first_name': 'Orange chicken',
//   'image': image6
// }];

export default class Food extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...',
      cards: this.someImages(this.yelpOptions(null, 'businesses/'))
    };
  }

  Card(x) {
    return (
      <View style={styles.card}>
        <Image source ={x.image} resizeMode="contain" style ={{width: 350, height: 350}} />
        <View style={{width: 350, height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', margin: 15, marginTop: 25, }} >
        <Text style={{fontSize: 30, fontWeight: '400', textAlign: 'center', color: '#444'}}>{x.first_name}</Text>
        </View>
        </View>
      </View>
    );
  }
  handleYup (card) {
    console.log(`Yes for ${card.text}`);
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`);
  }
  noMore() {
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    );
  }

  yes() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }

  nope() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }

  fav() {
    console.log('favorited', this.refs['swiper']);
  }


  render() {
    return (
      <View style={styles.container}>
      <SwipeCards
        ref = {'swiper'}
        cards={this.state.cards}
        containerStyle = {{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }}
        renderCard={ (cardData) => this.Card(cardData) }
        renderNoMoreCards={() => this.noMore()}
        handleYup={this.handleYup}
        handleNope={this.handleNope} />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.nope()}>
        <Iconz name='ios-close' size={45} color="#111111" style={{}} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.yes()}>
        <Iconz name='ios-heart-outline' size={36} color="#FF4136" style={{ marginTop: 5 }} />
        </TouchableOpacity>
          <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.fav()}>
        <Iconz name='ios-star' size={36} color="#FFDC00" style={{ marginTop: 5 }} />
        </TouchableOpacity>
        </View>
        </View>
    );
  }
}