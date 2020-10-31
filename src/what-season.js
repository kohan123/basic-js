const CustomError = require("../extensions/custom-error");

const SEASONS_MAP = {
  "winter": [0, 1, 11],
  "spring": [2, 3, 4],
  "summer": [5, 6, 7],
  "autumn": [8, 9, 10]
};

module.exports = function getSeason(date) {
 if (!date) {
   return "Unable to determine the time of year!";
 } else if (typeof date !== "object" || !date.getTime) {
   throw new Error("Shh! An enemy scout has lurked among the arguments that come into this function.");
 } else {
   try {
   const time = date.getTime();
 } catch (error) {
   throw new Error("Shh! An enemy scout has lurked among the arguments that come into this function.")
 }
 const month = date.getMonth();
 return Object.keys(SEASONS_MAP).find(season => {
   return SEASONS_MAP[season].includes(month);
 });
}
};
  
