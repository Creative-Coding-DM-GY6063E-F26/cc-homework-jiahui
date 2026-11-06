
// Because I mirrored the image,
// so right and left of your hands should be reversed in real world
//For people who understand Chinese, it can also be a word puzzle

let video;

// FaceMesh
let faceMesh;
let faces = [];
let modelReady = false;
let mouthWasOpen = false;

// HandPose
let handPose;
let hands = [];
let handModelReady = false;

let characters = [
  "口", "玉", "𠃌", "冫", "正", "攵", "一", "夕", "匕",
  "又", "亦", "巳", "廾", "爪", "冖", "𠂇", "又"
];

let fallingTexts = [];
let pile = [];

let gravity = 0.08;
let mouthThreshold = 0.045;

let draggedText = null;

const PINCH_START_RATIO = 0.3;
const GRAB_RADIUS = 50;

//scale
const MIN_SCALE_PINCH_RATIO = 0.05;
const MAX_SCALE_PINCH_RATIO = 2;
const MIN_TEXT_SCALE = 0.5;
const MAX_TEXT_SCALE = 5.0;

async function setup() {
  await ml5.setBackend("webgl");

  createCanvas(1345, 780);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh = await ml5.faceMesh({
    maxFaces: 1,
    flipped: true
  });
  faceMesh.detectStart(video, gotFaces);
  modelReady = true;

  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
  handModelReady = true;

}

function gotFaces(results) {
  faces = results;
}

function gotHands(results) {
  hands = results;
  console.log("detectedhands：", hands);
}

function draw() {
  background(0);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  if (handModelReady) {
    processHandGestures();
  }

  if (modelReady && faces.length > 0) {
    let face = faces[0];

    let upperLip = face.keypoints[13];
    let lowerLip = face.keypoints[14];
    let leftSide = face.keypoints[234];
    let rightSide = face.keypoints[454];

    let gap = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
    let faceWidth = dist(leftSide.x, leftSide.y, rightSide.x, rightSide.y);
    let ratio = gap / faceWidth;
    let isOpen = ratio > mouthThreshold;

  
    if (isOpen && !mouthWasOpen) {
      releaseCharacters();
    }

    mouthWasOpen = isOpen;
  } else {
    mouthWasOpen = false;
  }

  for (let i = fallingTexts.length - 1; i >= 0; i--) {
    let t = fallingTexts[i];

    t.vy += gravity;
    t.x += t.vx;
    t.y += t.vy;

    if (t.y >= height - t.size / 2) {
      t.y = height - t.size / 2;
      t.vy = 0;
      t.vx = 0;

      pile.push({
        word: t.word,
        x: t.x,
        y: t.y,
        size: t.size,
        scale: t.scale 
      });

      fallingTexts.splice(i, 1);
      continue;
    }

    fill(255);
    noStroke();
    textSize(t.size * t.scale); 
    text(t.word, t.x, t.y);
  }

  // 绘制已经落地的文字
  for (let t of pile) {
    fill(255);
    noStroke();
    textSize(t.size * t.scale); 
    text(t.word, t.x, t.y);
  }
}

function releaseCharacters() {
  let startX = width / 2;
  let startY = 100;

  if (faces.length > 0) {
    let mouth = faces[0].keypoints[13];

    startX = map(mouth.x, 0, 640, 0, width);
    startY = map(mouth.y, 0, 480, 0, height);
  }

  for (let i = 0; i < characters.length; i++) {
    fallingTexts.push({
      word: characters[i],
      x: startX + random(-20, 20),
      y: startY - i * 3,
      vx: random(-1, 1),
      vy: random(1, 3),
      size: 50,
      scale: 1 
    });
  }
}

function processHandGestures() {

  let rightHand = hands.find(item => item.handedness === "Right");
  let leftHand = hands.find(item => item.handedness === "Left");

  
  if (rightHand) {
    let keypoints = rightHand.keypoints;
    let thumb = keypoints[4];
    let indexFinger = keypoints[8];
    let palmWidth = getPalmWidth(rightHand);

    let pinchDistance = dist(
      thumb.x, thumb.y,
      indexFinger.x, indexFinger.y
    );

    let pinchRatio = pinchDistance / max(palmWidth, 1);

    if (pinchRatio < PINCH_START_RATIO) {
      let middleX = (thumb.x + indexFinger.x) / 2;
      let middleY = (thumb.y + indexFinger.y) / 2;
      let position = videoToCanvas(middleX, middleY);

      if (!draggedText) {
        draggedText = findNearestText(position.x, position.y);
      }

      if (draggedText) {
        draggedText.x = position.x;
        draggedText.y = position.y;
      }
    } else {
      draggedText = null;
    }
  } else {
    draggedText = null;
  }

  
  if (draggedText && leftHand) {
    let leftThumb = leftHand.keypoints[4];
    let leftIndexFinger = leftHand.keypoints[8];
    let leftPalmWidth = getPalmWidth(leftHand);

    let leftPinchDistance = dist(
      leftThumb.x, leftThumb.y,
      leftIndexFinger.x, leftIndexFinger.y
    );

    let leftPinchRatio = leftPinchDistance / max(leftPalmWidth, 1);

    
    let limitedRatio = constrain(
      leftPinchRatio,
      MIN_SCALE_PINCH_RATIO,
      MAX_SCALE_PINCH_RATIO
    );

    draggedText.scale = map(
      limitedRatio,
      MIN_SCALE_PINCH_RATIO,
      MAX_SCALE_PINCH_RATIO,
      MIN_TEXT_SCALE,
      MAX_TEXT_SCALE
    );
  }
}

function getPalmWidth(hand) {
  let keypoints = hand.keypoints;

  return dist(
    keypoints[5].x, keypoints[5].y,
    keypoints[17].x, keypoints[17].y
  );
}

function findNearestText(x, y) {
  let nearest = null;
  let nearestDistance = GRAB_RADIUS;

  for (let t of pile) {
    let d = dist(x, y, t.x, t.y);

    if (d < nearestDistance) {
      nearestDistance = d;
      nearest = t;
    }
  }

  return nearest;
}

function videoToCanvas(x, y) {
  return {
    x: map(x, 0, 640, width, 0),
    y: map(y, 0, 480, 0, height)
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


