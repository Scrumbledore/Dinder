import React, { Component } from 'react';
import { AppRegistry, Text, View, Platform, AsyncStorage } from 'react-native';
import { Scene, Router, Actions, TabBar, Navigator } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Food from './components/Food';
import Favorites from './components/Favorites';
import Recs from './components/Recs';
import Menu from './components/Menu';
import RNCamera from './components/Camera';


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
      authByToken: false,
      userId: 3 // fixme: hard-coded userId
    };
  }

  // componentWillMount() {
  //   AsyncStorage.getItem('jwt')
  //   .then((value) => {
  //     this.setState({
  //       authByToken: value ? true : false
  //     })
  //   }).done();
  // }

  render() {
    //if auth by token...
    return (
      <Router hideNavBar={true} >
        <Scene key='root' hideNavBar={true}>
          <Scene
            key='signin'
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
            tabs={true}>
            <Scene
              img='camera'
              key='camera'
              component={RNCamera}
              icon={TabIcon}
              title='Camera'
              apiRoot={this.state.apiRoot}
              userId={this.state.userId} />
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