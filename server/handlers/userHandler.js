var request = require('request');
var requestPromise = require('request-promise');
var User = require('../database/models/user.js');
var Photo = require('../database/models/photo.js');
var Place = require('../database/models/place.js');
var Category = require('../database/models/category.js');
var UserPhotos = require('../database/models/userPhotos.js');
var config = require('../../config.js');

var yelpOptions = function (options) {

  var search = typeof options === 'string' ? options
    : 'search?term='
    + options.keyword
    + '&latitude='
    + options.lat
    + '&longitude='
    + options.long;

  return {
    url: config.yelpRoot + 'businesses/' + search,
    headers: {
      'Authorization': 'Bearer ' + config.yelpKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
};

var findPlace = function (business) {
  return Place.findOne({
    where: {
      name: business.name
    }
  });
};

var newPlace = function (business) {
  return Place.create({
    lat: business.coordinates.latitude || 0,
    lon: business.coordinates.longitude || 0,
    name: business.name,
    address: business.location.address1,
    city: business.location.city,
    state: business.location.state,
    zip: business.location.zip_code,
    url: business.image_url,
    rating: business.rating,
    price: business.price
  });
};

var saveCategories = function (categories, placeId) {
  categories.forEach(function (category) {
    Category.findOne({
      where: {
        name: category.title
      }
    })
    .then(function (record) {
      if (!record) {
        Category.create({
          name: category.title,
          PlaceId: placeId
        });
      }
    })
    .catch(function (err) {
      throw err;
    });
  });
};

var findPhoto = function (url) {
  return Photo.findOne({
    where: {
      url: url
    }
  });
};

var newPhoto = function (url, placeId) {
  return Photo.create({
    url: url,
    PlaceId: placeId
  });
};

module.exports = {

  getPhotos: function (req, res) {

    var photos = [];

    var request = {
      keyword: req.params.query,
      lat: req.params.lat,
      long: req.params.long
    };

    requestPromise(yelpOptions(request))
    .then(function(data) {
      return JSON.parse(data).businesses;
    })
    .then(function(businesses) {
      businesses.forEach(function(business, bCount) {
        findPlace(business)
        .then(function(record) {
          if (!record) {
            return newPlace(business);
          } else {
            return record;
          }
        })
        .then(function (place) {
          saveCategories(business.categories, place.id);
          requestPromise(yelpOptions(business.id))
          .then(function (data) {
            return JSON.parse(data).photos;
          })
          .then(function (images) {
            images.forEach(function (url, pCount) {
              findPhoto(url)
              .then(function (record) {
                if (!record) {
                  return newPhoto(url, place.id);
                } else {
                  return record;
                }
              })
              .then(function (image) {
                photos.push(image.toJSON());
                if (bCount + 1 === businesses.length
                  && pCount + 1 === images.length) {
                  res.json(photos);
                }
              });
            });
          });
        });
      });
    })
    .catch(function (err) {
      throw err;
    });
  },

  getFavorites: function (req, res) {
    User.findOne({
      where: {
        id: req.userId
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
    var recData = [{
      name: 'Molinari Delicatessen',
      address: '373 Columbus Ave ',
      city: 'San Francisco',
      state: 'CA',
      url: 'https://s3-media3.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg',
      zip: 94103,
      rating: 4.5,
      price: '$$',
      lat: 37.7776799,
      long: -122.40709
    }, {
      name: 'Molinari Delicatessen2',
      address: '373 Columbus Ave ',
      city: 'San Francisco',
      state: 'CA',
      url: 'https://s3-media3.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg',
      zip: 94103,
      rating: 1,
      price: '$',
      lat: 37.7776799,
      long: -122.40709
    }];
    // preparing list of coords to pass to maps api
    var destArr = [];
    recData.forEach(function(rec) {
      destArr.push(rec.lat + '%2C' + rec.long);
    });
    var destStr = destArr.join('%7C');
    // actual request to maps api
    requestPromise('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + req.params.lat + ',' + req.params.long + '&destinations=' + destStr + '&key=' + config.MAPS_KEY)
    // combine original data with new distance values
    .then(function(result) {
      recData.map(function(rec, idx) {
        rec.dist = JSON.parse(result).rows[0].elements[idx].distance.text;
      });
      return recData;
    })
    .then(function(finalData) {
      res.status(201).send(finalData);
    });
  }
};