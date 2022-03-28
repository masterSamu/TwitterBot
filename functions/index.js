require("dotenv").config();
//const functions = require("firebase-functions");

const twitter = require("./utils/twitter/twitter");
const hockey = require("./utils/sportsdata/hockeydata");
const tweet = async () => {
  const data = await hockey.getTweetText();
  if (data) {
    console.log(data)
    //twitter.tweet(data);
  }
};
tweet();
/*
// Firebase function call
exports.tweetDaily = functions.pubsub
  .schedule("every day 9:00")
  .timeZone("Europe/Helsinki")
  .onRun(async () => {
    tweet();
  });
*/