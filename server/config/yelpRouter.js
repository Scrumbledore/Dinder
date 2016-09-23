var request = require('request');
var rp = require('request-promise');

/*
Yelp docs if you want to test:
https://www.yelp.com/developers/documentation/v3/get_started
*/


// Testing until we have database targers
var stuff1 = [];
var stuff2 = [];


//hardcoding apiKey until better solution / deployment
function businessOptions (query){
  //default for testing.
  query = query || 'search?term=delis&latitude=37.786882&longitude=-122.399972';

  var options = {
    url: 'https://api.yelp.com/v3/businesses/' + query,
    headers: {
      'Authorization': 'Bearer tYT1p0QgELEBfOByFAia8jmaRnuw_mh79hru5lQTGJfwjLl-OAQ3lnOiEGc4iJvuMO_WiXOOqjhM0FRE0Jj4bw30_Subfgbl99QSfAcDpDvs35_Hwb_4mvpMu57kV3Yx',
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
  };

  return options;
}

//Once we have all local businesses we have an array of ID's to query the business to get all pictures
function allImages (businessID){
  businessID.forEach(business => {
    rp(businessOptions(business[0]))
     .then(item => {
      var info = JSON.parse(item);
      var newArray = [info.id].concat(info['photos']);

      stuff2.push(newArray);
      //console.log(newArray,info['photos']);
     });}
  )
}

//Find initial businesses and business pictures.
rp(businessOptions())
 .then(function(data){
  var info = JSON.parse(data);
   info.businesses.forEach(business =>
      {stuff1.push([business.id,business.image_url]);}
      )
   // console.log(data,stuff1);
    return stuff1;
 })
 .then(function(items){
   allImages(items);
 });