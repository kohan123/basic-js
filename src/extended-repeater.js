const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let adition = "";
  if (options && options.addition !== undefined) {
    adition = Array(options.additionRepeatTimes || 1).fill(String(options.addition)).join(options.additionSeparator || "|");
  }

  const mainString = Array(options.repeatTimes || 1).fill(String(str + adition)).join(options.separator || "+");
  return mainString;
};
  