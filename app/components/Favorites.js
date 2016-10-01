import React, { Component } from 'react';
import { Text, View, ListView, Image, AsyncStorage } from 'react-native';
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
          <Text style={{margin: 15, marginTop: 30, fontSize: 24, fontFamily: 'Noteworthy'}}>
            Dumbledore's Favorites
          </Text>
          <ListView dataSource={this.state.favs} renderRow={(favorite) => this.favoriteEntry(favorite)} />
        </View>
      );
    }
  }

  renderEmpty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Icon name='cake' size={60}/>
        <Text >You haven't favorited anything yet.</Text>
      </View>
    );
  }

  favoriteEntry(favorite) {

    return (
      <View style={styles.foodFavCardOuter} >
        <View style={styles.foodFavCardInner} >
        <Image source={{uri: favorite.url}} resizeMode="contain" style={{width: 350, height: 300}} />
        </View>
        <View style={styles.foodFavCardComment} >
        <Text style={{fontSize: 24, fontFamily: 'Noteworthy'}}>OMG SO YUMMY!!!</Text>
        </View>
      </View>
    );
  }
}
          // <View style={{width: 350, height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          //   <View style={{flexDirection: 'row', margin: 15, marginTop: 25, alignItems: 'center'}} >
          //   <Text style={{fontSize: 12, fontWeight: '400', textAlign: 'center', color: '#444'}}>{favorite.info}</Text>
          //   </View>
          // </View>