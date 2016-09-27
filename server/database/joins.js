var Sequelize = require('sequelize');
var User = require('./models/user.js');
var Place = require('./models/place.js');
var Photo = require('./models/photo.js');


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