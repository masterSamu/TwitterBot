const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIRE_SERVICE_ACCOUNT_URL);
const config = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_DATABASE_URL,
  projectId: process.env.FIRE_PROJECT_ID,
  storageBucket: process.env.FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_APP_ID,
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(config);

const database = admin.database();

const readPlayerData = async () => {
  let returnData = null;
  await database
    .ref("/player")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        returnData = data;
      } else returnData = "no data available";
    })
    .catch((e) => {
      console.error(e);
      returnData = null;
    });
  return returnData;
};

const updatePlayerData = async (newData) => {
  await admin.database().ref("/player").update(newData);
};

module.exports = {
  readPlayerData,
  updatePlayerData,
};
