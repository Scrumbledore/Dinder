import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Icon, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles.js';
import PhotoGrid from 'react-native-photo-grid';


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: undefined,
      token: '',
      loaded: false
    };
  }

  userLogout() {
    AsyncStorage.removeItem('jwt')
    .then((value) => {
      console.log('removed JWT2', value);
      Actions.signin();
    }).done();
  }

  componentDidMount() {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      this.setState({
        token: token
      }, this.fetchPhotos);
    }).done();
  }

  fetchPhotos() {
    return fetch(`${this.props.apiRoot}/api/images/`,
      {
        method: 'GET',
        headers: {
          authorization: this.state.token
        }
      }
    )
    .then((data) => data.json())
    .then((photos) => {
      this.setState({
        items: photos,
        loaded: true
      });
    })
    .catch((err) => console.error(err));
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Icon name='camera' size={60}/>
        <Text>No images saved yet!</Text>

      </View>
    );
  }

  renderItem(item, itemSize) {
    return (
      <TouchableOpacity
        key={item.id}
        style={{ width: itemSize, height: itemSize }}
        onPress={ () => {
          //redirect to larger
          // console.log(item.url);
        }}>
        <Image
          resizeMode = "cover"
          style={styles.menuContainer}
          source={{ uri: item.url }}
        />
      </TouchableOpacity>
    );
  }

  renderGrid() {
    return (
      <PhotoGrid
        data={this.state.items}
        itemsPerRow={3}
        itemMargin={0}
        renderItem={this.renderItem} />
    );
  }


  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>My DinDin Profile</Text>

        <View style={styles.menuContainer}>

        <Button
            onPress={this.userLogout}
            buttonStyle={{
              width: 100,
              height: 50,
              borderRadius: 6,
              margin: 5,
              backgroundColor: '#1da1f2',
            }}
            title='Log out' />

            <Image source={require('./assets/busby.jpg')} resizeMode="cover" style={styles.profile}/>

            <Text>My Saved Photos</Text>

            {!this.state.loaded ? <Text>Loading...</Text>
        : (this.state.items.length ? this.renderGrid() : this.renderEmpty())}
        

          

        

        </View>

        {this.props.nav()}

      </View>
    );
  }
}