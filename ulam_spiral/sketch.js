const stepSize = 8;

let x, y;
let px, py;

let current = 1;

let turnIn = 1;
let numberOfTurns = 0;
let direction = 0;

function isPrime(value) {
  if (value <= 1) return false;

  for (let i = 2; i < sqrt(value); i++) {
    if (value % i == 0) return false;
  }

  return true;
}

function setup() {
  createCanvas(500, 500);
  background(0);

  x = width / 2;
  y = height / 2;
}

function draw() {
  textSize(stepSize);
  textAlign("center", "center");
  fill(255);
  stroke(255);

  if (isPrime(current)) {
    circle(x, y, stepSize * 0.5);
  }

  line(x, y, px, py);

  px = x;
  py = y;

  switch (direction) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }

  if (current % turnIn === 0) {
    direction = (direction + 1) % 4;
    numberOfTurns++;

    if (numberOfTurns % 2 == 0) {
      turnIn++;
    }
  }

  current++;
}
