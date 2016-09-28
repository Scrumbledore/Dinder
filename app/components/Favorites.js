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
      favList: [],
      fakeData: [
        {
          'id': 1,
          'info': 'something info',
          'url': 'http://kingofwallpapers.com/bread/bread-012.jpg'
        }, {
          'id': 2,
          'info': 'phot3232323',
          'url': 'www.google.com'
        }
      ]
      // dataSource: ds.cloneWithRows(this.state.favList)
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
          <ListView dataSource={this.state.dataSource} renderRow={(favorite) => <View><Image source ={{uri: 'https://www.google.com/images/nav_logo242.png'}} resizeMode='contain' style ={{width: 350, height: 350}} /><Text>hoho</Text></View>} />
        </View>
      );
    }
  }



}