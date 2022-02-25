const size = 32;
const n = 16;

/**
 * The position of the apple.
 */
let apple = {};

/**
 * A list with coordinates of the snake parts.
 */
let snake = [];

/**
 * The direction the snake is currently facing.
 */
let direction = 0;

/**
 * Creates a new snake.
 */
function createSnake() {
  //
  const x = width / 2;
  const y = height / 2;

  return [
    { x, y },
    { x: x - size, y },
    { x: x - size * 2, y },
  ];
}

/**
 * Creates a random position for the apple.
 */
function createRandomPos() {
  //
  x = floor(random(0, n)) * size;
  y = floor(random(0, n)) * size;

  return { x, y };
}

/**
 * Moves the snake.
 */
function moveSnake(snake) {
  //
  const tail = snake.pop();
  const head = snake[0];

  switch (direction) {
    case 0: {
      // Move right.
      tail.x = head.x + size;
      tail.y = head.y;
      break;
    }
    case 1: {
      // Move down.
      tail.x = head.x;
      tail.y = head.y + size;
      break;
    }
    case 2: {
      // Move left.
      tail.x = head.x - size;
      tail.y = head.y;
      break;
    }
    case 3: {
      // Move up.
      tail.x = head.x;
      tail.y = head.y - size;
      break;
    }
  }

  return [tail, ...snake];
}

/**
 * Checks whether the current state is valid.
 */
function isValid(snake) {
  // Check if the snake overlaps with itself.
  for (let i = 1; i < snake.length; i++) {
    //
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      //
      return false;
    }
  }

  // Check if the snake is out of bounds.
  if (snake[0].x < 0 || snake[0].x >= size * n) {
    //
    return false;
  }

  if (snake[0].y < 0 || snake[0].y >= size * n) {
    //
    return false;
  }

  return true;
}

/**
 * Handles the press of a key.
 */
function keyPressed({ key }) {
  //
  switch (key) {
    case "ArrowRight":
      if (direction === 2) return;
      direction = 0;
      break;
    case "ArrowDown":
      if (direction === 3) return;
      direction = 1;
      break;
    case "ArrowLeft":
      if (direction === 0) return;
      direction = 2;
      break;
    case "ArrowUp":
      if (direction === 1) return;
      direction = 3;
      break;
  }
}

function setup() {
  //
  createCanvas(size * n, size * n);
  frameRate(4);

  snake = createSnake();
  apple = createRandomPos();
}

function draw() {
  // Checks whether the snake ate the apple.
  if (apple.x === snake[0].x && apple.y === snake[0].y) {
    //
    snake.push(apple);
    apple = createRandomPos();
  }

  snake = moveSnake(snake);

  // Checks whether the snake is in a valid position.
  if (!isValid(snake)) {
    //
    snake = createSnake();
    apple = createRandomPos();
  }

  // Draws the grid.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //
      fill(255);
      stroke(220);
      square(i * size, j * size, size);
    }
  }

  // Draws the snake.
  for (let i = 0; i < snake.length; i++) {
    //
    const { x, y } = snake[i];

    fill(0, 128, 0);
    square(x, y, size);
  }

  fill(255, 0, 0);
  square(x, y, size);
}
