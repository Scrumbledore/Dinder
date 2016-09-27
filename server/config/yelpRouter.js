var request = require('request');
var rp = require('request-promise');
var Place = require('../database/models/place.js');
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
             newArray.push({
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
    var test = [];
    rp(options)
      .then(function(data) {
        return JSON.parse(data);
      })
      .then(function(data) {
        data.businesses.forEach(function(business) {
          Place.findOne({
            where: {name: business.name}
          }).then(function(place) {
            if (place) {
          // responds with user exists

            } else {
          // right now just creates a user, we don't have auth decided
              Place.create({
                lat: business.coordinates.latitude || 0,
                lon: business.coordinates.longitude || 0,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                url: business.image_url
              }).then(function(newPlace) {
              // responds with new user atm
                //res.json(newPlace);
              });
            }
          });
          console.log(test);
        });
        return test;
      });
  }
};