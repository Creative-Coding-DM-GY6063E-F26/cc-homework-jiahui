/**
 * 
 * A simple drawing machine that draws circles when the mouse is pressed.
 * 
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  noStroke(); 
  fill('peachpuff');

  if (mouseIsPressed) {
    circle(mouseX, mouseY, width*0.0625);
  }
}

function keyPressed() {
  if (keyCode === 32) { // Check if the spacebar is pressed
    background(220);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Exercises for you to try :
// 1. Use mouseX or mouseY to change the circle's size or color as you draw.
//    Hint: map(mouseX, 0, width, 5, 100)

