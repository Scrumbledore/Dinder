var request = require('request');
var rp = require('request-promise');

var config = require('../../config.js');

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


//hardcoding apiKey until better solution / deployment
var yelpOptions = function(query, branch) {
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
};

//Once we have all local businesses we have an array of ID's to query the business to get all pictures
var allImages = function(businessID) {
  businessID.forEach(business => {
    console.log(business);
    rp(yelpOptions(business[0], 'businesses/'))
      .then(item => {
        var info = JSON.parse(item);
        var newArray = [info.id].concat(info['photos']);

        stuff2.push(newArray);
        console.log(newArray, info['photos']);
      })
      .then(console.log(stuff1, stuff2));
  });
};

//Find initial businesses and business pictures.
rp(yelpOptions(null, 'businesses/'))
  .then(function(data) {
    var info = JSON.parse(data);
    info.businesses.forEach(business => { stuff1.push([business.id, business.image_url]); }
    );
    console.log(data, stuff1);
    return stuff1;
  })
 .then(function(items) {
   allImages(items);
 });
