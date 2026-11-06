let vid;
let handPose;
let hands = [];

let brushType = "circle"; // Default brush type
let brushes = ["circle", "text"];
let brushIndex = 0; // Index to track the current brush

let brushSize = 35; // Default brush size
let brushColor;

let fingerX = 0;
let fingerY = 0;
let fingerVisible = false;

let lastX = null;
let lastY = null;

let smoothX = 0;
let smoothY = 0;
let hasSmoothPoint = false;

let trailLayer;

let bubbles = [];
let bubbleMode = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  brushColor = color(20);

  vid = createCapture(VIDEO);
  vid.size(320, 240);
  //vid.hide();
  
  trailLayer = createGraphics(width, height);
  trailLayer.clear();

  console.log("ml5 version:", ml5.version);
  handPose = await ml5.handPose();
  console.log("handPose model loaded!");
  handPose.detectStart(vid, gotHands);
}

function draw() {
  background(20);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(vid, 0, 0, width, height);
  pop();

  image(trailLayer, 0, 0);

  if (fingerVisible) {
    if (!hasSmoothPoint) {
      smoothX = fingerX;
      smoothY = fingerY;
      hasSmoothPoint = true;
    }

smoothX = lerp(smoothX, fingerX, 0.2);
smoothY = lerp(smoothY, fingerY, 0.2);

let x = smoothX;
let y = smoothY;

if (lastX === null){
  stampBrush(x, y);
}
else{
  drawBrushAlongPath(lastX, lastY, x, y);
}
lastX = x;
lastY = y;

  } else {
    lastX = null;
    lastY = null;
    hasSmoothPoint = false;
  }

  bubbles.forEach(drawBubble);
  bubbles = bubbles.filter(b => b.y > -b.size && b.alpha > 0);

noStroke();
fill(255);
textSize(24);
textAlign(LEFT, TOP);

text("Brush: " + brushes[brushIndex], 20, 20);
  text("P: Change brush", 20, 45);
  text("B: Bubble effect " + (bubbleMode ? "ON" : "OFF"), 20, 70);
  text("SPACE: Clear canvas", 20, 95);

}

function gotHands(results, err) {

  if (err) {
    console.error(err);
    return;
  }

  hands = results;
  if (hands.length > 0) {
    let hand = hands[0];
    let finger = getIndexFinger(hand);
    if (finger) {
      fingerX = map(finger.x, 0, vid.width, width, 0);
      fingerY = map(finger.y, 0, vid.height, 0, height);
      fingerVisible = true;
    } else {
      fingerVisible = false;
    }
  }
   else {
    fingerVisible = false;
  }
}

function getIndexFinger(hand) {

  for (let key of Object.keys(hand)) {

    if (key.includes("index_finger_tip")) {

      let finger = hand[key];

      if (finger) {
        return finger;
      }

    }

  }

  return null;

}


function drawBrushAlongPath(x1, y1, x2, y2) {

  let distance = dist(x1, y1, x2, y2);

  let spacing = brushIndex === 0 ? 8 : 90;

  let steps = floor(distance / spacing);

  for (let i = 1; i <= steps; i++) {

    let t = i / steps;

    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);

    stampBrush(x, y);

  }

}

function stampBrush(x, y) {

  trailLayer.push();

  trailLayer.noStroke();
  trailLayer.fill(brushColor);

  // Brush Circle
  if (brushIndex === 0) {

    trailLayer.circle(x, y, brushSize);

  }

  // Brush Text
  if (brushIndex === 1) {

    trailLayer.textAlign(CENTER, CENTER);
    trailLayer.textSize(22);

    trailLayer.text(
      "zhangjiahui",
      x,
      y
    );

  }

  trailLayer.pop();

  // Create bubbles if bubble mode is ON
  if (bubbleMode) {

    bubbles.push({

      x: x,
      y: y,

      type: brushes[brushIndex],

      size: brushSize,

      speed: random(1, 3),

      drift: random(-0.6, 0.6),

      alpha: 200

    });

  }

}

function drawBubble(b) {

  push();

  // Bubble movement
  b.y -= b.speed;
  b.x += b.drift;

  b.alpha -= 0.8;

  // Circle bubbles
  if (b.type === "circle") {

    noFill();

    stroke(255, b.alpha);
    strokeWeight(1.5);

    circle(
      b.x,
      b.y,
      b.size
    );

  }

  // Text bubbles
  if (b.type === "text") {

    noStroke();

    fill(255, b.alpha);

    textAlign(CENTER, CENTER);
    textSize(18);

    text(
      "zhangjiahui",
      b.x,
      b.y
    );

  }

  pop();

}


// -------------------------
// KEYBOARD CONTROLS
// -------------------------

function keyPressed() {

  // P: Switch brush
  if (key === "p" || key === "P") {

    brushIndex = (brushIndex + 1) % brushes.length;

  }


  // B: Toggle bubble effect
  if (key === "b" || key === "B") {

    bubbleMode = !bubbleMode;

  }


  // Space: Clear drawing
  if (keyCode === 32) {

    trailLayer.clear();

    bubbles = [];

    lastX = null;
    lastY = null;

  }

}


// -------------------------
// RESIZE
// -------------------------

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  trailLayer = createGraphics(width, height);

}