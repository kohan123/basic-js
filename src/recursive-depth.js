const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  constructor () {
    this.depth = 1;
  }
  calculateDepth(arr,level = 0) {
    if (!Array.isArray(arr)) {
      return level;
    } else if (arr.length === 0) {
      return level + 1;
    } else {
      const allLevels = [];
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        const deepLevel = this.calculateDepth(el, level + 1);
        allLevels.push(deepLevel);
      }
      return Math.max(...allLevels);
    }
  }
};