const { TwitterApi } = require("twitter-api-v2");
const config = require("./config.js");

const client = new TwitterApi(config);

async function tweet(text) {
  try {
    if (text) {
      const { data: createdTweet } = await client.v2.tweet(text);
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = { tweet };
