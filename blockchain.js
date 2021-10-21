"use strict";
exports.__esModule = true;
var CryptoJS = require("crypto-js");
// import crypto for hash
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, previousData, data, timeStamp, futureHash, futureData, blockKey) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.previousData = previousData;
        this.data = data;
        this.timeStamp = timeStamp;
        this.futureHash = futureHash;
        this.futureData = futureData;
        this.blockKey = blockKey;
    }
    Block.GenerateHash = function (index, previousHash, data, timeStamp) {
        return CryptoJS.SHA256(index + previousHash + data + timeStamp).toString();
    };
    return Block;
}());
// create genesis block
// genesis block is untouchable
var genesisBlock = new Block(0, '010100110101', '', '', 'genesis', 1111, '', '', '1');
// store blocks in array
var storageBlock = [genesisBlock];
// 0. get previous block
var getPreviousBlock = function () { return storageBlock[storageBlock.length - 1]; };
var newTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
// create block chain
var createBlock = function (data) {
    var getPreviousBlockVariable = getPreviousBlock();
    // 1. set index number
    var newIndex = getPreviousBlockVariable.index + 1;
    // 2. find previous block in array
    var newPreviousHash = getPreviousBlockVariable.hash;
    // 3. get time from date and set it
    var newTimeStampVariable = newTimeStamp();
    // 4. create hash
    var newHash = Block.GenerateHash(newIndex, data, newPreviousHash, newTimeStampVariable);
    // 5. find previous data
    var newPreviousData = getPreviousBlockVariable.data;
    // generate block key
    var crypto = require("crypto");
    var newKey = crypto.randomBytes(20).toString("hex");
    // create new Block
    var newBlock = new Block(newIndex, newHash, newPreviousHash, newPreviousData, data, newTimeStampVariable, '', '', newKey);
    // push to storageBlock
    getPreviousBlockVariable.futureHash = newBlock.hash;
    getPreviousBlockVariable.futureData = newBlock.data;
    storageBlock.push(newBlock);
    return newBlock;
};
createBlock('second');
createBlock('third');
createBlock('fourth');
createBlock('fifth');
createBlock('sixth');
console.log(storageBlock);
