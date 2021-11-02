// scaleVars
const canvasWidth = 500;
const canvasHeight = canvasWidth;
const borderScale = 0.031;

// squareVars
let border = borderScale * canvasHeight;
let innersquarequad = ((1 - borderScale) * canvasWidth) / 4;

// arrays
let grid = [];
let antigrid = [];
let antiantigrid = [];
let tile1 = [];
let ranAntigrid;
let lost = "FALSE";

function clearArray() {
  grid = [];
  antigrid = [];
  antiantigrid = [];
  tile1 = [];
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(24);
  boardVectors();
  noLoop();
  console.log(antigrid)
  console.log(grid)
}

function draw() {
  drawBoard();
  draw1();
}

// grid[i].x is x coord, .y is y coord, .x is width/height
function boardVectors() {
  for (let i = 0; i < 4; i++) {
    grid.push(
      new p5.Vector(
        border,
        border + innersquarequad * i,
        innersquarequad - border
      )
    );
  }
  for (let i = 0; i < 4; i++) {
    grid.push(
      new p5.Vector(
        border + innersquarequad,
        border + innersquarequad * i,
        innersquarequad - border
      )
    );
  }
  for (let i = 0; i < 4; i++) {
    grid.push(
      new p5.Vector(
        border + innersquarequad * 2,
        border + innersquarequad * i,
        innersquarequad - border
      )
    );
  }
  for (let i = 0; i < 4; i++) {
    grid.push(
      new p5.Vector(
        border + innersquarequad * 3,
        border + innersquarequad * i,
        innersquarequad - border
      )
    );
  }
  for (let i = 0; i < 16; i++) {
    antigrid.push(
      new p5.Vector(
        grid[i].x,
        grid[i].y,
        grid[i].z
      )
    )
  }
}

function drawBoard() {
  background("#bbada0");
  fill("#ccc1b4");
  noStroke();
  for (let i = 0; i < 16; i++) {
    // background grid
    rect(grid[i].x, grid[i].y, grid[i].z, grid[i].z, 3.8);
  }
}

function RandomizeAntiGrid() {
  if (antigrid.length === 0) {
    fill("red")
    textSize(32)
    text("you lose LLL", canvasWidth/3, canvasWidth/2)
    lost = "TRUE"
  } else {
    ranAntigrid = round(random(0, antigrid.length - 1));
    console.log(ranAntigrid);
    console.log(antigrid[ranAntigrid])
  }
}

function draw1() {
  if (lost === "FALSE") {
    RandomizeAntiGrid();

    console.log("current antigrid length " + antigrid.length);

    tile1.push(new p5.Vector(antigrid[ranAntigrid].x, antigrid[ranAntigrid].y, antigrid[ranAntigrid].z));

    for (i = 0; i < tile1.length; i++) {
      console.log("tile1's " + tile1[i])
    }

    for (let i = 0; i < tile1.length; i++) {
      fill("#ede5da");
      rect(tile1[i].x, tile1[i].y, tile1[i].z, tile1[i].z, 3.8); // drawing 1
      fill("#776e64");
      textSize(16)
      text("1", tile1[i].x + tile1[i].z / 2, tile1[i].y + tile1[i].z / 2);
    }
    // tile1.pop();

    antiantigrid.push(new p5.Vector(antigrid[ranAntigrid].x, antigrid[ranAntigrid].y, antigrid[ranAntigrid].z))

    antigrid.splice(ranAntigrid, 1)
    if (antigrid.length === 0) {
      RandomizeAntiGrid()
    }
  } else if (lost === "TRUE") {
    tile1 = []
    for (let i = 0; i < 16; i++) {
      antigrid.push(
        new p5.Vector(
          grid[i].x,
          grid[i].y,
          grid[i].z
        )
      )
      lost = "FALSE"
    }
  }
}

function mousePressed() {
  if (lost === "FALSE") {
    redraw();
  }
}

function keyPressed() {
  if (keyCode === 82) {
    // has to do it twice cuz of loss detection idfk what im doing
    clear()
    clearArray()
    setup()
    redraw()
    clear()
    clearArray()
    setup()
    redraw()
  }
}
