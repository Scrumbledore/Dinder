var Photo = require('../database/models/photo.js');
var UserPhotos = require('../database/models/userPhotos.js');

// get a reference to the relation, if it exists
var getUserPhoto = function (UserId, PhotoId) {
  return UserPhotos.findOne({
    where: {
      UserId: UserId,
      PhotoId: PhotoId
    }
  });
};

// update an existing like
var modLike = function (UserId, PhotoId, like) {
  return UserPhotos.update({
    like: like
  }, {
    where: {
      UserId: UserId,
      PhotoId: PhotoId
    }
  });
};

// create a new relation with a given like
var newLike = function (UserId, PhotoId, like) {
  return UserPhotos.create({
    UserId: UserId,
    PhotoId: PhotoId,
    like: like
  });
};

module.exports = {

  voteYes: function (req, res) {
    var UserId = req.params.userid;
    var PhotoId = req.params.photoid;

    getUserPhoto(UserId, PhotoId)
    .then(function (record) {
      if (record) {
        modLike(UserId, PhotoId, true)
        .then(function () {
          res.sendStatus(200);
        });
      } else {
        newLike(UserId, PhotoId, true)
        .then(function () {
          res.sendStatus(201);
        });
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
        modLike(UserId, PhotoId, false)
        .then(function () {
          res.sendStatus(200);
        });
      } else {
        newLike(UserId, PhotoId, false)
        .then(function () {
          res.sendStatus(201);
        });
      }
    })
    .catch(function (err) {
      throw err;
    });
  },

  favorite: function (req, res) {
    var UserId = req.params.userid;
    var PhotoId = req.params.photoid;
    getUserPhoto(UserId, PhotoId)
    .then(function (record) {
      // update an existing record as "favorited"
      if (record) {
        UserPhotos.update({
          favorite: true
        }, {
          where: {
            UserId: UserId,
            PhotoId: PhotoId
          }
        })
        .then(function () {
          res.sendStatus(200);
        });
      // create a new record as "favorited"
      } else {
        UserPhotos.create({
          UserId: UserId,
          PhotoId: PhotoId,
          favorite: true
        })
        .then(function () {
          res.sendStatus(201);
        });
      }
    })
    .catch(function (err) {
      throw err;
    });
  }
};