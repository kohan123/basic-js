const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect || false;
    this.cipherMatrix = VigenereCipheringMachine.createCipherMatrix();
  }
  static alphabetFrom = 65;
  static alphabetTo = 90;

  static createCipherMatrix() {
    const { alphabetFrom, alphabetTo} = VigenereCipheringMachine;
    const alphabet = [];
    const cipherMatrix = [];
    for (let i = alphabetFrom; i <= alphabetTo; i++) {
      const char = String.fromCharCode(i);
      alphabet.push(char);
    }

    cipherMatrix.push(alphabet);

    for (let i = 1; i < alphabet.length; i++) {
      const row = [...alphabet.slice(i), ...alphabet.slice(0, i)]; // OR alphabet.slice(i).concat(alphabet.slice(0, i))
      cipherMatrix.push(row);
    }

    return cipherMatrix;
  }
  static prepareKeyword(keyword, length) {
    const preparedKeywordLength = Math.ceil(length / keyword.length);
    return Array(preparedKeywordLength).fill(keyword).join("");
  }
  static getLetterPosition(char) {
    const { alphabetFrom, alphabetTo} = VigenereCipheringMachine;
    const totalLettersInAlphabet = alphabetTo - alphabetFrom;
    const charCode = char.charCodeAt(0);
    if (charCode >= alphabetFrom && charCode <= alphabetTo) {
      return totalLettersInAlphabet - (alphabetTo - charCode);
    } else {
      return -1;
    }
  }
  static cipherHandler(text, keyword, onHandle) {
    let res = "";
    const upperText = String(text).toUpperCase();
    const upperKeyword = String(keyword).toUpperCase();
    const preparedKeyword = VigenereCipheringMachine.prepareKeyword(upperKeyword, text.length);
    let keywordPositionCounter = 0;
    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      const charPosition = VigenereCipheringMachine.getLetterPosition(char);
      if (charPosition !== -1) {
        const keywordPosition = VigenereCipheringMachine.getLetterPosition(preparedKeyword[keywordPositionCounter]);
        res += onHandle(keywordPosition, charPosition, char);
        keywordPositionCounter++;
      } else {
        res += char;
      }
    }
    return res;
  }
  static toReverse(string) {
    return string.split("").reverse().join("");
  }
  encrypt(text, keyword) {
    if (!text || !keyword) {
      throw new Error("Missing parameters");
    }
    const onDirectEncrypt = (keywordPosition, charPosition) => {
      return this.cipherMatrix[keywordPosition][charPosition];
    };
    const ecnryptedValue = VigenereCipheringMachine.cipherHandler(text, keyword, onDirectEncrypt);
    if (this.isDirect) {
      return ecnryptedValue;
    } else {
      return VigenereCipheringMachine.toReverse(ecnryptedValue);
    }
  }    
  decrypt(text, keyword) {
    if (!text || !keyword) {
      throw new Error("Missing parameters");
    }
    const onDirectDecrypt = (keywordPosition, _, char) => {
      const decryptedCharPosition = this.cipherMatrix[keywordPosition].indexOf(char);
      return this.cipherMatrix[0][decryptedCharPosition];
    };

    if (this.isDirect) {
      return VigenereCipheringMachine.cipherHandler(text, keyword, onDirectDecrypt);
    } else {
      return VigenereCipheringMachine.toReverse(
        VigenereCipheringMachine.cipherHandler(text, keyword, onDirectDecrypt)
      );
    }
  }
}

module.exports = VigenereCipheringMachine;
