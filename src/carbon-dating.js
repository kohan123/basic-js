const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY= 15; 
const HALF_LIFE_PERIOD= 5730;
const LN2 = 0.693;
const APROXIMATION = 0.9914;

module.exports = function dateSample(sampleActivity) {
 const sampleNumber = Number(sampleActivity);
 if (String(sampleNumber) !== sampleActivity) {
   return false;
 } else if (sampleNumber <= 0 || sampleNumber > MODERN_ACTIVITY) {
   return false;
 } else {
   const K = LN2 / HALF_LIFE_PERIOD;
   return Math.round((Math.log(MODERN_ACTIVITY/sampleNumber) / APROXIMATION) / K);
 }
};
