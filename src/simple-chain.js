const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (value === undefined) {
      this.chain.push("( )");
    } else {
      this.chain.push(`( ${value} )`);
    }
    return chainMaker;
  },
  removeLink(position) {
   if (!Number.isInteger(position)) {
     this.chain = [];
     throw new Error("Invalid Position");
   } else {
     this.chain = this.chain.filter((_, index) => {
      return (index + 1) !== position;
     });
   }
   return chainMaker;
  },
  reverseChain() {
    this.chain = this.chain.reverse();
    return chainMaker;
  },
  finishChain() {
    const res = this.chain.join("~~");
    this.chain = [];
    return res;
  }
};

module.exports = chainMaker;
