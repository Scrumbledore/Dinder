var express = require('express');
var config = require('../config.js');
var connection = require('./database/database.js');
//var Place = require('./database/models/place.js');

var app = express();

require('./database/joins.js')(connection);
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
require('./database/joins.js')(connection);

app.set('port', config.port);

// nuke the database by passing {force: true} inside sync()
connection.sync().then(function () {
  app.listen(app.get('port'), function() {
    console.log('listening on port ', app.get('port'));
    // var req = {
    //   params :{ lat: 37.7845159579632,
    //   lon: -122.395666837692,
    //   name: 'Eden Plaza Cafe',
    //   address: '600 Harrison St',
    //   city: 'San Francisco',
    //   state: 'CA',
    //   url: 'https://s3-media1.fl.yelpcdn.com/bphoto/zvnkqjGhRhw2ntWb4ngpPw/o.jpg' }
    // }
    //   Place.create({
    //   lat: req.params.lat,
    //   lon: req.params.lon,
    //   name: req.params.name,
    //   address: req.params.address,
    //   city: req.params.city,
    //   state: req.params.state,
    //   url: req.params.url
    // }).then(function(newPlace) {
    //   console.log(newPlace);
    // });
  });
}).catch(function (err) {
  console.log(err);
});

module.exports.app = app;