// ScaleVars
const canvasWidth = 500
const canvasHeight = canvasWidth
const borderScale = 0.031

// squareVars
let border = (borderScale * canvasHeight)
let innersquarequad = (((1-borderScale)*canvasWidth)/4)

// Arrays
let grid = []
let antigrid = []
let tile1 = []

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(4);
  boardVectors()
  noLoop()
}

function draw() {
  drawBoard()
  draw1()
  draw3()
  //console.log(antigrid)
}

// grid[i].x is x coord, .y is y coord, .x is width/height
function boardVectors() {
  grid.push(new p5.Vector(0,0))
  antigrid.push(new p5.Vector(0,0))
  for (let i = 0; i < 4; i++) {
    grid.push(new p5.Vector((border), (border + innersquarequad * i), (innersquarequad) - (border)))
    antigrid.push(new p5.Vector((border), (border + innersquarequad * i), (innersquarequad) - (border)))
  }
  for (let i = 0; i < 4; i++) {
    grid.push(new p5.Vector((border + innersquarequad), (border + innersquarequad * i), (innersquarequad) - (border)))
    antigrid.push(new p5.Vector((border + innersquarequad), (border + innersquarequad * i), (innersquarequad) - (border)))
  }
  for (let i = 0; i < 4; i++) {
    grid.push(new p5.Vector((border + innersquarequad * 2), (border + innersquarequad * i), (innersquarequad) - (border)))
    antigrid.push(new p5.Vector((border + innersquarequad * 2), (border + innersquarequad * i), (innersquarequad) - (border)))
  }
  for (let i = 0; i < 4; i++) {
    grid.push(new p5.Vector((border + innersquarequad * 3), (border + innersquarequad * i), (innersquarequad) - (border)))
    antigrid.push(new p5.Vector((border + innersquarequad * 3), (border + innersquarequad * i), (innersquarequad) - (border)))
  }
}

function drawBoard() {
  background("#bbada0")
  fill("#ccc1b4")
  noStroke()
  for (let i = 1; i < 17; i++) { // background grid
    rect(grid[i].x, grid[i].y, grid[i].z, grid[i].z, 3.8)
  }
}

function draw1() {
  let random1tile1 = round(random(1,16))
  let random1tile2 = round(random(1,16))
  if (random1tile1 === random1tile2) {
    while (random1tile1 === random1tile2) {
      random1tile2 = round(random(1,16))
    }
  }
  let newrandom1tile =
  tile1.push(new p5.Vector(grid[random1tile1].x, grid[random1tile1].y, grid[random1tile1].z))
  tile1.push(new p5.Vector(grid[random1tile2].x, grid[random1tile2].y, grid[random1tile2].z))
  for (let i = 0; i < tile1.length; i++) {
  fill("#ede5da")
  rect(tile1[i].x, tile1[i].y, tile1[i].z, tile1[i].z, 3.8)
  fill("#776e64")
  text('1', tile1[i].x + (tile1[i].z/2), tile1[i].y + (tile1[i].z/2));
}
  tile1.pop()
  tile1.pop()
}

function draw3() {

}

function mousePressed() {
  redraw();
}
