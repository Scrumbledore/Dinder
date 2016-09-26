var Sequelize = require('sequelize');
var user = require('./models/user.js');
var place = require('./models/place.js');
var photo = require('./models/photo.js');

module.exports = function (connection) {

  var userPhotos = connection.define('userPhotos', {
    like: Sequelize.BOOLEAN
    favorite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  user.belongsToMany(photo, {
    through: userPhotos
  });
  photo.belongsToMany(user, {
    through: userPhotos
  });

  var userRatings = connection.define('userRatings', {
    rating: Sequelize.INTEGER
  });
  user.belongsToMany(place, {
    through: userRatings
  });
  place.belongsToMany(user, {
    through: userRatings
  });

  place.hasMany(photo);
};