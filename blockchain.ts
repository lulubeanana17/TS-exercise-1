import * as CryptoJS from "crypto-js";
// import crypto for hash

class Block {
  static GenerateHash = (
    index: number,
    previousHash: string,
    data: string,
    timeStamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + data + timeStamp).toString();

  public index: number;
  public hash: string;
  public previousHash: string;
  public previousData: string;
  public data: string;
  public timeStamp: number;
  public futureHash: string;
  public futureData: string;
  public blockKey: string;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    previousData: string,
    data: string,
    timeStamp: number,
    futureHash: string,
    futureData: string,
    blockKey: string
  ) {
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
}

// create genesis block
// genesis block is untouchable
const genesisBlock: Block = new Block(0, '010100110101', '', '', 'genesis', 1111, '', '', '1');

// store blocks in array
let storageBlock: Block[] = [genesisBlock];



// 0. get previous block
const getPreviousBlock = ():Block => storageBlock[storageBlock.length -1];
const newTimeStamp = ():number => Math.round(new Date().getTime() / 1000);


// create block chain
const createBlock = (data: string): Block => {
    const getPreviousBlockVariable:Block = getPreviousBlock();
    // 1. set index number
    const newIndex: number = getPreviousBlockVariable.index + 1;
    // 2. find previous block in array
    const newPreviousHash: string = getPreviousBlockVariable.hash;
    // 3. get time from date and set it
    const newTimeStampVariable: number = newTimeStamp();
    // 4. create hash
    const newHash: string = Block.GenerateHash(newIndex, data, newPreviousHash, newTimeStampVariable);
    // 5. find previous data
    const newPreviousData: string = getPreviousBlockVariable.data;
    // generate block key
    const crypto = require("crypto");
    const newKey: string = crypto.randomBytes(20).toString("hex");
    // create new Block
    const newBlock: Block = new Block(newIndex, newHash, newPreviousHash, newPreviousData, data, newTimeStampVariable, '', '', newKey);
    // push to storageBlock
    getPreviousBlockVariable.futureHash = newBlock.hash;
    getPreviousBlockVariable.futureData = newBlock.data;
    storageBlock.push(newBlock);
    return newBlock;
}

createBlock('second');
createBlock('third');
createBlock('fourth');
createBlock('fifth');
createBlock('sixth');

console.log(storageBlock);

export {};