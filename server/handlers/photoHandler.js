var Photo = require('../database/models/photo.js');

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getPhotos: function (req, res) {
    var userId = req.params.userid;
    var location = req.params.loc;
    // something here
    console.log('getPhotos for', userId, 'at', location);
  },

  upVote: function (req, res) {
    var userId = req.params.userid;
    var pictureId = req.params.pictureid;
    // something here
    console.log('swipe right for', pictureId, 'by', userId);
  },

  downVote: function (req, res) {
    var userId = req.params.userid;
    var pictureId = req.params.pictureid;
    // something here
    console.log('swipe left for', pictureId, 'by', userId);
  }
  

};