
const { Twitter } = require('twitter-node-client');
const { format, isToday, isYesterday } = require('date-fns');

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const time = format(date, 'h:mm a');
  if (isToday(date)) {
    return `Today @ ${time}`;
  }
  if (isYesterday(date)) {
    return `Yesterday @ ${time}`;
  }
  return format(date, 'MMM DD @ HH:mm');
};

const formatTweet = (object) => {
  const { id, text } = object;
  const screenName = object.user.screen_name;
  const time = object.created_at;
  const date = formatDate(time);
  const url = `https://twitter.com/${screenName}/status/${id}`;

  return {
    url, text, date, time,
  };
};

const formatTweets = (data) => {
  const array = typeof data === 'string' ? JSON.parse(data) : data;
  return array.map(formatTweet);
};

module.exports = function getTweets() {
  return new Promise(((resolve, reject) => {
    const twitter = new Twitter({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
      callBackUrl: 'https://312development.com/twitter-oath',
    });
    twitter.getUserTimeline({ screen_name: process.env.TWITTER_USERNAME, count: '3' }, (error) => {
      reject(error);
    }, (success) => {
      const tweets = formatTweets(success);
      resolve(tweets);
    });
  })).catch((error) => {
    console.error(error);
  });
};
