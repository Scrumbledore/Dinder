import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import { Tabs, Tab, utton } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

import styles from '../styles/styles.js';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default class Recs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  getRecs() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      fetch(`${this.props.apiRoot}/api/recs/${lat}/${long}`, {
        method: 'GET',
        headers: {
          authorization: this.state.token
        }
      })
      .then((data) => data.json())
      .then((recs) => {
        this.setState({
          recs: ds.cloneWithRowsAndSections({
            recList: recs
          })
        });
      })
      .catch((err) => console.error(err));
    }, (error) => {
      alert('Please enable location services.');
    }, {
      enableHighAccurracy: true, timeout: 20000, maxinumAge: 1000
    });
  }

  componentDidMount () {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      this.setState({
        token: token
      }, this.getRecs);
    }).done();
  }

  render() {
    if (this.state.recs === undefined || this.state.recs.getRowCount() === 0) {
      return this.renderEmpty();
    } else {
      return (
        <View style={styles.recContainer}>
          <Text style={{marginTop: 30, fontSize: 24, fontWeight: '800'}}>Recommended For You...</Text>
          <ListView n={this.state.n} dataSource={this.state.recs} renderRow={(rec) => this.recEntry(rec)}/>
          <View style={{marginBottom: 60}}>
          </View>
        </View>
      );
    }
  }

  renderEmpty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Text aligntText='center'>Locating the best food for you...</Text>
      </View>
    );
  }


  recEntry(rec) {
    return (
      <View style={styles.foodRecCardOuter}>
        <View style={styles.foodRecCardComment} >
            <Text style={styles.foodRecName}>{rec.name}</Text>
            <View>
              <View>
                <StarRating rating={rec.rating * 1} selectedStar={(rating) => console.log(rating)} disabled={true} starColor={'#d8ae47'} starSize={20}/>
              </View>
              <Text style={{textAlign: 'center', fontSize: 16, color: '#66cc66', fontWeight: '900'}}>{rec.price}</Text>
            </View>
        </View>
        <View style={styles.foodRecCardInner}>
          <Image source={{uri: rec.url}}
          resizeMode='contain' style={{width: 350, height: 350}} />
        </View>
        <View style={styles.foodRecCardBottomComment} >
          <View style={{flex: 3}}>
            <Text>{rec.address}</Text>
            <Text>{rec.city}, {rec.state}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}>
              <Text>{rec.zip}</Text>
              <Text style={{fontStyle: 'italic', paddingRight: 10}}>~{rec.dist}</Text>
            </View>
          </View>
          <View style={{flex: 2}}>
            <Text>Uber here</Text>
          </View>
        </View>
      </View>
    );
  }
}