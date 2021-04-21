//_______________Sketch 1 - Genesis Block________

var genesis = function(p) {
  p.canvasWidth = p.windowWidth;
  p.canvasHeight = 200;
  p.centreX = (p.canvasWidth / 2);
  p.centreY = (p.canvasHeight / 2);
  var blockFill = (38,38,38);

  p.setup = function() {
    var canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
  };

  p.draw = function() {
    p.background(38,38,38);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.push();
    p.stroke(255);
    p.fill(blockFill);
    // Draw block and check if mouse is over it
    p.rectMode(p.CENTER);
    p.rect(p.centreX, p.centreY, 100, 100);
    p.pop();
    var distance = p.dist(p.mouseX, p.mouseY, p.centreX, p.centreY);
    if (distance < 32) {
      p.displayInfo();
      blockFill = 255;
    }
    else {
      blockFill = (38,38,38);
    }
  };

  // Write info text under block when mouseover
  p.displayInfo = function() {
    p.textFont("Work Sans");
    p.textStyle(p.NORMAL);
    p.noStroke();
    p.push();
    p.fill('DodgerBlue');
    p.text('Hello!', (p.centreX - 100), (p.centreY + 100));
    p.pop();
    p.push();
    p.fill('Gold');
    p.textAlign(p.CENTER);
    p.text('456def', (p.centreX), (p.centreY + 100));
    p.pop();
    p.push();
    p.fill('Tomato');
    p.textAlign(p.LEFT);
    p.text('123abc', (p.centreX + 80), (p.centreY + 100));
    p.pop();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, 200);
    p.canvasWidth = p.windowWidth;
    p.centreX = (p.canvasWidth / 2);
    p.centreY = (p.canvasHeight / 2);
  };

};



//_______________INSTANTIATE SKETCH______________

// Place each sketch in a div by ID
var sketch1 = new p5(genesis, 'genesis_sketch');
