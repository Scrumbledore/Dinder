var request = require('request');
var rp = require('request-promise');
var Places = require('../database/models/place.js');
var Photo = require('../database/models/photo.js');
var config = require('../../config.js');

var stuff1 = [];
var stuff2 = [];

module.exports = {
//hardcoding apiKey until better solution / deployment
  yelpOptions: function (query, branch) {
  //default for testing.
    query = query || 'search?term=delis&latitude=37.786882&longitude=-122.399972';
    branch = branch || '';

    var options = {
      url: config.yelpRoot + branch + query,
      headers: {
        'Authorization': 'Bearer ' + config.yelpKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    console.log(options);
    return options;
  },

//Once we have all local businesses we have an array of ID's to query the business to get all pictures Yelp.yelpOptions(business[0], 'businesses/'))
  allImages: function (businessID, options) {
    businessID.forEach(function(business) {
      rp(options)
       .then(function(item) {
         var info = JSON.parse(item);
         var newArray = [info.id];
         if (info.photos.length > 0) {

           info.photos.forEach(function(picture) {
             Photo.create({
               info: '',
               url: picture
             });
           });
         }

         stuff2.push(newArray);
         console.log(newArray, info.photos);
       })
       .then(console.log(stuff1, stuff2));
    });
  },

//Find initial businesses and business pictures. yelpOptions(null, 'businesses/')
  someImages: function(options) {
    return rp(options)
      .then(function(data) {
        return JSON.parse(data);
      })
      .then(function(data) {
        var test = [];
        data.businesses.map(function(business) {
          Places.findOne({
            where: {name: business.name}
          }).then(function(place) {
            if (place) {
          // don't make duplicate place.
            } else {
              Places.create({
                lat: business.coordinates.latitude || 0,
                lon: business.coordinates.longitude || 0,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                url: business.image_url
              }).then(function(newPlace) {
                //place created
              });
            }
          });
          test.push({
            lat: business.coordinates.latitude || 0,
            lon: business.coordinates.longitude || 0,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            url: business.image_url
          });
        });
        return test;
      });
  }
};