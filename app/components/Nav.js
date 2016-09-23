import React, { Component } from 'react';
import {
  Navigator,
  Text,
  StyleSheet
} from 'react-native';

import Food from './Food';
import Favorites from './Favorites';
import Profile from './Profile';
import Recs from './Recs';
import Restaurant from './Restaurant';
import Settings from './Settings';
import SignUp from './SignUp';
import SignIn from './SignIn';

const ROUTES = {
  food: Food,
  favorites: Favorites,
  profile: Profile,
  recs: Recs,
  restaurant: Restaurant,
  settings: Settings,
  signin: SignIn,
  signup:  SignUp,
  
}

export default class Nav extends Component {
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component navigator={navigator}/>
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={ (route) => {return Navigator.SceneConfigs.HorizontalSwipeJump;} }
      />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
