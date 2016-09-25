var Sequelize = require('sequelize');
var db = require('./database.js');
var user = require('./models/user.js');
var place = require('./models/place.js');
var photo = require('./models/photo.js');

// define a join table for photo votes
var vote = db.define('vote', {
  rating: Sequelize.INTEGER
});
// add userId to vote schema
user.belongsToMany(photo, {
  through: Vote
});
// add photoId to vote schema
photo.belongsToMany(user, {
  through: vote
});

// define a join table for photo favorites
photo.belongsToMany(user, {
  through: 'favorites'
});
user.belongsToMany(photo, {
  through: 'favorites'
});

// define a join table for place ratings
var placeRating = db.define('placeRating', {
  rating: Sequelize.INTEGER
});
// add userId to placeRating schema
user.belongsToMany(place, {
  through: placeRating
});
// add placeId to placeRating schema
place.belongsToMany(user, {
  through: placeRating
});

// link many photos with one place
// adds placeId to photo schema
// provides place.getPhotos() and place.setPhotos()
place.hasMany(photo);