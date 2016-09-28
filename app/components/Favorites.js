import React, { Component } from 'react';
import { Text, View, ListView, Image } from 'react-native';

import styles from '../styles/styles.js';

var config = require('../../config.js');
var apiRoot = config.apiRoot;
var apiPort = config.port;



const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    
    // this needs to be pulled in somehow
    this.state = {
      userId: '3',
      apiUrl: apiRoot + ':' + apiPort + '/api',
      favList: []
    };

  }

  componentWillMount() {
    return fetch(this.state.apiUrl + '/favorites/' + this.state.userId)
    .then((result) => {
      console.log(this.state.favList);
      // prob reduncant
      this.setState({
        // can fix api to return better?????
        favList: result._bodyText
      });
      this.setState({
        dataSource: ds.cloneWithRowsAndSections({favList: JSON.parse(result._bodyText)})
      });
      // console.log(this.state.favList)
      console.log(this.state.favList);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    if (this.state.dataSource === undefined || this.state.dataSource.getRowCount() === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Loading...
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to the Favorites Page for {this.state.userId}
          </Text>
          <ListView dataSource={this.state.dataSource} renderRow={(favorite) => this.favoriteEntry(favorite)} />
        </View>
      );
    }
  }

  favoriteEntry(favorite) {
    return (
      <View style={styles.card} >
      <Image source ={{uri: favorite.url}} resizeMode="contain" style ={{width: 350, height: 350}} />
        <View style={{width: 350, height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', margin: 15, marginTop: 25, alignItems: 'center'}} >
          <Text style={{fontSize: 12, fontWeight: '400', textAlign: 'center', color: '#444'}}>{favorite.info}</Text>
          </View>
        </View>
      </View>
    );
  }



}