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
    line(i, j, i+8, j+8);
  }
 }

 translate(-10, 10);
 for(let i=0; i<width; i+=10) {
  for(let j=0; j<height; j+=10) {
    line(i, j, i+10, j+8);
  }
 }

  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }
}