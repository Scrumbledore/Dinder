var User = require('../database/models/user.js');
var Photo = require('../database/models/photo.js');
var Sequelize = require('sequelize');
// var joins = require('../database/joins.js')

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getFavorites: function (req, res) {
    var userId = req.params.userid;
    User.findOne({
      where: {id: userId}
    }).then(
      function(user) {
        user.getPhotos().then(
          function(favorites) {
            res.json(favorites).send();
          }
        );
      }
    );
  },

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

  saveFavorite: function (req, res) {
    var userId = req.params.userid;
    var pictureId = req.params.pictureid;
    User.findOne({
      where: {id: userId}
    }).then(
      function(user) {
        user.addPhoto(pictureId).then(
          function(pictureId) {
            console.log('saved', pictureId, 'for', userId);
            res.status(201).send();
          }
        );
      }
    );
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
              res.status(201).send();
            }
          );
        }
      );
    } else {
      // search by zip
    }
    // 
    console.log('getRecommendations for', userId, 'at', location);
  }

};