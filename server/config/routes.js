var userHandler = require("../handlers/userHandler.js")

module.exports = function (app, express) {
  // this is root entry - only used for verify server, not in production ap
  app.get('/', function (req, res) {
    console.log('hit');
    res.json({
      message: 'hello, world v2.5'
    });
  });

  // for getting favorited pictures for a userid
  app.get("/api/favorites/:userid", userHandler.getFavorites);

  // for recording a favorite for a userid (since it's post we can technical pass in body if we want)
  app.post("/api/favorites/:userid/:pictureid", userHandler.saveFavorite);

  // for getting recommendations for a user at a given loc
  app.get("/api/recommendations/:userid/:loc", function (req, res) {
    // sometihng here
  });

  // for getting pictures of food for user to swipe on
  app.get("/api/food/:userid/:loc", function (req, res) {
    // something here
  });

  // vote yet on a picture (since it's post we can technical pass in body if we want)
  app.post("/api/yes/:userid/:pictuerid", function (req, res) {
    // something here
  });

  // vote no on a picture (since it's post we can technical pass in body if we want)
  app.post("/api/no/:userid/:pictureid", function (req, res) {
    // something here
  });

  // signin
  app.post("/api/signin", function (req, res) {
    // something here
  })

  // signup
  app.post("/api/signup", function (req, res) {
    // something here
  })

  // more routes here
};