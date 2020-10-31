const CustomError = require("../extensions/custom-error");

function getContinuSequence(i) {
  if (i - 1 < 0) {
    return 0;
  } else {
    return i - 1;
  }
}

module.exports = function transform(arr) {
 if (Array.isArray(arr) !== true) {
   throw new Error('Not an Array');
 } else {
   let res = [...arr];
   let hasSeq = true;
   let continueIndex = 0;
   while (hasSeq === true) {
     hasSeq = false;
     for (let i = continueIndex; i < res.length; i++) {
      if (res[i] === "--discard-next") {
        continueIndex = getContinuSequence(i);
        if (res[i + 1] !== undefined) {
          res[i + 1] = "-empty";
        }
        res[i] = null;
        hasSeq = true;
        break;
      } else if (res[i] === "--discard-prev") {
        continueIndex = getContinuSequence(i);
        if (res[i - 1] !== undefined) {
          res[i - 1] = "-empty";
        }
        res[i] = null;
        hasSeq = true;
        break;
      } else if (res[i] === "--double-next") {
        continueIndex = getContinuSequence(i);
        if (res[i + 1] !== undefined) {
          res[i] = res[i + 1];
        } else {
          res[i] = null;
        }
        hasSeq = true;
        break;
      } else if (res[i] === "--double-prev") {
        continueIndex = getContinuSequence(i);
        if (res[i - 1] !== undefined) {
          res[i] = res[i - 1];
      } else {
        res[i] = null;
      }
      hasSeq = true;
      break;
     }
   }
   res = res.filter(el => el !== null);
 }
 return res.filter(el => el !== "-empty");
}
};
