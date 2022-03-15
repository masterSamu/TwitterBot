let strMonths=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const today = new Date();

const strMonth = strMonths[today.getUTCMonth()];

const formattedDate =
  today.getUTCFullYear() + "-" + strMonth + "-" + today.getUTCDate();

  console.log(formattedDate)