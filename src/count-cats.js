const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
 return matrix.reduce((acc, backyard) => {
   return acc + backyard.filter(place => place === "^^").length;
 }, 0);
};
