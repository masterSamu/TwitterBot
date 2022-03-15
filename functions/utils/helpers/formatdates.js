let strMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getTodayString = () => {
  const now = new Date();
  const strMonth = strMonths[now.getUTCMonth()];
  const strToday =
    now.getUTCFullYear() + "-" + strMonth + "-" + now.getUTCDate();
  return strToday;
};

module.exports = { getTodayString };
