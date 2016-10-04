import React, { Component } from 'react';
import { Text, View, ListView, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles/styles.js';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: undefined
    };
  }

  componentWillMount() {
    this.fetchFavs();
  }

  fetchFavs() {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      fetch(`${this.props.apiRoot}/api/favorites/`,
        {
          method: 'GET',
          headers: {
            authorization: token
          }
        }
      )
      .then((result) => {
        this.setState({
          favs: ds.cloneWithRowsAndSections({
            favList: JSON.parse(result._bodyText)
          })
        });
      })
      .catch((err) => console.error(err));
    }).done();
  }

  render() {
    if (this.state.favs === undefined || this.state.favs.getRowCount() === 0) {
      return this.renderEmpty();
    } else {
      return (
        <View style={styles.container}>
          <Text style={{marginTop: 30, fontSize: 24, fontWeight: '800'}}>Your Favorite NOMS!!</Text>
          <ListView dataSource={this.state.favs} renderRow={(favorite) => this.favoriteEntry(favorite)} />
          <Icon name='refresh' size={60} onPress={(e) => this.fetchFavs()} />
          <View style={{marginBottom: 60}}>
          </View>
        </View>
      );
    }
  }

  renderEmpty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Icon name='cake' size={60}/>
        <Text >You haven't favorited anything yet.</Text>
        <Icon name='refresh' size={60} onPress={(e) => this.fetchFavs()} />
      </View>
    );
  }

  favoriteEntry(favorite) {

    return (
      <View style={styles.foodFavCardOuter} >
        <View style={styles.foodFavCardInner} >
        <Image source={{uri: favorite.url}} resizeMode='contain' style={{width: 350, height: 300}} />
        </View>
        <View style={styles.foodFavCardComment} >
        <Text style={{fontSize: 20, fontFamily: 'Noteworthy'}}>{this.randomQuote()}</Text>
        </View>
      </View>
    );
  }

  randomQuote() {
    var quotes = ['OMG SO YUMMY!', 'I can\'t wait to try this!', 'This looks so awesome!', 'Gotta try this someday', 'Nom nom nom!'];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}