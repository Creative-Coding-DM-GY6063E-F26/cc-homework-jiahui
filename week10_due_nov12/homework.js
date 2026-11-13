// https://drive.google.com/drive/folders/18Utbc9u1pq2Bi4NfzgYYYXEJiwwtZVeZ?usp=drive_link

let sounds = [null, null, null, null, null, null, null, null, null];
let colorAlpha = [0,0,0,0,0,0,0,0,0];
let circleColor = [];

async function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  sounds[0] = await loadSound("sounds/825870__loudkevin__it-hums.mp3");
  sounds[1] = await loadSound("sounds/highheels.mp3");
  sounds[2] = await loadSound("sounds/vocal.wav");
  sounds[3] = await loadSound("sounds/Dragon_wheeze.ogg");
  sounds[4] = await loadSound("sounds/twang.mp3");
  sounds[5] = await loadSound("sounds/wooddrop.wav");
  sounds[6] = await loadSound("sounds/shutup2.mp3");
  sounds[7] = await loadSound("sounds/shutup1.mp3");
  sounds[8] = await loadSound("sounds/strange.wav");
}

function draw() {
  background(0);

  let x = [200, 125, 275, 125, 275, 125, 275, 200, 200];
  let y = [200, 125, 275, 275, 125, 200, 200, 125, 275];

  for (let i = 0; i < 9; i++) {
  if (colorAlpha[i] > 0) {
      noStroke();
      fill(circleColor[i], colorAlpha[i]);
      circle(x[i], y[i], 100);
      colorAlpha[i] = colorAlpha[i] - 10;
    }

    noStroke();
    circle(x[i], y[i], 45);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(i + 1, x[i], y[i]);
  }
}

function keyPressed() {
  if(! sounds[0]){
    return;
  }
    let i = Number(key) - 1;
    if (i < 0 || i >= 9) return;
    
  userStartAudio(); // browsers only allow audio after the user interacts with the page
  if(keyIsDown('1')){
if(sounds[0])sounds[0].play();
}
if(keyIsDown('2')){
if(sounds[1])sounds[1].play();
}
if(keyIsDown('3')){
if(sounds[2])sounds[2].play();
}
if(keyIsDown('4')){
if(sounds[3])sounds[3].play();
}
if(keyIsDown('5')){
if(sounds[4])sounds[4].play();
}
if(keyIsDown('6')){
if(sounds[5])sounds[5].play();
}
if(keyIsDown('7')){
if(sounds[6])sounds[6].play();
}
if(keyIsDown('8')){
if(sounds[7])sounds[7].play();
}
if(keyIsDown('9')){
if(sounds[8])sounds[8].play();
}

  colorAlpha[i] = 180;
  circleColor[i] = color(random(255), random(255), random(255));
}