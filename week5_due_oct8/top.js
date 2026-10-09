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
    beginRecordSvg("top.svg");
  }

 
 stroke(0);
  strokeWeight(3);
  for (let x = 20; x < 800; x += 8) {
   line(x, 20, x, 1000);
 }


  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }
}