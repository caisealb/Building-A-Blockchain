//_______________Sketch 3 - Make a Chain________

var chain = function(p) {
  p.canvasWidth = (p.windowWidth/2);
  p.canvasHeight = 300;
  p.centreX = (p.canvasWidth / 2);
  p.centreY = (p.canvasHeight / 2);
  p.offcentreY = p.centreY - 100;

  var blocks = [];
  var links = [];

//______________________________________________________________________________
// BLOCK CLASS CONSTRUCTOR

  class Block {
    constructor(xb, yb, wb, hb, xd, yd, wd, hd, c) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.overlap = true;
      this.xb = xb;
      this.yb = yb;
      this.wb = wb;
      this.hb = hb;
      this.xd = xd;
      this.yd = yd;
      this.wd = wd;
      this.hd = hd;
      this.offsetX = 0;
      this.offsetY = 0;
      this.c = c;
    }

    over() {
      // Is mouse over object
      if (p.mouseX > this.xd && p.mouseX < this.xd + this.wd && p.mouseY > this.yd && p.mouseY < this.yd + this.hd) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }

    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.xd = p.mouseX + this.offsetX;
        this.yd = p.mouseY + this.offsetY;
      }
      // Check if blue rectangle (data) is outside white rectangle (block)
      if (((this.yd < this.yb) || (this.yd > (this.yb + this.hb))) || ((this.xd < this.xb) || (this.xd > (this.xb + this.wb)))){
        this.overlap = false;
      }
      else {
        this.overlap = true;
      }
    }

    show() {
      p.rectMode(p.CORNER);
      p.stroke(255);
      p.noFill();
      p.rect(this.xb, this.yb, this.wb, this.hb);
      // Draw links between blocks; set colour based on overlap boolean
      p.stroke(this.c);
      p.rect(this.xb+this.wb+2, this.yb+this.hb/2, p.canvasWidth/14, 1);
      p.push();
      p.stroke('DodgerBlue');
      // Different fill based on state
      if (this.dragging) {
        p.fill('DodgerBlue');
      } else if (this.rollover) {
        p.fill('DodgerBlue');
      } else {
        p.fill(38,38,38);
      }
      p.rect(this.xd, this.yd, this.wd, this.hd);
      p.pop();

    }

    pressed() {
      // Did I click on the rectangle?
      if (p.mouseX > this.xd && p.mouseX < this.xd + this.wd && p.mouseY > this.yd && p.mouseY < this.yd + this.hd) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.xd - p.mouseX;
        this.offsetY = this.yd - p.mouseY;
      }
    }

    released() {
      // Quit dragging
      this.dragging = false;
    }
  }

//______________________________________________________________________________

  p.setup = function() {
    var canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
    for (var i=0; i<4; i++){
      blocks[i] = new Block(((i*p.canvasWidth/5)+p.canvasWidth/10), (p.offcentreY), p.canvasWidth/8, p.canvasWidth/8, ((i*p.canvasWidth/5)+(p.canvasWidth/10)+((p.canvasWidth/8)/3)), (p.offcentreY+((p.canvasWidth/8)/3)), p.canvasWidth/24, p.canvasWidth/24, 255);
    }
  };

  p.draw = function() {
    p.background(38,38,38);
    // Cycle through blocks and update position of data rectangles
    for (var i=0; i<4; i++){
      blocks[i].over();
      blocks[i].update();
      blocks[i].show();
      p.textFont("Work Sans");
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER);
      p.textSize(16);
      p.noStroke();
      p.fill('Gold');
      // If data rectangles dragged outside blocks, adjust text under blocks
      if (blocks[i].overlap == false){
        p.text('!', (blocks[i].xb + (blocks[i].wb/2)), (blocks[i].yb + 150));
        p.fill('Tomato');
        p.text('!', (blocks[i].xb + (blocks[i].wb/2)), (blocks[i].yb + 175));
        for (var j=i+1; j<4; j++){
          p.text('X', (blocks[j].xb + (blocks[j].wb/2)), (blocks[j].yb + 175));
        }
        // Change colour of links between subsequent blocks to black (invisible)
        for (var k=i; k<4; k++){
          blocks[k].c = (38,38,38);
        }
      }

      else {
        p.fill('Gold');
        p.text('...', (blocks[i].xb + (blocks[i].wb/2)), (blocks[i].yb + 150));
        // Otherwise links between blocks are visible (i<3 so that no link is drawn for the last block)
        if (i<3){
          blocks[i].c = 255;
        }
        else {
          blocks[i].c = (38,38,38);
        }
      }
    }
  };

  p.mousePressed = function() {
    for (var i=0; i<4; i++){
      blocks[i].pressed();
    }
  };

  p.mouseReleased = function() {
    for (var i=0; i<4; i++){
      blocks[i].released();
    }
  };

}

//_______________INSTANTIATE SKETCH______________
var sketch3 = new p5(chain, 'chain_sketch');
