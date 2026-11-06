/**
 * 
 * A simple drawing machine that draws circles when the mouse is pressed.
 * 
 */

let colors = ["darkred", "lightblue"]// or [color("red"), color("lightblue")]

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(225);
}


function draw() {

let i = map(mouseY, 0, height, 0, 1)
let circleColor = lerpColor(color(colors[0]), color(colors[1]), i);// or (color[0], color[1], i)

 let circleSize = map(mouseX, 0, width, 1440, 0);
 //let circleColor = map(mouseY, 0, height, 0, 255);


  noStroke(); 
  fill(circleColor);

  if (mouseIsPressed) {
    circle(mouseX, mouseY, circleSize);
  }
}

function keyPressed() {

  // console.log(keyCode);// you can see the keyCode in the console when you press a key
 if (keyCode === 32) { //32 is stand for spacebar, each key has a code(more precise); Check if the spacebar is pressed
    background(225);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// Exercises for you to try :
// 1. Use mouseX or mouseY to change the circle's size or color as you draw.
//    Hint: map(mouseX, 0, width, 5, 100)

