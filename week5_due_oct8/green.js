let bDoExportSvg = false;

function setup() {
  createCanvas(816, 1056);
  background(255);
  noFill();
  stroke(0);
}

function keyPressed() {
  if (key === 's') {
    bDoExportSvg = true;
  }
}

function draw() {
  background(255);

  if (bDoExportSvg) {
    beginRecordSvg("effect2.svg");
  }

  stroke(0);
  strokeWeight(1);
  noFill();

  drawCircles(408, 528, 40);

  if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }
}

function drawCircles(x, y, num) {
  for (let i = 1; i <= num; i++) {
    circle(x, y, i * 15);
  }
}