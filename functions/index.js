require("dotenv").config();
const functions = require("firebase-functions");
/*const admin = require("firebase-admin");
admin.initializeApp();*/

const twitter = require("./utils/twitter/twitter");
const hockey = require("./utils/sportsdata/hockeydata");
const tweet = async () => {
  const data = await hockey.getTweetText();
  if (data) {
    twitter.tweet(data);
  }
};

// Firebase function call
exports.tweetDaily = functions.pubsub
  .schedule("every day 9:00")
  .timeZone("Europe/Helsinki")
  .onRun(async () => {
    tweet();
  });
