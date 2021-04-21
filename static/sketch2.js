//_______________Sketch 2 - Create Block________


var creation = function(p) {
  p.canvasWidth = p.windowWidth;
  p.canvasHeight = 300;
  p.centreX = (p.canvasWidth / 2);
  p.centreY = (p.canvasHeight / 2);
  var blockFill = (38,38,38);
  var data1, data2, data3;
  var block;
  var blockX = p.centreX;
  var blockY = (p.centreY - 50);
  var blockW = 100;
  var blockH = 100;
  var dataStr = '';
  var data1present = false;
  var data2present = false;
  var data3present = false;

//______________________________________________________________________________
// DRAGGABLE CLASS CONSTRUCTOR
// Based on the 'draggable' class example by Daniel Shiffman <http://www.shiffman.net>
  class Draggable {
    constructor(x, y, w, h) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.offsetX = 0;
      this.offsetY = 0;
    }

    over() {
      // Is mouse over object
      if (p.mouseX > this.x && p.mouseX < this.x + this.w && p.mouseY > this.y && p.mouseY < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }

    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = p.mouseX + this.offsetX;
        this.y = p.mouseY + this.offsetY;
      }
    }

    show() {
      p.stroke('DodgerBlue');
      // Different fill based on state
      if (this.dragging) {
        p.fill('DodgerBlue');
      } else if (this.rollover) {
        p.fill('DodgerBlue');
      } else {
        p.fill(38,38,38);
      }
      p.rectMode(p.CORNER);
      p.rect(this.x, this.y, this.w, this.h);
    }

    pressed() {
      // Did I click on the rectangle?
      if (p.mouseX > this.x && p.mouseX < this.x + this.w && p.mouseY > this.y && p.mouseY < this.y + this.h) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - p.mouseX;
        this.offsetY = this.y - p.mouseY;
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
    // Create three draggable objects (blue data rectangles)
    data1 = new Draggable((p.centreX - 100), (p.centreY + 40), 25, 25);
    data2 = new Draggable((p.centreX - 12.5), (p.centreY + 40), 25, 25);
    data3 = new Draggable((p.centreX + 75), (p.centreY + 40), 25, 25);
  };

  p.draw = function() {
    p.background(38,38,38);
    p.stroke(255);
    p.fill(blockFill);
    p.rectMode(p.CENTER);
    block = p.rect(blockX, blockY, blockW, blockH);

    // Update and show data rectangles
    data1.over();
    data1.update();
    data1.show();
    data2.over();
    data2.update();
    data2.show();
    data3.over();
    data3.update();
    data3.show();

    // Text to display current hash
    p.push();
    p.textFont("Work Sans");
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.noStroke();
    p.fill('Gold');
    p.text(dataStr, p.centreX, p.centreY+100);
    p.pop();

    p.checkData();
    p.updateHash();
  };

  // Check to see which data rectangles are inside the block
  p.checkData = function() {
    if ((blockX - (blockW/2)) < data1.x && data1.x <(blockX + (blockW/2)) && (blockY - (blockH/2)) < data1.y && data1.y <(blockY + (blockH/2))){
      data1present = true;
    }
    else {
      data1present = false;
    }
    if ((blockX - (blockW/2)) < data2.x && data2.x <(blockX + (blockW/2)) && (blockY - (blockH/2)) < data2.y && data2.y <(blockY + (blockH/2))){
      data2present = true;
    }
    else {
      data2present = false;
    }
    if ((blockX - (blockW/2)) < data3.x && data3.x <(blockX + (blockW/2)) && (blockY - (blockH/2)) < data3.y && data3.y <(blockY + (blockH/2))){
      data3present = true;
    }
    else {
      data3present = false;
    }
  };

  // Select string for hash text depending on which data rectangles are inside the block
  p.updateHash = function() {
    if ((data1present == true) && (data2present == false) && (data3present == false)){
      dataStr = '123abc';
    }
    else if ((data1present == true) && (data2present == true) && (data3present == false)){
      dataStr = '456def';
    }
    else if ((data1present == true) && (data2present == true) && (data3present == true)){
      dataStr = '789ghi';
    }
    else if ((data1present == false) && (data2present == true) && (data3present == true)){
      dataStr = '012jkl';
    }
    else if ((data1present == false) && (data2present == false) && (data3present == true)){
      dataStr = '345mno';
    }
    else if ((data1present == false) && (data2present == true) && (data3present == false)){
      dataStr = '678pqr';
    }
    else if ((data1present == true) && (data2present == false) && (data3present == true)){
      dataStr = '901stu';
    }
    else if ((data1present == false) &&( data2present == false) && (data3present == false)){
      dataStr = '';
    }

  };

  p.mousePressed = function() {
    data1.pressed();
    data2.pressed();
    data3.pressed();
  };

  p.mouseReleased = function() {
    data1.released();
    data2.released();
    data3.released();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, 300);
    p.canvasWidth = p.windowWidth;
    p.centreX = (p.canvasWidth / 2);
    blockX = p.centreX;
    p.centreY = (p.canvasHeight / 2);
    blockY = p.centreY;

  };

};

//_______________INSTANTIATE SKETCH______________
var sketch2 = new p5(creation, 'creation_sketch');
