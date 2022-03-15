const dates = require("../helpers/formatdates");
const fdClientModule = require("fantasydata-node-client");
const keys = {
  NHLv3StatsClient: process.env.SPORTSDATA_API_KEY,
};
const FantasyDataClient = new fdClientModule(keys);
const playerId = 30003131; // id for Patrik Laine

// Adjustments for some statistics, divide statistic with this value
const adjustmentForStatistic = 1.466;
const today = dates.getTodayString();

const getData = async () =>
  FantasyDataClient.NHLv3StatsClient.getPlayerGameStatsByDatePromise(today)
    .then((response) => {
      const data = JSON.parse(response);
      const player = data.find((item) => item.PlayerID === playerId);
      let text = "";
      if (player) {
        let name = player.Name.replace(/\s/g, "");
        let goals = Math.round(player.Goals / adjustmentForStatistic);
        if (goals > 0) {
          if (goals === 1) {
            text = "#" + name + " scored a goal!";
          } else if (goals > 1) {
            text = "#" + name + " scored " + goals + " goals!";
          }
        }
      } else {
        text = "No goals for #PatrikLaine today! Stay tuned, he may score tomorrow!";
      }
      return text;
    })
    .catch((e) => {
      return null;
    });

module.exports = {
  getData,
};
