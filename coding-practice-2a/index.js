let addDays = require("date-fns/addDays");
module.exports = function (x) {
  let newDate = addDays(new Date(2020, 7, 22), x);
  return (
    newDate.getDate() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getFullYear()
  );
};
