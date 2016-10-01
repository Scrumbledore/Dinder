import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tabs, Tab, utton } from 'react-native-elements';

import styles from '../styles/styles.js';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default class Recs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      long: undefined,
      lat: undefined,
      fakeData2: [],
      fakeData: [{
        name: 'Molinari Delicatessen',
        address: '373 Columbus Ave ',
        city: 'San Francisco',
        state: 'CA',
        url: 'https://s3-media3.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg'
      }, {
        name: 'Molinari Delicatessen2',
        address: '373 Columbus Ave ',
        city: 'San Francisco',
        state: 'CA',
        url: 'https://s3-media3.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg'
      }

      ]
    };
    this.state.rankIcons = {
      0: '../assets/gold.png',
      1: '../assets/silver.png',
      2: '../assets/bronze.png',
    };
  }

  getRecs() {
    return fetch(`${this.props.apiRoot}/api/recs/${this.props.userId}/${this.state.lat}/${this.state.long}`)
    .then((result) => {
      this.setState({
        recs: ds.cloneWithRowsAndSections({recList: this.state.fakeData}) //need to fix
      });
      // console.log(this.state.recs)
    })
    .catch((err) => console.error(err));
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
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
        <View style={styles.container}>
          <Text style={{marginTop: 30}}>Long: {this.state.long ? this.state.long : 'Please enable location services'}, Lat: {this.state.lat ? this.state.lat : 'Please enable location services'}</Text>
            <ListView n={this.state.n} dataSource={this.state.recs} renderRow={(rec) => this.recEntry(rec)}/>
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
    console.log(rec);
    return (
      <View style={styles.foodRecCardOuter}>
        <View style={styles.foodRecCardComment} >
            <Text style={{fontSize: 12, fontWeight: '400', textAlign: 'left', color: '#444'}}>{rec.name}</Text>
            <Text style={{textAlign: 'right'}}>rating goes here</Text>
        </View>
        <View style={styles.foodRecCardInner}>
          <Image source={{uri: rec.url}}
          resizeMode='contain' style={{width: 350, height: 350}} />
        </View>
        <View style={styles.foodRecCardComment} >
          <View>
            <Text>{rec.address}</Text>
            <Text>{rec.city}, {rec.state}</Text>
            <Text>zip?</Text>
          </View>
          <View>
            <Text>Uber/dlievery/something here</Text>
          </View>
        </View>
      </View>
    );
  }
}