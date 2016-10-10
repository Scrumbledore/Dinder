import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, AsyncStorage, TouchableHighlight, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import { Tabs, Tab, Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

import styles from '../styles/styles.js';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const config = require('../../config.js');

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
    // // This is only needed in OAuth where redirect is happening.
    // Linking.addEventListener('url', this._handleOpenURL);
    AsyncStorage.getItem('jwt')
    .then((token) => {
      this.setState({
        token: token
      }, this.getRecs);
    }).done();

  }

  // // This is only need if deeper OAuth integration is wanted.
  // _handleOpenURL(e) {
  //   if (e.url.indexOf('uber') > 0) {
  //     var urlCode = e.url.slice(e.url.indexOf('=') + 1);
  //     // this is hardcoded - should be changed but router resets state so need to confirm that issue is resolved.
  //     var code = {code: urlCode};
  //     fetch(`http://localhost:1337/uber`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(code)
  //       //   authorization: this.state.token
  //       // }
  //     })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       AsyncStorage.setItem('uber', JSON.stringify(data), () => {
  //         // this.getUber()
  //       })
  //     })
  //     .catch((err) => console.warn(err));
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>Recommended For You...</Text>

        {!this.state.recs || this.state.recs.getRowCount() === 0
          ? this.renderEmpty()
          : <ListView n={this.state.n} dataSource={this.state.recs} renderRow={(rec) => this.recEntry(rec)}/>}

        {this.props.nav()}

      </View>
    );
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
                <View>
                  <TouchableOpacity onPress={ () => Linking.openURL('http://www.yelp.com/').catch(err => console.error('An error occurred', err)) }>
                    <Image source={require('./assets/yelp-sm.png')} style={styles.yelpLogoCenter} />
                  </TouchableOpacity>
                </View>
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
          <TouchableHighlight onPress={((e) => this.getUber(rec.name, rec.address, rec.city, rec.state, rec.lat, rec.lon))} style={{flex: 2}}>
            <View>
              <Text>Uber here</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  getUber(destName, destAdd, destCity, destState, destLat, destLong) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      // below is link for testing purposes
      // console.log(`uber://?client_id=${config.UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${lat}&pickup[longitude]=${long}&dropoff[latitude]=${destLat}&dropoff[longitude]=${destLong}&dropoff[nickname]=${destName.replace(/\s/g, '%20')}&dropoff[formatted_address]=${destAdd.replace(/\s/g, '%20')}%2C%20${destCity.replace(/\s/g, '%20')}%2C%20${destState.replace(/\s/g, '%20')}%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`)
      Linking.canOpenURL(`uber://`).then(supported => {
        if (!supported) {
          // should proably have better flow on not supported
          alert('Uber is not installed');
        } else {
          return Linking.openURL(`uber://?client_id=${config.UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${lat}&pickup[longitude]=${long}&dropoff[latitude]=${destLat}&dropoff[longitude]=${destLong}&dropoff[nickname]=${destName.replace(/\s/g, '%20')}&dropoff[formatted_address]=${destAdd.replace(/\s/g, '%20')}%2C%20${destCity.replace(/\s/g, '%20')}%2C%20${destState.replace(/\s/g, '%20')}%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`);
        }
      });
    })

    // // This approach was going towards a deeper integration to request on behalf of user
    // // Did not scope out front end so delegated to Uber itselfs
    // // Code remains if we decide to implement in the future
    // AsyncStorage.getItem('uber', function(err, uber) {
    //   uberParsed = JSON.parse(uber)
    //   console.log('date!@#!@#!@#!@#!@#!@#!@#!@#!@#', new Date())
    //   console.log("================================================================")
    //   console.log(uberParsed.access_token)
    //   var now = new Date()
    //   var expiry = (new Date(uberParsed.expires))
    //   if (1 + 1 === 3 && now < expiry && uberParsed.access_token) {
    //     console.log("have valid token")
    //     console.log("================================================================")
    //     console.log(uber)
    //     // do something else
    //   } else {
    //     Linking.openURL(`https://login.uber.com/oauth/v2/authorize?client_id=${config.UBER_CLIENT_ID}&response_type=code`)
    //   }
    // })
  }
}