

//_______________Sketch 4 - Checking Chains________

var checkchain = function(p) {
  p.canvasWidth = (p.windowWidth/2);
  p.canvasHeight = 500;
  p.centreX = (p.canvasWidth / 2);
  p.centreY = (p.canvasHeight / 2);
  p.offcentreY = p.centreY - 100;

  var checkers = [];
  var buttons = [];
  var labels = [];
  var buttonX, buttonY, buttonW, buttonH;
  var genNumber;

  //______________________________________________________________________________
  // CHECKER CLASS CONSTRUCTOR

    class Checker {
      constructor(xc, yc, wc, hc, n, a, t, i) {
        this.xc = xc;
        this.yc = yc;
        this.wc = wc;
        this.hc = hc;
        this.n = n;
        this.a = a;
        this.t = t;
        this.i = i;
      }

      show () {
        p.rectMode(p.CORNER);
        p.noFill();
        if (this.a == 1){
          p.stroke('ForestGreen');
        }
        else if (this.a == 2){
          p.stroke('Tomato');
        }
        else {
          p.stroke(255);
        }
        p.rect(this.xc, this.yc, this.wc, this.hc);
        if (this.t == 1){
          p.push();
          p.noStroke();
          p.textFont("Work Sans");
          p.textAlign(p.CENTER);
          p.textSize(16);
          p.fill(255);
          p.text('Node ' + p.str(this.i+1), this.xc+this.wc/2, this.yc-this.hc/10)
          p.pop();
        }
        else if (this.t == 2) {
          p.push();
          p.noStroke();
          p.textFont("Work Sans");
          p.textFont("Work Sans");
          p.textAlign(p.CENTER);
          p.textSize(16);
          p.fill(255);
          p.text('User', this.xc+this.wc/2, this.yc-this.hc/10)
          p.pop();
        }
      }

      update () {
        for (var i=0; i<this.n; i++){
          p.stroke(255);
          p.rect(this.xc+(i*this.wc/4)+(this.wc/8), this.yc+this.hc/3, this.wc/5, this.wc/5);
        }
      }
    }

    class Button {
      constructor(xb, yb, wb, hb){
        this.xb = xb;
        this.yb = yb;
        this.wb = wb;
        this.hb = hb;
      }

      show () {
        p.push();
        p.fill(255);
        p.rect(this.xb, this.yb, this.wb, this.hb);
        p.pop();

      }
    }

    p.setup = function() {
      var canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
      for (var i=0; i<4; i++){
        if (i<3){
          checkers[i] = new Checker(i*p.canvasWidth/2.5, 2*p.canvasHeight/10, p.canvasWidth/5, p.canvasHeight/5, 0, 0, 1, i);
        }
        else if (i==3){
          checkers[i] = new Checker(p.canvasWidth/2.5, p.canvasHeight/2, p.canvasWidth/5, p.canvasHeight/5, 0, 0, 2, i);
        }
      }
      for (var i=0; i<3; i++){
        buttonX = checkers[3].xc+(i*checkers[3].wc*0.375);
        buttonY = 1.5*checkers[3].yc;
        buttonW = checkers[3].wc/4;
        buttonH = checkers[3].wc/4;
        buttons[i] = new Button(buttonX, buttonY, buttonW, buttonH);
      }
    };

    p.draw = function() {

      for (var i=0; i<4; i++){
        checkers[i].update();
        checkers[i].show();
      }

      for (var i=0; i<3; i++){
        buttons[i].show();
        p.push();
        p.fill(0);
        p.textFont("Work Sans");
        p.textStyle(p.BOLD);
        p.textAlign(p.CENTER);
        p.textSize(30);
        labels[i] = p.text(p.str(i+1), buttons[i].xb+buttons[i].wb/2, buttons[i].yb+buttons[i].hb*0.75);
        p.pop();
      }
      p.push();
      p.noStroke();
      p.fill(255);
      p.textFont("Work Sans");
      p.textAlign(p.CENTER);
      p.textSize(18);
      p.text("Guess the solution!", (buttons[1].xb+buttons[1].wb/2), (buttons[1].yb+buttons[1].hb*1.75));
      p.pop();

      p.checkMouse();

    };

    p.checkMouse = function() {
      p.mouseClicked = function(){
        for (var i=0; i<3; i++){
          //Check if mouse is pressed and within one of the number buttons
          if (((buttons[i].xb + buttons[i].wb > p.mouseX) && (p.mouseX > buttons[i].xb)) && ((buttons[i].yb + buttons[i].hb > p.mouseY) && (p.mouseY > buttons[i].yb))){
            //Generate random number between 1 and 3, then check if correct button was pressed
              genNumber = p.random(4);
              genNumber = p.int(genNumber);
              // console.log(genNumber);
              if (genNumber == (i+1)){
                for (var i=0; i<4; i++){
                  if (i<3){
                    //Set answer correctness boolean to 'correct' for 3 checkers
                    checkers[i].a = 1;
                  }
                  //Add a block to the checker objects and the user's display
                  if(checkers[i].n < 3){
                    checkers[i].n += 1;
                  }
                }
              }
              else {
                for (var i=0; i<3; i++){
                  //Set answer correctness to 'incorrect' for all checkers
                  checkers[i].a = 2;
                }
              }

          }
        }
      }
    };


}

//_______________INSTANTIATE SKETCH______________
var sketch4 = new p5(checkchain, 'checker_sketch');
