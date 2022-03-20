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
  const strDate = now.getUTCDate() -1;
  const strYesterday =
    now.getUTCFullYear() + "-" + strMonth + "-" + strDate;
  return strYesterday;
};

module.exports = { getTodayString };
