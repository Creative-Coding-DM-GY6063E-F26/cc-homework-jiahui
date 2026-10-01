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
    beginRecordSvg("effect3.svg");
  }

 // line(0, 0, mouseX, mouseY);
noFill();
stroke(0);
 for(let i=0; i<width; i+=8) {

    beginShape();

  for(let j=0; j<height; j+=8) {

  let x = i + sin(j * 0.08) * 10;
      let y = j;
  curveVertex(x, y);
  }
  endShape();
 }


 for (let i = 0; i < width; i += 50) {

    beginShape();

    for (let j = 0; j <= height; j += 20) {

      let x = i + sin(j * 0.04 + 0.5) * 40;
      let y = j;

      curveVertex(x, y);
    }

    endShape();
  }

  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }
}