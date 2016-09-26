var User = require('../database/models/user.js');

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getFavorites: function (req, res) {
    var userId = req.params.userid;
    // something here
    console.log('getFavorites for', userId);
  },

  saveFavorite: function (req, res) {
    var userId = req.params.userid;
    var pictureId = req.params.pictureid;
    // something here
    console.log('save', pictureId, 'for', userId);
  },

  getRecommendations: function (req, res) {
    var userId = req.params.userid;
    var location = req.params.loc;
    // somthing here
    console.log('getRecommendations for', userId, 'at', location);
  },



};