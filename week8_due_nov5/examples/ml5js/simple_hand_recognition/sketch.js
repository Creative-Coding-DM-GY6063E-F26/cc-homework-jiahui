let vid;
let handPose;
let hands = [];

async function setup() {
  createCanvas(windowWidth,windowHeight);

  console.log("ml5 version:", ml5.version);
  vid = createCapture(VIDEO); 
  vid.size(320, 240);
  vid.hide();
  background(220);
  handPose = await ml5.handPose();
  handPose.detectStart(vid, gotHands);
}


function draw() {
  background(220);
}


function gotHands(results, err) {
  if (err) {
    console.error(err);
    return;
  }
  if(results.length > 0){
    hands = results;
    printFingerDataKey();
  }
}

function printFingerDataKey(){
  hands.forEach((hand, index) => {
    // each hand is an object, so Object.keys() gives us its property names
    // e.g. "keypoints", "handedness", "score", "index_finger_tip", ...
    for (let key of Object.keys(hand)) {
      console.log(index, key);
    }
  });
}