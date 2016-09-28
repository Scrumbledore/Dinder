// import React, { Component, View, Text, StyleSheet } from 'react-native';
var config = require('../../config.js');
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

import styles from '../styles/styles.js';


export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  getPhotos() {
    var _this = this;
    fetch(`${this.props.apiRoot}/api/photo/3/4/1/1`) // fixme: hard-coded API request
    .then(function(data) {
      return data.json();
    })
    .then(function(data) {
      _this.setState({
        cards: data
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getPhotos();
  }

  Card(x) {
    return (
      <View style={styles.card} id={x.id}>
        <Image source ={{uri: x.url}} resizeMode="contain" style ={{width: 350, height: 350}} />
        <View style={{width: 350, height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', margin: 15, marginTop: 25, }} >
            <Text style={{fontSize: 30, fontWeight: '400', textAlign: 'center', color: '#444'}}></Text>
          </View>
        </View>
      </View>
    );
  }

  noMore() {
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
        <Text>Checkout our Recommendations</Text>
        <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.getPhotos()}>
          <Iconz name='ios-pizza' size={45} color="#111111" style={{}} />
        </TouchableOpacity>
      </View>
    );
  }

  handleYup (card) {
    console.log(`Yes for ${card.text}`);
    this.refs['swiper']._goToNextCard();
    fetch(`${this.props.apiRoot}/api/yes/${this.props.userId}/${card.id}`, {
      method: 'POST'
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`);
    this.refs['swiper']._goToNextCard();
    fetch(`${this.props.apiRoot}/api/no/${this.props.userId}/${card.id}`, {
      method: 'POST'
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
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
    var cards = <Text>Loading...</Text>;
    if (this.state.cards.length) {
      console.log(this.state.cards);
      cards = <SwipeCards
        ref = {'swiper'}
        cards = {this.state.cards}
        containerStyle = {{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }}
        renderCard = { (cardData) => this.Card(cardData) }
        renderNoMoreCards = {() => this.noMore()}
        handleYup = {this.handleYup.bind(this)}
        handleNope = {this.handleNope.bind(this)} />;
    }
    return (
      <View style={styles.container}>
        {cards}
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