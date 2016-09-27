var Photo = require('../database/models/photo.js');
var UserPhotos = require('../database/models/userPhotos.js');

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getPhotos: function (req, res) {
    var userId = req.params.userid;
    var location = req.params.loc;
    console.log('getPhotos for', userId, 'at', location);
  },

  voteYes: function (req, res) {
    UserPhotos.update({
      like: true
    }, {
      where: {
        UserId: req.params.userid,
        PhotoId: req.params.photoid
      }
    })
    .then(function (conf) {
      res.json(conf);
    })
    .catch(function (err) {
      throw err;
    });
  },

  voteNo: function (req, res) {
    UserPhotos.update({
      like: false
    }, {
      where: {
        UserId: req.params.userid,
        PhotoId: req.params.photoid
      }
    })
    .then(function (conf) {
      res.json(conf);
    })
    .catch(function (err) {
      throw err;
    });
  }
};