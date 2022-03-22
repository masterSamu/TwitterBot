const axios = require("axios");

const url = "https://statsapi.web.nhl.com/";
const endpoint =
  "api/v1/people/8479339/stats?stats=statsSingleSeason&season=20212022";

const endpointForPlayerStats = url + endpoint;

const getCurrentStatisticsForPlayer = async () => {
  let returnData = null;
  await axios
    .get(endpointForPlayerStats)
    .then((response) => {
      const data = response.data;
      returnData = data.stats[0].splits[0].stat;
    })
    .catch((e) => {
      console.log(e);
      returnData = "error";
    });
  return returnData;
};

const calculateLastGameStatistics = async () => {
  const database = require("../firebase/database");
  const oldStatistics = await database.readPlayerData();
  const newStatistics = await getCurrentStatisticsForPlayer();

  if (oldStatistics && newStatistics) {
    const goalDifference = newStatistics.goals - oldStatistics.goals;
    const assistsDifference = newStatistics.assists - oldStatistics.assists;
    const gamesDifference = newStatistics.assists - oldStatistics.assists;
    const shotsDifference = newStatistics.shots - oldStatistics.shots;
    const dataDifferenceObject = {
      firstname: oldStatistics.firstname,
      lastname: oldStatistics.lastname,
      id: oldStatistics.id,
      goals: 0,
      assists: 0,
      shots: 0,
    };

    if (goalDifference > 0) dataDifferenceObject.goals = goalDifference;
    if (assistsDifference > 0) dataDifferenceObject.assists = assistsDifference;
    if (gamesDifference > 0) dataDifferenceObject.games = gamesDifference;
    if (shotsDifference > 0) dataDifferenceObject.shots = shotsDifference;

    const newDataObjectForDatabase = {
      goals: newStatistics.goals,
      assists: newStatistics.assists,
      shots: newStatistics.shots,
      games: newStatistics.games,
    };

    // Update database if player has more games than before.
    if (newDataObjectForDatabase.games > oldStatistics.games) {
      await database.updatePlayerData(newDataObjectForDatabase);
    }
    return dataDifferenceObject;
  } else {
    return null;
  }
};

const getTweetText = async () => {
  const data = await calculateLastGameStatistics();
  let tweetText = "";
  const nameHashtag = `#${data.firstname}${data.lastname}`;
  if (data.games > 0) {
    tweetText = `${nameHashtag} stats from last night ${data.goals}+${data.assists} and ${data.shots} shots on goal!`;
  } else {
    return `@PatrikLaine29 did not play last night. Stay tuned for updates.`;
  }
  return tweetText;
};

module.exports = {
  getCurrentStatisticsForPlayer,
  calculateLastGameStatistics,
  getTweetText,
};
