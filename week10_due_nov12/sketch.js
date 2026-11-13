let sounds = [null, null, null, null];
let vid;
let ml5handpose;
let hands = [];


async function setup() {
  createCanvas(400, 400);
    vid = createCapture(VIDEO, {flipped: true});
    ml5handpose = ml5.handPose();
    ml5handpose.detectStart(vid, gotHands);
    

  sounds[0] = await loadSound("test.mp3");
  sounds[1] = await loadSound("Dragon_wheeze.ogg");
  sounds[2] = await loadSound("De-Zirkus2.ogg");
  sounds[3] = await loadSound("Deep_twang_of_loose_bow_string.ogg");
}

function draw() {
  background(220);

  if(hands.length > 0) {
    let gesture = getGesture(hands[0]);
    if(gesture === 'pinch') {
      sounds[0].play();
    }else if(gesture === 'thumbs up') {
      sounds[1].play();
    }else if(gesture === 'thumbs down') {
      sounds[2].play();
    }
  }
}

function keyPressed() {
  if(! sounds[0]){
    return;
  }
  userStartAudio(); // browsers only allow audio after the user interacts with the page
  if(keyIsDown('a')){
    if(sounds[0])sounds[0].play();
  }

  if(keyIsDown('s')){
    if(sounds[1])sounds[1].play();
  }
  if(keyIsDown('d')){
    if(sounds[2])sounds[2].play();
  }
  if(keyIsDown('f')){
    if(sounds[3])sounds[3].play();
  }
}

function gotHands(results, err) {
  if (err) {
    console.error(err);
    return;
  }

  function fingersAreCurled(hand) {
  let curledCount = 0;

  fingers.forEach((finger) => {
    let tip = hand[finger + '_tip'];
    let joint = hand[finger + '_pip'];
    if (dist(tip.x, tip.y, hand.wrist.x, hand.wrist.y) < dist(joint.x, joint.y, hand.wrist.x, hand.wrist.y)) {
      curledCount++;
    }
  });

  if (curledCount === fingers.length) {
    return true;
  }
  return false;
}
}