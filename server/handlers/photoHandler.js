var Photo = require('../database/models/photo.js');
var UserPhotos = require('../database/models/userPhotos.js');

var getUserPhoto = function (UserId, PhotoId) {
  return UserPhotos.findOne({
    where: {
      UserId: UserId,
      PhotoId: PhotoId
    }
  });
};

var modUserPhoto = function (UserId, PhotoId, like) {
  return UserPhotos.update({
    like: like
  }, {
    where: {
      UserId: UserId,
      PhotoId: PhotoId
    }
  });
};

var newUserPhoto = function (UserId, PhotoId, like) {
  return UserPhotos.create({
    UserId: UserId,
    PhotoId: PhotoId,
    like: like
  });
};

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getPhotos: function (req, res) {
    var userId = req.params.userid;
    var location = req.params.loc;
    console.log('getPhotos for', userId, 'at', location);
  },

  voteYes: function (req, res) {
    var UserId = req.params.userid;
    var PhotoId = req.params.photoid;

    getUserPhoto(UserId, PhotoId)
    .then(function (record) {
      if (record) {
        modUserPhoto(UserId, PhotoId, true)
        .then(function () {
          res.sendStatus(200);
        });
      } else {
        newUserPhoto(UserId, PhotoId, true)
        .then(function () {
          res.sendStatus(201);
        })
      }
    })
    .catch(function (err) {
      throw err;
    });
  },

  voteNo: function (req, res) {
    var UserId = req.params.userid;
    var PhotoId = req.params.photoid;

    getUserPhoto(UserId, PhotoId)
    .then(function (record) {
      if (record) {
        modUserPhoto(UserId, PhotoId, false)
        .then(function () {
          res.sendStatus(200);
        });
      } else {
        newUserPhoto(UserId, PhotoId, false)
        .then(function () {
          res.sendStatus(201);
        })
      }
    })
    .catch(function (err) {
      throw err;
    });
  }
};