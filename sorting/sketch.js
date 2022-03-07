function bubble(index, values) {
  //
  index = index % values.length;

  let i = index;
  let j = index + 1;

  if (values[i] > values[j]) {
    [values[i], values[j]] = [values[j], values[i]];
  }

  return values;
}

let values = [];
let index = 0;

function setup() {
  //
  createCanvas(400, 400);

  for (let i = 0; i < 12; i++) {
    values.push(i + 1);
  }

  values = shuffle(values);
}

function draw() {
  //
  background(220);

  if (isSorted(values)) {
    noLoop();
  }

  let w = width / values.length;

  for (let i = 0; i < values.length; i++) {
    // Determine the height of the bar.
    let h = map(values[i], 0, max(values), 0, height / 2);

    rect(i * w, 0, w, h);
  }

  values = bubble(index, [...values]);
  index++;
}

function isSorted(values) {
  //
  for (let i = 0; i < values.length - 1; i++) {
    //
    if (values[i] > values[i + 1]) {
      return false;
    }
  }

  return true;
}
