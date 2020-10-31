const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
 const turns = Math.pow(2, disksNumber) - 1;
 const speedPerSecond = turnsSpeed / 3600;
 const seconds = Math.floor(turns / speedPerSecond);
 return {turns, seconds};
};
