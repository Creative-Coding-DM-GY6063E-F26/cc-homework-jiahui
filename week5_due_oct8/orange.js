
p5.disableFriendlyErrors = true;
let bDoExportSvg = false;

function setup() {
  createCanvas(816, 1056);
}

function keyPressed() {
  if (key === 's') {
    bDoExportSvg = true;
  }
}

function draw() {

  background(255);

  if (bDoExportSvg) {
    beginRecordSvg("orange_flat.svg");
  }

  


  stroke(255, 165, 0);
  strokeWeight(2);
  noFill();


  for (let i = 0; i < 4; i++) {

    let angle = i * HALF_PI;

  // rotate and mirror
    drawCurvesTransformed(angle, false);
  
    drawCurvesTransformed(angle, true);
  }

 

  if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }
}



function drawCurvesTransformed(angle, mirror) {

  for (let i = 0; i < 20; i++) {

    let size = 10 + i * 20;

    let p1 = transformPoint(20, 30 + i * 10, angle, mirror);
    let p2 = transformPoint(150, 700 + i * 30 - size, angle, mirror);
    let p3 = transformPoint(450, 5 + i * 40 + size, angle, mirror);
    let p4 = transformPoint(800, 500 + i * 2, angle, mirror);

  
    bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }
}


// =====================================
// 把原来的 translate / scale / rotate
// 直接计算到坐标里面
// =====================================

function transformPoint(x, y, angle, mirror) {

  // 原来的：
  // translate(-150, -350)

  x = x - 150;
  y = y - 350;


  // 原来的镜像：
  //
  // translate(800, 0);
  // scale(-1, 1);
  //
  // 等价于：
  // x = 800 - x

  if (mirror) {
    x = 800 - x;
  }


  // 原来的：
  // scale(0.55)

  x = x * 0.3;
  y = y * 0.3;


  // 原来的：
  // rotate(angle)

  let rotatedX =
    x * cos(angle) -
    y * sin(angle);

  let rotatedY =
    x * sin(angle) +
    y * cos(angle);


  // 原来的：
  // translate(width / 2, height / 2)

  rotatedX = rotatedX + width / 2;
  rotatedY = rotatedY + height / 2;


  return {
    x: rotatedX,
    y: rotatedY
  };
}