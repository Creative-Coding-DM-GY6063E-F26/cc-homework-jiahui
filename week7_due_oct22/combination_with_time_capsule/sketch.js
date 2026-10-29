
let pMapper;
let videos = [];
let showVideos = false;

const SURFACE_COUNT = 11;

const videoFiles = [
  "assets/blanket.mp4",
  "assets/lashes.mp4",
  "assets/slippers.mp4",
  "assets/wrong_things.mp4",
  "assets/2.mp4",
  "assets/3.mp4",
  "assets/4.mp4",
  "assets/5.mp4"

];


const surfaceVideos = {
  0: 0,
  2: 1,
  3: 2,
  1: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,

};

function setup() {
  createCanvas(windowWidth, windowHeight + 200, WEBGL);


  pMapper = createProjectionMapper(this);


  let attempts = 0;

  while (
    pMapper.surfaces.length < SURFACE_COUNT &&
    attempts < SURFACE_COUNT
  ) {
    const before = pMapper.surfaces.length;

    pMapper.createQuadMap(400, 400);

    attempts++;

    
    if (pMapper.surfaces.length <= before) {
      console.error("Unable to create another Quad surface.");
      break;
    }
  }


  console.log("Surfaces before load:", pMapper.surfaces.length);

  if (pMapper.surfaces.length !== SURFACE_COUNT) {
    console.error(
      "Expected 11 surfaces, found:",
      pMapper.surfaces.length
    );
    return;
  }

  pMapper.load("maps/map.json");

  console.log("Calibration loaded.");


  for (const file of videoFiles) {
    const vid = createVideo(file);

    vid.hide();
    vid.elt.muted = true;
    vid.volume(0);

    videos.push(vid);
  }
}

function draw() {
  background(0);

  if (!pMapper || !pMapper.surfaces) {
    return;
  }

  pMapper.surfaces.forEach((surface, i) => {
    surface.displaySketch((pg) => {
      drawCoords(pg, i);
    });
  });
}

function drawCoords(pg, mapIndex) {
  pg.push();

  if (!showVideos) {
    
    pg.background(0);

    const centerX = pg.width / 2 - 380;
    const centerY = pg.height / 2 - 400;

    pg.noFill();
    pg.stroke(215);
    pg.strokeWeight(5);

    const s = Math.floor(millis() / 200);

    const circleSize1 = (s % 200) * 2;
    const delay = 30;

    const circleSize2 =
      Math.max(0, (s - delay) % 200) * 2;

    const circleSize3 =
      Math.max(0, (s - 2 * delay) % 200) * 2;

    pg.circle(centerX, centerY, circleSize1);
    pg.circle(centerX, centerY, circleSize2);
    pg.circle(centerX, centerY, circleSize3);

  } else {
    const videoIndex = surfaceVideos[mapIndex];
    const vid = videos[videoIndex];

    if (
      vid &&
      vid.elt.readyState >= 2 &&
      vid.elt.videoWidth > 0 &&
      vid.elt.videoHeight > 0
    ) {
      const vw = vid.elt.videoWidth;
      const vh = vid.elt.videoHeight;

      const baseScale = Math.min(
        pg.width / vw,
        pg.height / vh
      ) * 0.7;

let videoScale = 1;


if (videoIndex === 2) {
  videoScale = 0.8; 
}

if (videoIndex === 4) {
  videoScale = 0.6; 
}

if (videoIndex === 5) {
  videoScale = 0.6;  
}

if (videoIndex === 6) {
  videoScale = 0.7; 
}

if (videoIndex === 7) {
  videoScale = 0.6; 
}

const w = vw * baseScale * videoScale;
const h = vh * baseScale * videoScale;

let offsetX = 0;
let offsetY = 0;


if (videoIndex === 2) {
  offsetX = 85;  
  offsetY = 90;  
}

if (videoIndex === 4) {
  offsetX = 50;   
  offsetY = 70;   
}


if (videoIndex === 5) {
  offsetX = 70;   
  offsetY = 70;   
}

if (videoIndex === 6) {
  offsetX = 50;  
  offsetY = 70;  
}

if (videoIndex === 7) {
  offsetX = 50;   
  offsetY = 70;   
}

pg.imageMode(CORNER);
pg.image(
  vid,
  -w / 4 + offsetX,
  -h / 5 + offsetY,
  w,
  h
);


    } else {
      pg.background(0);
    }
  }

  pg.pop();
}

function keyPressed() {
  switch (key) {
    case "c":
      pMapper.toggleCalibration();
      break;

    case "f": {
      const fs = fullscreen();
      fullscreen(!fs);
      break;
    }

    case "l":
      pMapper.load("maps/map.json");
      break;

    case "s":
      pMapper.save();
      break;

    case "p":
      videos.forEach((vid) => {
        vid.elt.play().catch((err) => {
          console.warn("Video playback failed:", err);
        });
      });
      break;

    case "x":
      videos.forEach((vid) => vid.pause());
      break;

    case "o":
      showVideos = !showVideos;
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight + 200);
}
