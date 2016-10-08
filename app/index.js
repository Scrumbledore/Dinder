import React, { Component } from 'react';
import { AppRegistry, Text, View, Platform, AsyncStorage } from 'react-native';
import { Scene, TabBar, Navigator } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Food from './components/Food';
import Favorites from './components/Favorites';
import Recs from './components/Recs';
import Menu from './components/Menu';
import RNCamera from './components/Camera';
import Photos from './components/Photos';
import CameraRoll from './components/CameraRoll';
import Nav from './components/Nav';

import {Router, routerReducer, Route, Container, Animations, Actions, Schema} from 'react-native-redux-router';

var config = require('../config.js');
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';


let store = createStore(combineReducers({routerReducer}));

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
      apiRoot: apiRoot
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('jwt')
    .then((value) => {
      if (value) {
        Actions.Food();
      }
    }).done();
  }

  render() {
    return (
        <View style={{flex:1}}>
            <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
            <Provider store={store}>
            <Router>
            <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} />
            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} />
            <Schema name="withoutAnimation"/>
            <Schema name="tab" navbar={Nav}/>


            <Route name="signin" component={SignIn} initial={true} schema="modal"  icon={TabIcon}
            apiRoot={this.state.apiRoot}
            title='Sign In' key='signin'/>
            <Route name="signup" component={SignUp} schema="tab"/>


            <Route name="Food"  img='local-pizza'
              key='Food'
              component={Food}
              icon={TabIcon}
              title='Food'
              apiRoot={this.state.apiRoot}
              userId={this.state.userId}
              schema={"tab"}/>
            <Route
              name="Favorites"
              img='star-border'
              key="Favorites"
              component={Favorites}
              icon={TabIcon}
              title="Favorites"
              apiRoot={this.state.apiRoot}
              userId={this.state.userId}/>
            <Route
              name='Recs'
              img='assistant'
              key='Recs'
              component={Recs}
              icon={TabIcon}
              apiRoot={this.state.apiRoot}
              userId={this.state.userId}
              title='Recs' />
            <Route
              name='Camera'
              key='Camera'
              component={RNCamera}
              apiRoot={this.state.apiRoot}
              userId={this.state.userId} />
            <Route
              name='CameraRoll'
              key='CameraRoll'
              component={CameraRoll}
              apiRoot={this.state.apiRoot}
              userId={this.state.userId} />
            <Route
              name='Photos'
              img='camera'
              key='Photos'
              component={Photos}
              icon={TabIcon}
              title='Photos'
              apiRoot={this.state.apiRoot}
              userId={this.state.userId} />
            <Route
              name='Menu'
              img='Menu'
              key='Menu'
              component={Menu}
              icon={TabIcon}
              title='Menu' />
            </Router>
            </Provider>

        </View>
    );
  }
}

class Example extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {() => <Dinder />}
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Example', () => Example);
