
let numCircles = 10;

p5.disableFriendlyErrors = true; // keep warnings quiet
let bDoExportSvg = false; 

function setup() {
  createCanvas(816, 1056);

}

function keyPressed() {
  if(key === 's') {
    bDoExportSvg = true;
  }
}

function draw() {
  background(255);


  if (bDoExportSvg){
    beginRecordSvg("myOutput.svg");
  }

 // line(0, 0, mouseX, mouseY);
noFill();
stroke(0);
 for(let i=0; i<width; i+=8) {
  for(let j=0; j<height; j+=8) {
    circle(i, j, 8);
  }
 }

 translate(8, 10);
 for(let i=0; i<width; i+=10) {
  for(let j=0; j<height; j+=10) {
    rect(i, j, 10, 8);
  }
 }

  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }

  // call drawCircles here
  drawcircles();
  drawlines( xOff );

if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }
}
// draw 3 circles
  function drawcircles(num){
    for(let i=0; i<= num; i++) {
      nofill();
      circle(width/2, height/2, i * 150);
    }
  }