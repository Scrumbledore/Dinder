var userHandler = require('../handlers/userHandler.js');
var photoHandler = require('../handlers/photoHandler.js');
var authHandler = require('../handlers/authHandler.js');

module.exports = function (app, express) {
  // this is root entry - only used for verify server, not in production ap
  app.get('/', function (req, res) {
    console.log('hit');
    res.json({
      message: 'hello, world v2.8'
    });
  });

  // for getting favorited pictures for a userid
  app.get('/api/favorites/:userid', userHandler.getFavorites);

  // for recording a favorite for a userid (since it's post we can technical pass in body if we want)
  app.post('/api/favorites/:userid/:pictureid', userHandler.saveFavorite);

  // for getting recommendations for a user at a given loc
  app.get('/api/recommendations/:userid/:loc', userHandler.getRecommendations);

  // for getting pictures of food for user to swipe on
  app.get('/api/photo/:userid/:loc', photoHandler.getPhotos);

  // vote yets on a picture (since it's post we can technical pass in body if we want)
  app.post('/api/yes/:userid/:pictureid', photoHandler.upVote);

  // vote no on a picture (since it's post we can technical pass in body if we want)
  app.post('/api/no/:userid/:pictureid', photoHandler.downVote);

  // signin
  app.post('/api/signin', authHandler.signIn);

  // signup
  app.post('/api/signup', authHandler.signUp);

  // more routes here
};