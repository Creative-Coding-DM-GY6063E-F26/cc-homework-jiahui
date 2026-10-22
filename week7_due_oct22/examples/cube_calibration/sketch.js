let pMapper;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // create mapper object
  pMapper = createProjectionMapper(this);
  // create quad map
  quadMap = pMapper.createQuadMap(400,400);
  // loads calibration in the "maps" directory
  pMapper.load("maps/map.json");

}

function draw() {
  background(0);

  for(let _map in pMapper.surfaces){
    // displaySketch only passes pg to its callback, so wrap it to pass the index too
    pMapper.surfaces[_map].displaySketch((pg) => drawCoords(pg, _map));
  }
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
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(255, 255, 0),
    color(255, 0, 255),
    color(0, 255, 255)
  ];
  // mapIndex comes from a for...in loop, so it's a string like "0" — convert it to a number
  let bgColor = colors[int(mapIndex) % colors.length];
  pg.background(bgColor);
  pg.fill(0);

  for (let i = 0; i < 1000; i += 50) {
    pg.text(i, i, 150);
    pg.text(i, 150, i);
  }
  pg.fill(255);
  pg.ellipse(mouseX, mouseY, 50);
  pg.pop();
}