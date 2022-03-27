let points = [];
let primes = [];

let index = 0;

function preload() {
  primes = loadStrings('primes.txt');
}

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);

  points.push(new Point(primes[index], index / 4));

  for (const p of points) {
    p.draw();
  }

  index++;

  camera(0, 0, index * 4);
}