function setup() {
 const cnv = createCanvas(800, 770);
 const c = cnv.elt;
  document.body.style.margin = '0';
  document.body.style.minWidth  = '1000px';   
  document.body.style.minHeight = '1000px'; 
  c.style.position = 'absolute';
  c.style.left = '450px';   
  c.style.top = '50px';     
  c.style.display = 'block';
 
}

function draw() {
  background(219, 203, 184);


  // back quad and the red circle

  noStroke();
  fill(204, 209, 186);
  quad(0, -30, 800, 100, 800, 500, 0, 450);

  noStroke();
  fill(170, 177, 162);
  quad(0, 470, 800, 550, 800, 590, 0, 510);
  
  noStroke();
  fill(192, 69, 72);
   circle(0, 20, 160);

  noStroke();
  fill(1, 130, 87);
  quad(750, -20, 820, 20, 800, 370, 730, 340);

  noStroke();
  fill(212, 221, 216);
  quad(240, 620, 800, 390, 800, 450, 280, 640);


 noStroke();
  fill(212, 221, 216);
  quad(0, 10, 20, 0, 120, 0, 0, 80);

  noStroke();
  fill(212, 221, 216);
  quad(0, 300, 270, 220, 380, 250, 0, 360);

  noStroke();
  fill(212, 221, 216);
  quad(440, 280, 800, 100, 800, 170, 520, 288);

  noStroke();
  fill(212, 221, 216);
  quad(0, 770, 150, 730, 250, 756, 140, 770);

   // brown line
  noFill();
  strokeWeight(10);
  stroke(74, 44, 40, 255);
  bezier(0, 690, 250, 700, 450, 710, 900, 790);

  // orange quad
  noStroke();
  fill(233, 55, 1, 160);
  quad(200, 560, 500, 130, 810, 610, 510, 1000);
 
// blue point
  strokeWeight(48);
  stroke(49, 86, 146, 255);
  point(495, 508);

  // blue lines under points
  noFill();
  strokeWeight(6);
  stroke(49, 86, 146, 255);
   bezier(515, 420, 590, 420, 620, 415, 800, 330);

   noFill();
  strokeWeight(6);
  stroke(49, 86, 146, 255);
   bezier(440, 620, 520, 550, 620, 520, 800, 500);
// pulsation bottom 1
  strokeWeight(35);
  stroke(193, 144, 103);
  point(605, 513);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(665, 507);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(725, 501);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(785, 495);

  //pulsation 2
  strokeWeight(35);
  stroke(193, 144, 103);
  point(620, 463);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(680, 457);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(740, 451);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(790, 445);

  // pulsation 3
  strokeWeight(35);
  stroke(193, 144, 103);
  point(625, 413);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(685, 407);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(745, 401);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(795, 395);

  // pulsation 4
  strokeWeight(35);
  stroke(193, 144, 103);
  point(635, 353);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(695, 347);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(755, 341);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(805, 335);

  // pulsation 5
  strokeWeight(35);
  stroke(193, 144, 103);
  point(640, 293);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(700, 287);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(760, 281);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(810, 275);

  // pulsation 6
  strokeWeight(35);
  stroke(193, 144, 103);
  point(630, 243);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(690, 237);

  strokeWeight(35);
  stroke(193, 144, 103);
  point(750, 231);    

  strokeWeight(35);
  stroke(193, 144, 103);
  point(800, 225);

  // lines connecting the pulsations  
  strokeWeight(4);
  stroke(193, 144, 103);
  line(605, 513, 785, 495);

  strokeWeight(4);
  stroke(193, 144, 103);
  line(620, 463, 790, 445);

  strokeWeight(4);
  stroke(193, 144, 103);
  line(625, 413, 795, 395);

  strokeWeight(4);
  stroke(193, 144, 103);
  line(635, 353, 805, 335);

  strokeWeight(4);
  stroke(193, 144, 103);
  line(640, 293, 810, 275);

  strokeWeight(4);
  stroke(193, 144, 103);
  line(630, 243, 800, 225);
  
  // 3 color thing
  noStroke();
  beginShape();
  vertex(77, 395);
  vertex(154, 395);
  vertex(305, 495);
  vertex(77, 435);
  fill(172, 59, 62);
  endShape(CLOSE);
  
  noStroke();
  beginShape();
  vertex(231, 395);
  vertex(305, 395);
  vertex(305, 495);
  fill(241, 180, 51);
  endShape(CLOSE);
  
  noStroke();
  beginShape();
  vertex(77, 465);
  vertex(305, 495);
  vertex(77, 495);
  fill(32, 128, 97);
  endShape(CLOSE);

  // big blue curve
  noFill();
  strokeWeight(6);
  stroke(58, 82, 97, 220);
  bezier(0, 243, 240, 390, 450, 450, 800, 510);

  //lines
  strokeWeight(7);
  stroke(39, 116, 172);
  line(0, 120, 75, 120);
  strokeWeight(7);
  stroke(39, 116, 172);
  line(0, 140, 75, 140);

  strokeWeight(8);
  stroke(0, 0, 0);
  line(0, 480, 55, 476);

  strokeWeight(5);
  stroke(0, 0, 0);
  line(55, 476, 22, 750);
   
  strokeWeight(5);
  stroke(0, 0, 0);
  line(20, 756, 0, 748);

  noFill();
  strokeWeight(6);
  stroke(58, 82, 97, 220);
  bezier(230, 800, 385, 720, 520, 652, 570, 660);

  noFill();
  strokeWeight(6);
  stroke(49, 86, 146, 255);
  bezier(365, 780, 442, 760, 500, 680, 585, 678);

  noFill();
  strokeWeight(6);
  stroke(49, 86, 146, 255);
  bezier(540, 155, 616, 50, 720, 50, 800, 20);

  // rect with cornner radius
  noStroke();
  fill(172, 59, 62);
  rect(140, 590, 70, 40, 50);

  noStroke();
  fill(241, 180, 51);
  circle(750, 720, 40);

  noStroke();
  fill(241, 180, 51);
  quad(750, 698, 800, 680, 800, 720, 752, 740);

}

