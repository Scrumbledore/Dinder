var secrets;
if (process.env.NODE_ENV !== 'production') {
  secrets = require('./secrets.json');
}

module.exports = {
  apiRoot: 'https://fill_me_in',
  androidLocalRoot: 'http://10.0.2.2',
  iosLocalRoot: 'http://localhost',
  port: process.env.PORT || 1337,
  yelpRoot: 'https://api.yelp.com/v3/'
  yelpKey: process.env.YELPKEY || secrets.yelpKey
};
