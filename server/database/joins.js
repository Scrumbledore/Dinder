var Sequelize = require('sequelize');
var User = require('./models/user.js');
var Place = require('./models/place.js');
var Photo = require('./models/photo.js');


module.exports = function (connection) {

  var userPhotos = connection.define('userPhotos', {
    like: Sequelize.BOOLEAN,
    favorite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  User.belongsToMany(Photo, {
    through: userPhotos
  });
  Photo.belongsToMany(User, {
    through: userPhotos
  });

  var userRatings = connection.define('userRatings', {
    rating: Sequelize.INTEGER
  });
  User.belongsToMany(Place, {
    through: userRatings
  });
  Place.belongsToMany(User, {
    through: userRatings
  });

  Place.hasMany(Photo);
};