// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
const quotes = [
  { text: "a process, based on exploration, iteration, reflection and discovery", source: "Mark Mitchell"},
  { text: "a School of Thought", source: "Tim Rodenbröker", link: "https://trcc.timrodenbroeker.de/what-is-creative-coding/"},
  { text: "a deliberate act of letting go and seeing where the process takes you", source: "patrik hubner", link: "https://www.patrik-huebner.com/datadesigndictionary/creative-coding/" },
  { text: "a loosely defined term used to describe a wide range of \nartistic practices that use computer code as a medium", source: "Raphaël de Courville", link: "https://hackmd.io/@creativecodeberlin/H1FAx6rJO" },
  { text: "simply the art of creating visualizations or expression", source: "Donovan Alexander", link: "https://interestingengineering.com/culture/everything-you-need-to-know-about-the-artistic-world-of-creative-coding" },
  { text: "is concerned with the exploration of the expressive possibilities of code", source: "Michael Thompson", link: "https://design-encyclopedia.com/?E=427626" },
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable tht holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(millis());
  pickQuote(); // calls the function to pick a quote
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))]; 
}

function draw() {
  background(255, 242, 210);
  drawQuote(); // draw the quote on screen
}

function drawQuote() {
  // draw text
  fill(126, 51, 51);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Creative Coding is.....", width / 2, height / 2 - 100);
  textStyle(BOLD);
  textSize(40);           
  text("“" + current.text + "”", width / 2, height / 2 - 20);
  textAlign(RIGHT, CENTER);
  textSize(24);
  text("-" + current.source, width - 100, height - 100);
  textSize(12);
  text(current.link, width - 100, height - 70);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote(); 
}