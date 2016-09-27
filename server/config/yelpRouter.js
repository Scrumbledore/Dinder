var request = require('request');
var rp = require('request-promise');
var Place = require('../database/models/place.js');
var config = require('../../config.js');

<<<<<<< 8e0fa879c7d8498c58e1b2c6d83c72bee8c08b56
/*
Yelp docs if you want to test different queries:
https://www.yelp.com/developers/documentation/v3/get_started

To test functionality run
node server/config/yelpRouter.js
*/

// Testing until we have database targets. Data structure is:
// [id,...] ... is however images provided. stuff1 is targeting local busineses with a generic search only 1 is provided. Stuff2 is querying the particular business to get all images.
var stuff1 = [];
var stuff2 = [];

/*
var place = db.define('place', {
  lat: Sequelize.STRING,
  lon: Sequelize.STRING,
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  url: Sequelize.STRING
});

var photo = db.define('photo', {
  info: Sequelize.STRING,
  url: Sequelize.STRNG
});

*/

=======
var stuff1 = [];
var stuff2 = [];

module.exports = {
>>>>>>> Exported yelp handlers.
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
          console.log(business,'$$$$')
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