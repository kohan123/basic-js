const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
 if (!Array.isArray(members)) {
   return false; 
   } else {
     return members.map(curr => {
     if (typeof curr === "string") {
       return curr.trim()[0].toUpperCase();
     } else {
       return null;
     }
     }).filter(el => el !== null).sort().join("");
   }
 };

