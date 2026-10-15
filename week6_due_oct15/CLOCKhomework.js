let squareLayer;
let lastColorChange=-1;
let lastSecond=-1
let blockLayer22_24;
let blockLayer24_3;
let blockLayer18_22;

function setup() {
  createCanvas(800, 800);

blockLayer22_24=createGraphics(800, 800);
blockLayer24_3=createGraphics(800, 800);
blockLayer18_22=createGraphics(800, 800);
blockLayer22_24.noStroke();
blockLayer24_3.noStroke();
blockLayer18_22.noStroke();


  // 22-24 blocks
let blockSize=20
  for (let y=600; y<800; y+=blockSize){
    for(let x=0; x<200; x+=blockSize){
      blockLayer22_24.fill(random(220, 255), random(85, 190), random(60, 160));
      blockLayer22_24.rect(x, y, blockSize, blockSize);
    }
  }


  // 24-3 blocks
  for (let y=300; y<600; y+=blockSize){
    for(let x=0; x<200; x+=blockSize){
      blockLayer24_3.fill(random(210, 245), random(180, 230), random(80, 130));
      blockLayer24_3.rect(x, y, blockSize, blockSize);
    }
  }

// 18-22 BLOCKS
  let blockSize2=45
  for (let y=600; y<800; y+=blockSize2){
    for(let x=200; x<800; x+=blockSize2){
      blockLayer18_22.fill(random(160, 230), random(180, 210), random(130, 200));
      blockLayer18_22.rect(x, y, blockSize2, blockSize2);
    }
  }
  
}

function draw(){
  background(255, 25);



  // NORMAL CLOCK
  //let now = new Date();
  //let currentTime =
  //now.getHours()*60 +
  //now.getMinutes() +
  //now.getSeconds()/60;
  

 
  
  // QUICK REVIEW WITH MOUSE
   let currentTime=map(mouseX, 0, width, 0, 1440);


// Draw region 3–10
fill(62, 91, 110);
rect(0, 0, 200, 300);

let progress2= (currentTime-180)/420;
progress2= constrain(progress2, 0, 1);

noStroke();
fill(255);
rect(0, 0+300*(1-progress2), 200, 300*progress2);
  

// Draw region 10–12
fill(208, 221, 226);
rect(200, 0, 150, 200);

let progress3 = (currentTime - 600)/120;
progress3= constrain(progress3, 0, 1);

noStroke();
fill(255);
rect(200, 0, 150*progress3, 200);
  
  
// Draw region 12-18
fill(124, 206, 208);
 beginShape();
  vertex(350, 0);
  vertex(800, 0);
  vertex(800, 600);
  vertex(600, 600);
  vertex(600, 200);
  vertex(350, 200);
  endShape(CLOSE);

let progress4 = (currentTime - 720)/360;
  progress4 = constrain(progress4, 0, 1);
  if (progress4<0.5) {
    let topP=progress4*2;


noStroke();
fill(255);
rect(350, 0, 450*topP, 200);
  }

  else {
    fill(255);
    rect(350, 0, 450, 200);
    let sideP=(progress4-0.5)*2
    rect(600, 200, 200, 400*sideP)
  }  
  
// Draw region 18–22
fill(254, 237, 144);
rect(200, 600, 600, 200);

  image(blockLayer18_22, 0, 0);

let progress5 = (currentTime - 1080)/240;
progress5 = constrain(progress5, 0, 1);

noStroke();
fill(255);
rect(200+600 *(1-progress5), 600, 600*progress5, 200);
  

// Draw region 22–24
//fill(249, 36, 90);
rect(0, 600, 200, 200);

image(blockLayer22_24, 0, 0);

let progress6 = (currentTime - 1320) / 120;
progress6 = constrain(progress6, 0, 1);

noStroke();
fill(255);
rect(200 *(1-progress6), 600, 200*progress6, 200);


// Draw region 24–3
//fill(255, 253, 184);
rect(0, 300, 200, 300);

image(blockLayer24_3, 0, 0);

let progress7 = currentTime/ 180;
progress7 = constrain(progress7, 0, 1);

noStroke();
fill(255);
rect(0, 300+300*(1-progress7), 200, 300*progress7);



 
  
// 3-18 counting circle
  if (currentTime>=180 && currentTime<1080){
      noFill();
      stroke(215);
      strokeWeight(5);
    //let s = 300 + sin(millis() * TWO_PI/1000)* 30;
  //circle(400, 400, s);

    let s = second();
    let circleSize=s*6.6;
    circle(400, 400, circleSize);
  }

    // 18-22 breathing circle
  else if (currentTime >= 1080 && currentTime < 1320) {
    let currentInterval=Math.floor(second()/5);
    if(currentInterval != lastColorChange){
      circleColor=color(random(125, 250), random(180, 230), random(190,255));
      lastColorChange=currentInterval;
    }
    
    //noFill();
    fill(circleColor);
    let s = 300 + sin(millis() * TWO_PI/1000)* 30;
  circle(400, 400, s);
  }

    // 22-3 breathing circle
  else if (currentTime >= 1320 && currentTime < 1440) {
    if (second() !=lastSecond){
      circleColor=color(random(125, 250), random(180, 230), random(190,255));
      lastSecond=second();
    }
      //noFill();
      fill(circleColor);
    
      let s = 300 + sin(millis() * TWO_PI/1000)* 80;
      circle(400, 400, s);
  }
    
 else if (currentTime >= 0 && currentTime < 180) {
    if (second() !=lastSecond){
      circleColor=color(random(125, 250), random(180, 230), random(190,255));
      lastSecond=second();
    }
      //noFill();
      fill(circleColor);
    
      let s = 300 + sin(millis() * TWO_PI/1000)* 80;
      circle(400, 400, s);

    
  }


  
  // sections
noFill();
  stroke(230);
  strokeWeight(1);
  // 3-10
  rect(0, 0, 200, 300)
  // 10-12
  rect(200, 0, 150, 200)
  // 12-18
  beginShape();
  vertex(350, 0);
  vertex(800, 0);
  vertex(800, 600);
  vertex(600, 600);
  vertex(600, 200);
  vertex(350, 200);
  endShape(CLOSE);
  // 18-22
  rect(200, 600, 600, 200);
  // 22-24
  rect(0, 600, 200, 200);
  // 24-3
  rect(0, 300, 200, 300);

  
}