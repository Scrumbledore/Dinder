import React, { Component } from 'react';
import { Text, View, ListView, Image } from 'react-native';

import styles from '../styles/styles.js';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined
    };
  }

  componentWillMount() {
    return fetch(`${this.props.apiRoot}/api/favorites/${this.props.userId}`)
    .then((result) => {
      this.setState({
        dataSource: ds.cloneWithRowsAndSections({
          favList: JSON.parse(result._bodyText)
        })
      });
    })
    .catch((err) => console.error(err));
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
          <Text style={{margin: 15, marginTop: 30, fontSize: 24, fontFamily: 'Noteworthy'}}>
            Dumbledore's Favorites
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