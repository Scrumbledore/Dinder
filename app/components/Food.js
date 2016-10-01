import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, Animated, PanResponder, AsyncStorage } from 'react-native';
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
      enter: new Animated.Value(0),
      cards: [],
      faved: false,
      loaded: false
    };
  }

  getPhotos () {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      fetch(`${this.props.apiRoot}/api/photo/4/4/4/4`,
        {
          method: 'GET',
          headers: {
            authorization: token
          }
        }
      )
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((photos) => {
        this.setState({
          cards: photos,
          loaded: true
        });
        this.fadeIn();
      })
      .catch((err) => console.log(err));
    }).done();
  }

  componentDidMount () {
    this.getPhotos();
  }

  componentWillMount () {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0;
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
      toValue: 1,
      friction: 5
    }).start();
  }

  judge (endpoint) {
    this.exchange(endpoint, this.state.cards[0].id);
    this.popCard();
  }

  fave () {
    let endpoint = this.state.faved ? 'unfavorite' : 'favorite';
    this.setState({
      faved: !this.state.faved
    });
    this.exchange(endpoint, this.state.cards[0].id);
  }

  exchange (endpoint, id) {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      fetch(`${this.props.apiRoot}/api/${endpoint}/${id}`,
        {
          method: 'POST',
          headers: {
            authorization: token
          }
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    }).done();
  }

  renderCard () {
    let pan = this.state.swipe;
    let [translateX, translateY] = [pan.x, pan.y];
    let rotate = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg']
    });
    let opacity = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0, 1, 0]
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
      <Animated.View style={[styles.foodCard, animatedCardstyles]} {...this.panResponder.panHandlers}>
        <Image source={{uri: this.state.cards[0].url}} resizeMode="cover" style={{height: 300, width: 300}}/>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.foodIcon} onPress={() => this.judge('no')}>
            <Iconz name='md-close' color={'#FF0000'} size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodIcon} onPress={() => this.judge('yes')}>
            <Iconz name='md-checkmark' color={'#00FF00'} size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodIcon} onPress = {() => this.fave()}>
            <Iconz name='md-star' color={this.state.faved ? '#FFDC00' : '#CCCCCC'} size={40} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  renderNoMore () {
    return (
      <View>
        <Text>No More Cards</Text>
        <Text>Show more Recommendations?</Text>
        <TouchableOpacity style={styles.foodIcon} onPress={() => this.getPhotos()}>
          <Iconz name='ios-pizza' size={40} color='#111111'/>
        </TouchableOpacity>
      </View>
    );
  }

  render () {

    let pan = this.state.swipe;

    let yupStyle = {
      opacity: pan.x.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1]
      })
    };

    let nopeStyle = {
      opacity: pan.x.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0]
      })
    };

    return (
      <View style={styles.container}>
        {!this.state.loaded ? <Text>Loading...</Text>
          : (this.state.cards.length ? this.renderCard()
              : this.renderNoMore())}

        <Animated.View style={[styles.yup, yupStyle]}>
          <Text style={styles.yuptext}>Yum!</Text>
        </Animated.View>
        <Animated.View style={[styles.nope, nopeStyle]}>
          <Text style={styles.nopeText}>Barf!</Text>
        </Animated.View>
      </View>
    );
  }
}