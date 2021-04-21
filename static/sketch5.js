//_______BLOCKCHAIN CONSTRUCTION_____________________________________
//Uses js-SHA256 library by Yi-Cyuan Chen (lib/sha256.js)

//Variables to communicate with p5 instance
var nBlocks = 1;
var d = new Date();
var currentHash;
var lastHash = 0;
var currentNote = ['A'];
var noteIndex;
var autoplay = false;
var songIndex = 0;

//Block creation class
class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
    currentHash = this.hash;
  }
}

//Blockchain creation class
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, "20/04/2021", "Genesis block", "0");
  }

  getLatestBlock() {
    return (this.chain[this.chain.length-1]).index;
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    console.log('Block added!');
    console.log('Total blocks: ' + (this.chain.length));
    console.log(newBlock.data);
    console.log(newBlock.previousHash);
  }

  checkValidity() {
    for(let i=1; i<this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.calculateHash()){
        return "Block's hash has changed!";
      }
      if (currentBlock.previousHash !== previousBlock.hash){
        return "Previous block's hash value doesn't match!";
      }
    }

    return true;
  }

}


//Create new blockchain with genesis block
var chainTest = new Blockchain;
console.log("New blockchain started: genesis block generated!");

//Add new block to instance of chain with key data
function addToChain(keyCode) {
  if ((keyCode < 104) && (keyCode > 96)){
    nBlocks++;
    console.log(keyCode);
    noteIndex = keyCode - 97;
    console.log(noteIndex);
    currentNote[nBlocks-1] = String.fromCharCode(keyCode);
    currentNote[nBlocks-1] = currentNote[nBlocks-1].toUpperCase();
    chainTest.addBlock(new Block(nBlocks, d.getTime(), { currentNote }));
    chainTest.checkValidity();
    console.log(currentNote);
    if (nBlocks > 2){
      lastHash = (chainTest.chain[chainTest.chain.length-2].hash);
      console.log("Previous hash: " + lastHash);
    }
  // console.log("Is chain valid? " + chainTest.checkValidity());
  }
}

//Trigger chain song if enter key is pressed
function triggerSong(keyCode) {
  if (keyCode === 13){
    autoplay = true;
    console.log("playing");
    songIndex = 0;
  }
}

//If keypress is detected and there's less than 8 blocks in the chain, add another
document.addEventListener("keypress", (event) => {
  var keyCode = event.keyCode;
    if (nBlocks <8){
      addToChain(keyCode);
  }
  triggerSong(keyCode);
});



// _________MAIN SKETCH____________________________________________

var buildChain = function(p) {
  p.canvasWidth = (p.windowWidth/2);
  p.canvasHeight = 300;
  p.centreX = (p.canvasWidth / 2);
  p.centreY = (p.canvasHeight / 2);
  p.offcentreY = p.centreY - 100;

  //Set up musical notes corresponding to block data (A-G)
  var notes = [60, 62, 64, 65, 67, 69, 71];
  //Array for storing chosen notes + duration of each note
  var song = [60];
  var duration = 1000;
  var trigger = 0;
  //Set up variable for oscillator to play note
  var osc;
  //Check if new block was added yet
  var prevNBlocks = 1;


  p.setup = function() {
    var canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
    osc = new p5.TriOsc();
    //Start silent
    osc.start();
    osc.amp(0);
    p.getAudioContext().resume();

  };

  p.draw = function() {
    p.background(38,38,38);
    for (var i=0; i<nBlocks; i++){
      p.stroke(255);
      p.rect(i*(p.canvasWidth/8), 50, 50, 50);
      p.push();
      p.textStyle(p.NORMAL);
      p.textAlign(p.CENTER);
      p.textFont("Work Sans");
      p.textSize(20);
      p.noStroke();
      p.fill('DodgerBlue');
      p.text(p.str(currentNote[i]), (i*(p.canvasWidth/8)+25), 125);
      if (i > 0){
        p.fill(255);
        p.rectMode(p.CORNER);
        p.rect((i*p.canvasWidth/8)-100, 75, 100, 2)
        p.textAlign(p.LEFT);
        p.fill('Gold');
        p.textSize(16);
        p.text(("Current hash: " + p.str(currentHash)), 0, 175);
        p.fill('Tomato');
        p.text(("Previous hash: " + p.str(lastHash)), 0, 200);
      }
      p.pop();
    }
    if (nBlocks > prevNBlocks){
      keyNote = notes[noteIndex];
      song[nBlocks-1] = keyNote;
      console.log(song);
      p.playNote(keyNote, 300);
      prevNBlocks = nBlocks;
    }
    if (autoplay == true && p.millis() > trigger){
        p.playNote(song[songIndex], 300);
        trigger = p.millis() + 300;
        songIndex++;
    }
    else if (songIndex >= song.length){
      autoplay = false;
    }


  };

  //Function for playing a musical note
  p.playNote = function(note, duration) {
    p.userStartAudio();
    osc.freq(p.midiToFreq(note));
    // Fade it in
    osc.fade(0.5,0.2);

    // If duration is set, fade it out
    if (duration) {
      setTimeout(function() {
        osc.fade(0,0.5);
      },
      duration-50);
    }
  };

}


//_______________INSTANTIATE SKETCH______________
var sketch5 = new p5(buildChain, 'build_sketch');

