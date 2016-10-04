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
      long: undefined,
      lat: undefined
    };
  }

  getRecs() {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      return fetch(`${this.props.apiRoot}/api/recs/${this.props.userId}/${this.state.lat}/${this.state.long}`, {
        method: 'GET',
        headers: {
          authorization: token
        }
      })
      // format it a way that it can be used
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          // this is for listView
          recs: ds.cloneWithRowsAndSections({recList: result})
        });
      })
      .catch((err) => console.error(err));
    });
  }


  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;
      this.setState({long: longitude});
      this.setState({lat: latitude});
      this.getRecs();
    }, (error) => {
      alert('Please enable location services.');
    }, {
      enableHighAccurracy: true, timeout: 20000, maxinumAge: 1000
    });
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
        <Icon name='error' size={60}/>
        <Text aligntText='center'>Something went wrong. Please make sure location services are enabled.</Text>
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
                <StarRating rating={rec.rating} selectedStar={(rating) => console.log(rating)} disabled={true} starColor={'#d8ae47'} starSize={20}/>
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