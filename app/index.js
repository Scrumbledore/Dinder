import React, { Component } from 'react';
<<<<<<< HEAD
import { AppRegistry, Text, View, Platform, AsyncStorage } from 'react-native';
import { Scene, TabBar, Navigator } from 'react-native-router-flux';
=======
import {
  AsyncStorage,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActionConst,
  Actions,
  Router,
  Scene,
  TabBar,
} from 'react-native-router-flux';
>>>>>>> save work on redux before merging @busby's branch
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createStore } from 'redux';
import { Provider, connect} from 'react-redux';

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

<<<<<<< HEAD
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {Router, routerReducer, Route, Container, Animations, Actions, Schema} from 'react-native-redux-router';
=======
import configureStore from './store';

const store = configureStore();
const RouterWithRedux = connect()(Router);
>>>>>>> save work on redux before merging @busby's branch

const config = require('../config.js');

<<<<<<< HEAD
let store = createStore(combineReducers({routerReducer}));

// for tab menu below, not used elsewhere
class TabIcon extends Component {
=======
class Nav extends Component {
>>>>>>> save work on redux before merging @busby's branch
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.foodIcon} onPress={() => this.judge('no')}>
          <Iconz name='md-close' color={'#FF0000'} size={40} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default class DinDin extends Component {
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
<<<<<<< HEAD
        Actions.Food();
=======
        Actions.tabbar(); // pass token to scenes as state?
>>>>>>> save work on redux before merging @busby's branch
      }
    }).done();
  }

  render() {
    return (
<<<<<<< HEAD
        <View style={{flex: 1}}>
          <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#F5FCFF'}}/>
          <Provider store={store}>
            <Router>
            <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} />
            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} />
            <Schema name="withoutAnimation"/>
            <Schema name="tab" navbar={Nav}/>


            <Route name='signin'
              component={SignIn}
              initial={true}
              icon={TabIcon}
              apiRoot={this.state.apiRoot}
              title='Sign In'
              key='signin'/>

            <Route name='signup'
              component={SignUp}
              schema="tab"/>

            <Route name='Food'
              img='local-pizza'
              key='Food'
              component={Food}
              icon={TabIcon}
              title='Food'
              apiRoot={this.state.apiRoot}
              userId={this.state.userId}
              schema={'tab'}/>

            <Route name='Favorites'
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
=======
      <Provider store={store} >
        <RouterWithRedux hideNavBar={true} apiRoot={this.state.apiRoot} nav={Nav} >
          <Scene key='root' >
            <Scene key='signin' component={SignIn} />
            <Scene key='signup' component={SignUp} />
            <Scene key='photos' component={Photos} />
            <Scene key='camera' component={RNCamera} />
            <Scene key='cameraroll' component={CameraRoll} />
            <Scene key='favorites' component={Favorites} />
            <Scene key='food' component={Food} />
            <Scene key='recs' component={Recs} />
            <Scene key='menu' component={Menu} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
>>>>>>> save work on redux before merging @busby's branch
