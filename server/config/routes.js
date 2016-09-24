module.exports = function (app, express) {
  app.get('/', function (req, res) {
    console.log('hit');
    res.json({
      message: 'hello, world v2.2'
    });
  });
};