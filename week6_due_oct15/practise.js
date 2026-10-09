let lowerBound;
let upperBound;



function setup() {
  createCanvas(windowWidth, windowHeight);
  background('peach');
  lowerBound = width * 0.25;
  upperBound = width * 0.75;
}

const drawCircle = ( x= random(lowerBound, upperBound), y= random(lowerBound, upperBound ) => {
  noFill();
  circle(x, y, 100);
};

// 等于下面那个

function draw( x, y ) {
noFill();
circle(x, y, 100);

}
