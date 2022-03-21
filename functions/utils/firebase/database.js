const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_URL);
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  credential: admin.credential.cert(serviceAccount),
};
admin.initializeApp(config);

const database = admin.database();

const readPlayerData = async () => {
  let returnData = null;
  await database
    .ref("/player")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        returnData = data;
      } else returnData = "no data available";
    })
    .catch((e) => {
      console.error(e);
      returnData = null;
    })
  return returnData;
};

module.exports = {
  readPlayerData,
};
