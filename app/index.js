import React, { Component } from 'react';
import { AppRegistry, Text, View, Platform, AsyncStorage } from 'react-native';
import { Scene, Router, Actions, TabBar, Navigator } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Food from './components/Food.js';
import Favorites from './components/Favorites.js';
import Recs from './components/Recs.js';
import Menu from './components/Menu.js';


var config = require('../config.js');

// for tab menu below, not used elsewhere
class TabIcon extends Component {
  render() {
    return (
      <View>
        <Icon name={ this.props.img } size={24} color={this.props.selected ? 'steelblue' : 'black' } />
        <Text style={{ color: this.props.selected ? 'steelblue' : 'black' }}>{this.props.title}</Text>
      </View>
    );
  }
}

export default class Dinder extends Component {
  constructor(props) {
    super(props);

    var apiRoot = config.apiRoot;

    // for testing locally with npm run server
    if (process.env.NODE_ENV !== 'production') {
      apiRoot = Platform.OS === 'android'
              ? config.androidLocalRoot
              : config.iosLocalRoot;
    }
    apiRoot += ':'
            + config.port;

    this.state = {
      apiRoot: apiRoot,
      authByToken: '',
      userId: 3 // fixme: hard-coded userId
    };
  }

  componentWillMount() {
    //AsyncStorage.removeItem('jwt');
    AsyncStorage.getItem('jwt')
    .then((value) => {
      console.log('index jwt', value);
      if (value !== null) {
        this.setState({authByToken: true});
      }
    })
    .catch((err) =>{
      console.error(err);
    });
  }

  render() {
    //if auth by token...
    return (
      <Router hideNavBar={true} >
        <Scene key='root' hideNavBar={true}>
          <Scene
            key='signin'
            initial={true}
            component={SignIn}
            icon={TabIcon}
            apiRoot={this.state.apiRoot}
            title='Sign In' />
          <Scene
            key='signup'
            component={SignUp}
            icon={TabIcon}
            apiRoot={this.state.apiRoot}
            title='Sign Up' />
          <Scene
            key='tabbar'
            tabs={true}
            type='reset'>
            <Scene
              img='star-border'
              key='favorites'
              component={Favorites}
              icon={TabIcon}
              title='Favorites'
              apiRoot={this.state.apiRoot}
              userId={this.state.userId} />
            <Scene
              img='local-pizza'
              key='food'
              initial={true}
              component={Food}
              icon={TabIcon}
              title='Food'
              apiRoot={this.state.apiRoot}
              userId={this.state.userId}/>
            <Scene
              img='assistant'
              key='recs'
              component={Recs}
              icon={TabIcon}
              apiRoot={this.state.apiRoot}
              userId={this.state.userId}
              title='Recs' />
            <Scene
              img='menu'
              key='menu'
              component={Menu}
              icon={TabIcon}
              title='Menu' />
          </Scene>
        </Scene>
      </Router>
    );
  }
}