// thank you,
// https://github.com/brentvatne/react-native-animated-demo-tinder
// https://github.com/meteor-factory/react-native-tinder-swipe-cards

import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles.js';

var config = require('../../config.js');
var SWIPE_THRESHOLD = 120;

export default class Food extends Component {
  constructor (props) {
    super(props);
    this.state = {
      swipe: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      cards: [],
      faved: false,
      loaded: false
    };
  }

  getPhotos () {
    fetch(`${this.props.apiRoot}/api/photo/3/4/1/1`) // fixme: hard-coded API request
    .then((data) => data.json())
    .then((photos) => {
      this.setState({
        cards: photos,
        loaded: true
      });
      this.fadeIn();
    })
    .catch((err) => console.log(err));
  }

  componentDidMount () {
    this.getPhotos();
  }

  componentWillMount () {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onPanResponderGrant: (e, gestureState) => {
        this.state.swipe.setOffset({
          x: this.state.swipe.x._value,
          y: this.state.swipe.y._value
        });
        this.state.swipe.setValue({
          x: 0,
          y: 0
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.swipe.x,
          dy: this.state.swipe.y
        }
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.swipe.flattenOffset();
        if (Math.abs(this.state.swipe.x._value) > SWIPE_THRESHOLD) {
          this.state.swipe.x._value > 0 ? this.judge('yes') : this.judge('no');
        } else {
          Animated.spring(this.state.swipe, {
            toValue: {
              x: 0,
              y: 0
            },
            friction: 4
          }).start();
        }
      }
    });
  }

  popCard () {
    this.state.swipe.setValue({
      x: 0,
      y: 0
    });
    this.state.enter.setValue(0);
    this.setState({
      faved: false,
      cards: this.state.cards.length > 1 ? this.state.cards.slice(1) : []
    });
    this.fadeIn();
  }

  fadeIn () {
    Animated.spring(this.state.enter, {
      toValue: 1
    }).start();
  }

  judge (endpoint) {
    this.popCard();
    this.exchange(endpoint);
  }

  fave () {
    let endpoint = this.state.faved ? 'unfavorite' : 'favorite';
    this.setState({
      faved: !this.state.faved
    });
    this.exchange(endpoint);
  }

  exchange (endpoint) {
    fetch(`${this.props.apiRoot}/api/${endpoint}/${this.props.userId}/${this.state.cards[0].id}`,
      {
        method: 'POST'
      }
    )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
  }

  renderCard () {
    let pan = this.state.swipe;
    let [translateX, translateY] = [pan.x, pan.y];
    let rotate = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-30deg", "0deg", "30deg"]
    });
    let opacity = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5]
    });
    let animatedCardstyles = {
      transform: [
        {translateX},
        {translateY},
        {rotate}
      ],
      opacity
    };

    return (
      <Animated.View style={animatedCardstyles} {...this.panResponder.panHandlers}>
        <View  style={styles.card}>
          <Image  source ={{uri: this.state.cards[0].url}}
                  resizeMode="contain"
                  style ={{width: 350, height: 350}} />
        </View>
      </Animated.View>
    );
  }

  renderNoMore () {
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
        <Text>Show more Recommendations</Text>
        <TouchableOpacity style = {styles.foodButtons}
                          onPress = {() => this.getPhotos()}>
          <Iconz  name='ios-pizza'
                  size={45}
                  color="#111111"
                  style={{}} />
        </TouchableOpacity>
      </View>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        {!this.state.loaded ? <Text>Loading...</Text>
          : (this.state.cards.length ? this.renderCard() : this.renderNoMore())}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style = {styles.foodButtons}
                            onPress = {() => this.judge('no')}>
            <Iconz  name='ios-close'
                    size={45}
                    color="#111111"
                    style={{}} />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.foodButtons}
                            onPress = {() => this.judge('yes')}>
            <Iconz  name='ios-heart-outline'
                    size={36}
                    color="#FF4136"
                    style={{ marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.foodButtons}
                            onPress = {() => this.fave()}>
            <Iconz  name='ios-star'
                    size={36}
                    color={this.state.faved ? '#FFDC00' : '#CCCCCC'}
                    style={{ marginTop: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}