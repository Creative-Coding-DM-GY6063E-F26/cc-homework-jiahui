let pMapper;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // create mapper object
  pMapper = createProjectionMapper(this);
  // loads calibration in the "maps" directory
  pMapper.load("maps/map.json");

}

function draw() {
  background(0);

  pMapper.surfaces.forEach((surface, i) => {
    // displaySketch only passes pg to its callback, so wrap it to pass the index too
    surface.displaySketch((pg) => drawCoords(pg, i));
  });
}

function keyPressed() {
  switch (key) {
    case 'c':
      pMapper.toggleCalibration();
      break;
    case 'f':
      let fs = fullscreen();
      fullscreen(!fs);
      break;
    case "l":
      pMapper.load("maps/map.json");
      break;
    case 'q':
      pMapper.createQuadMap(400,400);
      console.log(pMapper.surfaces);
      break;
    case "s":
      pMapper.save();
      break;
  }
}
function drawCoords(pg, mapIndex) {
  pg.clear();
  pg.push();
  // one color per surface, wrapping around if there are more surfaces than colors
  let colors = [
    color(255, 234, 31),
    color(0, 255, 0),
    color(0, 0, 255)
  ];


  let bgColor = colors[mapIndex % colors.length];
  pg.background(bgColor);
  pg.fill(0);

if (mapIndex == 0) {
  pg.background(255, 234, 31);
 pg.fill(38, 162, 0);
  pg.circle(100, 100, 55);
  pg.circle(280, 100, 55);

  pg.fill(0);
  pg.circle(100, 100, 48);
  pg.circle(280, 100, 48);

  pg.noFill();
 // pg.stroke(0);
  pg.strokeWeight(10);
  pg.bezier(100, 160, 150, 180, 200, 180, 250, 160);
  
}
    
if (mapIndex == 1) {
pg.background(255, 234, 31);
}

if (mapIndex == 2) {
pg.background(255, 234, 31);
}

  for (let i = 0; i < 1000; i += 50) {
    pg.text(i, i, 150);
    pg.text(i, 150, i);
  }
  pg.fill(255);
  pg.ellipse(mouseX, mouseY, 50);
  pg.pop();
}