var userHandler = require('../handlers/userHandler.js');
var photoHandler = require('../handlers/photoHandler.js');
var authHandler = require('../handlers/authHandler.js');

module.exports = function (app, express) {
  // this is root entry - only used for verify server, not in production app
  app.get('/', function (req, res) {
    res.json({
      message: 'hello, world v3.0.1'
    });
  });
  //testing jwt auth
  // app.get('/', requireAuth, function(req, res) {
  //   res.json({ hi: 'there' });
  // });
  
  // for getting favorited pictures for a userid
  app.get('/api/favorites/:userid', userHandler.getFavorites);

  app.post('/api/favorite/:userid/:photoid', photoHandler.favorite);
  app.post('/api/unfavorite/:userid/:photoid', photoHandler.unFavorite);

  // for getting recommendations for a user at a given loc
  app.get('/api/recommendations/:userid/:loc', userHandler.getRecommendations);

  // for getting pictures of food for user to swipe on
  app.get('/api/photo/:userid/:zip/:lat/:long', userHandler.getPhotos);

  // vote yets on a photo (since it's post we can technical pass in body if we want)
  app.post('/api/yes/:userid/:photoid', photoHandler.voteYes);

  // vote no on a photo (since it's post we can technical pass in body if we want)
  app.post('/api/no/:userid/:photoid', photoHandler.voteNo);

  // signin
  //w passport auth:
  //app.post('/api/signin', requireAuth, authHandler.SignIn);
  app.post('/api/signin', authHandler.signIn);

  // signup
  app.post('/api/signup', authHandler.signUp);

  // more routes here
};