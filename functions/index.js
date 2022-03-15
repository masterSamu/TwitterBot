require("dotenv").config();
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const twitter = require("./utils/twitter/twitter");
const sport = require("./utils/sportsdata/sportsdata");
const tweet = async () => {
  const data = await sport.getData();
  if (data) {
    twitter.tweet(data);
  }
  console.log(data)
};



exports.tweet = functions.https.onRequest(async (req, res) => {
    tweet();
})

exports.tweetDaily = functions.pubsub
  .schedule("every day 9:00")
  .timeZone("Europe/Helsinki")
  .onRun(async () => {
    tweet();
  });
