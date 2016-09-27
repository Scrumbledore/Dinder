var User = require('./models/user.js');
var Place = require('./models/place.js');
var Photo = require('./models/photo.js');
var UserPhotos = require('./models/userPhotos.js');
var UserRatings = require('./models/userRatings.js');


module.exports = function (connection) {

  User.belongsToMany(Photo, {
    through: UserPhotos
  });

  Photo.belongsToMany(User, {
    through: UserPhotos
  });

  User.belongsToMany(Place, {
    through: UserRatings
  });

  Place.belongsToMany(User, {
    through: UserRatings
  });

  Place.hasMany(Photo);
};