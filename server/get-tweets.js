
const path = require('path');
const fs = require('fs');
const Twitter = require('twitter-node-client').Twitter;

if (fs.existsSync(path.resolve(__dirname, '../.env'))) {
  require('dotenv').config();
}

module.exports = function getTweets() {
  return new Promise(((resolve, reject) => {
    const twitter = new Twitter({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
      callBackUrl: 'https://312development.com/twitter-oath',
    });
    twitter.getUserTimeline({ screen_name: process.env.TWITTER_USERNAME, count: 3 }, (error) => {
      reject(error);
    }, (success) => {
      resolve(success);
    });
  })).catch((error) => {
    console.error(error);
  });
};
