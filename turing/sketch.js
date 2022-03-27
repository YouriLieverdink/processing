let cur = 0;
let state = 'return';
let data = [];

let frame = 0;
let step = 0;

let value = 0;

const size = 64;
const box = 27;

const distance = 33;
const rate = 16;

const speed = rate * 2;

/**
 * state: {
 *  symbol: [write, move, next]
 * }
 */
const instructions = {
  'write': {
    '1': ['0', 'left', 'write'],
    '0': ['1', 'right', 'return'],
  },
  'return': {
    '1': ['', 'right', 'return'],
    '0': ['', 'right', 'return'],
    '*': ['', 'left', 'write'],
  }
};

/**
 * The five possible actions of the machine.
 */
const actions = {
  read: () => {
    return data[cur];
  },
  write: (value) => {
    data[cur] = value;
  },
  left: () => {
    frame = -1;
  },
  right: () => {
    frame = +1;
  },
};

function setup() {
  createCanvas(270, 270);

  for (let i = 0; i < size; i++) {
    data.push('');
  }

  // So we start in the middle.
  cur = size / 2;

  // Set the initial instructions.
  data[cur] = '*';
  for (let i = cur - 1; i > cur - 9; i--) {
    data[i] = 0;
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // Execute the moves.
  if (step !== 0) {
    // To slow down the animations.
    if (step % speed === 0) {
      const symbol = actions.read();
      const row = instructions[state];

      const [write, move, next] = row[symbol];

      if (write) actions.write(write);
      if (move) actions[move]();

      state = next;
    }

    step++;
  }

  // Calculate the current value.
  const i = data.indexOf('*');
  const n = [...data].splice(i - 8, 8);

  value = parseInt(n.join(''), 2);

  // Draw the current value.
  text(value, 0, box * 2);

  // Draw the animations.
  if (frame !== 0) {
    if (abs(frame) === rate) {
      // The animation has finished, reset and move the cursor.
      cur += frame > 0 ? 1 : -1;
      frame = 0;
    }
    else {
      frame += frame > 0 ? 1 : -1;
    }
  }

  const offset = map(-frame, -rate, rate, -distance, +distance);

  for (let i = -5; i < 6; i++) {
    const x = map(i, -5, 5, -box * 6, box * 6) + offset;

    // Draw the boxes.
    rect(x, 0, box, box);

    // Draw the values.
    textSize(12);
    text(data[cur + i], x, 0);
  }

  // Draw the cursor.
  triangle(0, -box, 12, -box * 1.6, -12, -box * 1.6);
}

function keyPressed() {
  if (key === ' ') step++;
}