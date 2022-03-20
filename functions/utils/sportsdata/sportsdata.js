const dates = require("../helpers/formatdates");
const fdClientModule = require("fantasydata-node-client");
const keys = {
  NHLv3StatsClient: process.env.SPORTSDATA_API_KEY,
};
const FantasyDataClient = new fdClientModule(keys);
const playerId = 30003131; // id for Patrik Laine

// Adjustments for some statistics, divide statistic with this value
const adjustmentForStatistic = 1.466;
const yesterday = dates.getTodayString();


const getData = async () =>
  FantasyDataClient.NHLv3StatsClient.getPlayerGameStatsByPlayerPromise(
    yesterday,
    playerId
  )
    .then((response) => JSON.parse(response))
    .then((data) => {
      let textToReturn = "";
      if (data) {
        const name = data.Name.replace(/\s/g, "");
        const goals = Math.round(data.Goals / adjustmentForStatistic);
        const assists = Math.round(data.Assists / adjustmentForStatistic);
        const nameHashtag = `#${name}`;
        const opponentHashtag = `#${data.Opponent}`;

        const games = data.Games;
        if (games > 0) {
          textToReturn = `${nameHashtag} scored ${goals}+${assists} against ${opponentHashtag}`;
        } else {
          textToReturn = `${nameHashtag} did not play today against ${opponentHashtag}`;
        }
      }
      return textToReturn;
    })
    .catch((e) => {
      return `@BlueJacketsNHL and @PatrikLaine29 did not play last night. Stay tuned for updates.`;
    });

module.exports = {
  getData,
};
