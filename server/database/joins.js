var Sequelize = require('sequelize');
var db = require('./database.js');

var user = require('./models/user.js');
var place = require('./models/place.js');
var photo = require('./models/photo.js');

var vote = db.define('vote', {
  rating: Sequelize.INTEGER
});

// Provides for User.addPhoto(Photo, rating)
photo.belongsToMany(user, {
  through: Vote
});

// Provides for Photo.getUsers()
user.belongsToMany(photo, {
  through: Vote
});

// join users and photos in the table "favorites"
//
photo.belongsToMany(user, {
  through: 'favorites'
});

user.belongsToMany(photo, {
  through: 'favorites'
});

// Provides for Place.getPhotos(), adds 'PlaceId' to Photos
place.hasMany(photo);