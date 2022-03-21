const axios = require("axios");
const data = require("./utils/firebase/database");

const getPlayerData = async () => {
  const playerData = await data.readPlayerData();
  console.log(playerData);
  return playerData;
  process.exit();
};

const url = "https://statsapi.web.nhl.com/";
const endpoint =
  "api/v1/people/8479339/stats?stats=statsSingleSeason&season=20212022";

const endpointForPlayerStats = url + endpoint;

let realtimeStatisticsForPlayer = null;

const getCurrentStatisticsForPlayer = async () => {
  await axios
    .get(endpointForPlayerStats)
    .then((response) => {
      const data = response.data;
      return data.stats[0].splits[0].stat;
    })
    .catch((e) => {
      console.log(e);
      return "error";
    });
};

console.log(realtimeStatisticsForPlayer?.goals);

module.exports = {
  getCurrentStatisticsForPlayer,
};
