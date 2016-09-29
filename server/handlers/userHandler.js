var request = require('request');
var requestPromise = require('request-promise');
var User = require('../database/models/user.js');
var Photo = require('../database/models/photo.js');
var Place = require('../database/models/place.js');
var UserPhotos = require('../database/models/userPhotos.js');
var Yelp = require('../config/yelpRouter.js');

module.exports = {

  getPhotos: function (req, res) {

    // using default values - not referencing req.params

    var photos = [];

    requestPromise(Yelp.yelpOptions(null, 'businesses/'))
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(data) {
      data.businesses.forEach(function(business, bCount) {
        Place.findOne({
          where: {
            name: business.name
          }
        })
        .then(function(place) {
          if (!place) {
            return Place.create({
              lat: business.coordinates.latitude || 0,
              lon: business.coordinates.longitude || 0,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zip: business.location.zip_code,
              url: business.image_url
            });
          } else {
            return place;
          }
        })
        .then(function(newPlace) {
          requestPromise(Yelp.yelpOptions(business.id, 'businesses/'))
          .then(function (data) {
            return JSON.parse(data);
          })
          .then(function (businessInfo) {
            businessInfo.photos.forEach(function (url, pCount) {
              Photo.findOne({
                where: {
                  url: url
                }
              })
              .then(function (photo) {
                if (!photo) {
                  return Photo.create({
                    info: '',
                    url: url,
                    PlaceId: newPlace.id
                  });
                } else {
                  return photo;
                }
              })
              .then(function (newPhoto) {
                photos.push(newPhoto.toJSON());
                if (bCount + 1 === data.businesses.length
                  && pCount + 1 === businessInfo.photos.length) {
                  res.json(photos);
                }
              });
            });
          });     // this should be refactored -
        });       // maybe split the above into two functions?
      });
    })
    .catch(function (err) {
      throw err;
    });
  },

  getFavorites: function (req, res) {
    User.findOne({
      where: {
        id: req.params.userid
      }
    })
    .then(function (user) {
      return user.getPhotos({
        joinTableAttributes: ['favorite']
      });
    })
    .then(function (photos) {
      res.json(photos.filter(function (photo) {
        return photo.UserPhotos.favorite === true;
      }));
    })
    .catch(function (err) {
      throw err;
    });
  },

  getRecommendations: function (req, res) {
    var userId = req.params.userid;
    var zip = req.params.zip;
    var location = {long: parseFloat(req.params.long), lat: parseFloat(req.params.lat)};
    if (location.long && locaation.lat) {
      User.findOne({
        where: {id: userId}
      }).then(
        function(user) {
          user.getPlaces().then(
            function(places) {
              res.status(201).send(places);
            }
          );
        }
      );
    } else {
      // search by zip
    }
    console.log('getRecommendations for', userId, 'at', location);
  }

};



  // getFavorites example return
  // [
  //   {
  //     "id": 1,
  //     "info": "something info",
  //     "url": "www.google.com",
  //     "createdAt": "2016-09-26T23:44:38.534Z",
  //     "updatedAt": "2016-09-26T23:44:38.534Z",
  //     "placeId": 1,
  //     "favorites": {
  //       "createdAt": "2016-09-26T23:46:21.718Z",
  //       "updatedAt": "2016-09-26T23:46:21.718Z",
  //       "photoId": 1,
  //       "userId": 1
  //     }
  //   },
  //   {
  //     "id": 2,
  //     "info": "something info2",
  //     "url": "www.google.com",
  //     "createdAt": "2016-09-26T23:46:54.346Z",
  //     "updatedAt": "2016-09-26T23:46:54.346Z",
  //     "placeId": 1,
  //     "favorites": {
  //       "createdAt": "2016-09-26T23:47:06.095Z",
  //       "updatedAt": "2016-09-26T23:47:06.095Z",
  //       "photoId": 2,
  //       "userId": 1
  //     }
  //   }
  // ]