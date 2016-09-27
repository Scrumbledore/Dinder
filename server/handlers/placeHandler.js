var Place = require('../database/models/place.js');

module.exports = {

  //Example data
  // [ 'eden-plaza-cafe-san-francisco',
    // { lat: 37.7845159579632,
    //   lon: -122.395666837692,
    //   name: 'Eden Plaza Cafe',
    //   address: '600 Harrison St',
    //   city: 'San Francisco',
    //   state: 'CA',
    //   url: 'https://s3-media1.fl.yelpcdn.com/bphoto/zvnkqjGhRhw2ntWb4ngpPw/o.jpg' } ]

  createPlace: function (req, res) {
    Place.create({
      lat: req.params.lat,
      lon: req.params.lon,
      name: req.params.name,
      address: req.params.address,
      city: req.params.city,
      state: req.params.state,
      url: req.params.url
    }).then(function(newPlace) {
      res.json(newPlace);
    });

    console.log('I fired !!!');
  }


};