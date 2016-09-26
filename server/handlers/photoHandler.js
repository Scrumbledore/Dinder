var photo = require('../database/models/photo.js');

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getPhotos: function (req, res) {
    var userId = req.params.userid;
    var location = req.params.loc;
    console.log('getPhotos for', userId, 'at', location);
  },

  voteYes: function (req, res) {
    var userId = req.params.userid;
    var photoId = req.params.photoid;
    console.log('swipe right for', photoId, 'by', userId);

    photo.findOne({
      where: {
        id: photoId
      }
    })
    .then(function (foundPhoto) {
      if (foundPhoto) {
        user.findOne({
          where: {
            id: userId
          }
        })
        .then(function (foundUser) {
          if (foundUser) {
            foundPhoto.addVoter(foundUser, {
              like: true
            });
          } else {
            throw new Error('no matching user record for id', userId);
          }
        });
      } else {
        throw new Error('no matching photo record for id', photoId);
      }
    })
    .catch(function (err) {
      throw err;
    });
  },

  voteNo: function (req, res) {
    var userId = req.params.userid;
    var photoId = req.params.photoid;
    console.log('swipe left for', photoId, 'by', userId);

    photo.findOne({
      where: {
        id: photoId
      }
    })
    .then(function (foundPhoto) {
      if (foundPhoto) {
        user.findOne({
          where: {
            id: userId
          }
        })
        .then(function (foundUser) {
          if (foundUser) {
            foundPhoto.addVoter(foundUser, {
              like: false
            });
          } else {
            throw new Error('no matching user record for id', userId);
          }
        });
      } else {
        throw new Error('no matching photo record for id', photoId);
      }
    })
    .catch(function (err) {
      throw err;
    });
  }
};