var User = require("../database/models/user.js");

module.exports = {

  // most of the time data is passed in via URL (reference routes.js)
  // unless explicitly implied no call require data to be in a specific format outside of URL

  getFavorites: function (req, res) {
    var userId = req.params.id;
    // something here
  },

  saveFavorite: function (req, res) {
    var userId = req.params.id;
    var pictureId = req.params.pictureid;
    // something here
  }

}