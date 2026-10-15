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


let x = 0;
let speed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

  function draw() {
    background(255, 215, 0);
    //let s = second();
    //let m = millis();
    //speed = s * 0.1;
    //position += speed;

    //console.log('second is' + s); 

    //position = s * 10;
    //let x = m % position;

   // x % 10; //0+1 limit a number

let m2 = minute();

//let mappedMinute = map(second()  % m2, 0, m2, 0, width);
fill(255,255,255);
  rect( width/2, height/2, frameCount % (width/2));
    //circle( (second()* 100) % (width/2), height/2, 100);
    //circle( width/2, height/2, mappedMinute + (frameCount % m2));


  }