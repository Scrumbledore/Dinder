// import React, { Component, View, Text, StyleSheet } from 'react-native';
var config = require('../../config.js');
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

import styles from '../styles/styles.js';


export default class Food extends Component {
  constructor (props) {
    super(props);
    this.counter = 0;
    this.state = {
      cards: []
    };
  }

  getPhotos () {
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

  componentDidMount () {
    this.getPhotos();
  }

  Card (x) {
    this.counter = x.id;
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

  noMore () {
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

  judge (endpoint) {

    var _this = this;
    this.refs['swiper']._goToNextCard();

    fetch(`${this.props.apiRoot}/api/${endpoint}/${this.props.userId}/${this.counter}`, {
      method: 'POST'
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render () {
    var cards = <Text>Loading...</Text>;
    if (this.state.cards.length) {
      console.log(this.state.cards);
      cards = <SwipeCards
        ref = {'swiper'}
        cards = {this.state.cards}
        containerStyle = {{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }}
        renderCard = { (cardData) => this.Card(cardData) }
        renderNoMoreCards = {() => this.noMore()}
        handleFav = {this.judge.bind(this, 'favorites')}
        handleYup = {this.judge.bind(this, 'yes')}
        handleNope = {this.judge.bind(this, 'no')} />;
    }
    return (
      <View style={styles.container}>
        {cards}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.judge('no')}>
            <Iconz name='ios-close' size={45} color="#111111" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.judge('yes')}>
            <Iconz name='ios-heart-outline' size={36} color="#FF4136" style={{ marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.foodButtons} onPress = {() => this.judge('favorites')}>
            <Iconz name='ios-star' size={36} color="#FFDC00" style={{ marginTop: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}