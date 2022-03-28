const { TwitterApi } = require("twitter-api-v2");
const config = require("../twitter/config");

const client = new TwitterApi(config);

const downloadFileFromURL = async (url) => {
  const videoObject = {
    originalUrl: url,
    videoMeta: {
      height: 123,
      width: 234,
      size: 9031815,
      duration: 39,
      mimeType: "video/mp4",
    },
  };
  const status = {
    status: "tweet text",
    media_ids: null,
  };

  client.v2
    .post("media/upload", { media: videoObject })
    .then((response, media) => {
      console.log(response.statusCode);
      console.log(media.media_id_string);
      status.media_ids = media_id_string;
    })
    .catch((e) => {
      console.error(e);
    });

  client.v2
    .post("statuses/update", status)
    .then((response) => {
      console.log("post statuscode: " + response.statusCode);
    })
    .catch((e) => {
      console.log(e);
    });
};

const uploadVideo = async (url) => {
  try {
    const http = require("https"); // or 'https' for https:// URLs
    const fs = require("fs");
    
    // Download video file
    const file = fs.createWriteStream("./video.mp4");
    const request = http.get(url, function (response) {
      response.pipe(file);
    });

    // Remove downloaded file
    fs.unlinkSync("./video.mp4")
    /*
    const mediaIdVideo = await client.v1.uploadMedia("./video.mp4", { type: "longmp4" });
    console.log(mediaIdVideo);
    await client.v2.tweet("My tweet text", { media_ids: mediaIdVideo });
    console.log("video tweeted");*/
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  downloadFileFromURL,
  uploadVideo,
};
