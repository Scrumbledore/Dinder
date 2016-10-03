var secrets;

if (process.env.NODE_ENV !== 'production') {
  secrets = require('./secrets.json');
}

module.exports = {
  apiRoot: 'http://ec2-54-187-168-239.us-west-2.compute.amazonaws.com',
  androidLocalRoot: 'http://10.0.2.2',
  iosLocalRoot: 'http://localhost',
  port: 1337,
  yelpRoot: 'https://api.yelp.com/v3/',
  yelpKey: process.env.YELPKEY || secrets.yelpKey,
  DB_NAME: 'dinder',
  DB_ADDRESS_PORT: process.env.DB_ADDRESS_PORT || secrets.DB_ADDRESS_PORT,
  DB_USERNAME: process.env.DB_USERNAME || secrets.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD || secrets.DB_PASSWORD,
  DB_ADDRESS_HOST: process.env.DB_ADDRESS_HOST || secrets.DB_ADDRESS_HOST,
  JWT_SECRET: secrets.JWT_SECRET,
  S3_ACCESS_KEY: secrets.S3_ACCESS_KEY,
  S3_SECRET_KEY: secrets.S3_SECRET_KEY,
  S3_BUCKET: secrets.S3_BUCKET
};
