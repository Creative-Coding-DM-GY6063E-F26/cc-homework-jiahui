/**
 *
 * A simple drawing machine that draws circles when the mouse is pressed.
 * Keyboard modifiers change how the circles are drawn:
 *   j - cycle through circle diameters
 *   k - cycle through circle colors
 *   l - toggle noise-based positioning (circles wobble around the mouse)
 *   spacebar - clear the canvas
 *
 */
let sizes1 = [0.02, 0.0625, 0.12]; // diameters as a fraction of canvas width
let sizeIndex1 = 1;

let sizes2 = [100, 200, 500];
let sizeIndex2 = 0

let colors = ['black', 'orange', 'mediumseagreen', 'steelblue'];
let colorIndex = 0;

let useNoise = false;
let noiseAmount = 500; // max distance (in pixels) noise can push a circle
let noiseTime = 0;

let shapes = ["circle", "rectangle"]
let shapeIndex = 0


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  noStroke();
  fill(colors[colorIndex]);

  if (mouseIsPressed) {
    let x = mouseX;
    let y = mouseY;

if (shapeIndex === 0){
  circle(x, y, width * sizes1[sizeIndex1]);
}


if (shapeIndex === 1){
  rectMode(CENTER)
  rect(mouseX, mouseY, sizes2[sizeIndex2], sizes2[sizeIndex2])
}

    if (useNoise) {
      // noise() returns 0-1, so map it to -noiseAmount..noiseAmount
      x += map(noise(noiseTime), 0, 1, -noiseAmount, noiseAmount);
      y += map(noise(noiseTime + 1000), 0, 1, -noiseAmount, noiseAmount);
      noiseTime += 0.05;
    }

  }
}

function keyPressed() {
  if (keyCode === 32) { // Check if the spacebar is pressed
    background(220);
  }

  if (key === 'j') {
    sizeIndex1 = (sizeIndex1 + 1) % sizes1.length; // wrap back to 0 at the end
  }

 if (key === 't') {
    sizeIndex2 = (sizeIndex2 + 1) % sizes2.length; // wrap back to 0 at the end
  }

  if (key === 'k') {
    colorIndex = (colorIndex + 1) % colors.length;
  }

  if (key === 'l') {
    useNoise = !useNoise;
  }
 
  if (key === "s"){
 shapeIndex = (shapeIndex + 1) % shapes.length;
  }


}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Exercises for you to try :
// 1. Add a new key that changes something else about the brush, like
//    switching between circles and squares, or turning stroke on/off.
// 2. Use the arrow keys to make the brush bigger or smaller one step at a
//    time instead of cycling. Hint: keyCode === UP_ARROW
// 3. Press 's' to save your drawing as an image with saveCanvas().
