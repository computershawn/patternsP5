/*
Thanks to
  * Matthew Epler (https://mepler.com/) for the generative shapes tutorial
  * Ruth Lin (https://ruthl.in/) of RISD, whose design project inspired this
  * P5.js (https://p5js.org/) for making it easy to code graphics for the web
*/

const SCALE = .5
let crystalSize

let crystal0, crystal1
let rectGrid1 = [], rectGrid2 = []
let triangleGrid1, triangleGrid2
let triGridSide = 72 // Length of a triangle side when using triangle grid
let l
let n = 5 // Rows and columns when using rectangle grid
let d = 160 // Horiz/vert distance between shapes when using rectangle grid
let gridType = "rec"
let layerStatus = [true, true]
let bgColor = '#1c1c1c'

function setup() {
  const w = 600
  const h = 600
  let cnv = createCanvas(w, h, SVG)

  l = SCALE * (n-1) * d / 2

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      rectGrid1.push([i * d * SCALE, j * d * SCALE])
      if(i < n-1 && j < n-1) rectGrid2.push([i * d * SCALE, j * d * SCALE])
    }
  }

  let triGridCols = 6   // Number of cols in triangle grid
  let triGridRows = 7   // Number of rows in triangle grid
  triangleGrid1 = getTriangleGrid(w, h, triGridCols, triGridRows, triGridSide, true)
  triangleGrid2 = getTriangleGrid(w, h, triGridCols, triGridRows, triGridSide, false)

  let selDefault = 4
  select0.value = selDefault

  crystalSize = randomCrystalSize()
  crystal0 = new Crystal(selDefault)
  crystalSize = randomCrystalSize()
  crystal1 = new Crystal(selDefault)

  rectMode(CENTER)
  noLoop()
}

function refreshShapes(evt) {
  let s = parseInt(document.getElementById('select0').value);
  crystalSize = randomCrystalSize()
  crystal0 = new Crystal(s)
  crystalSize = randomCrystalSize()
  crystal1 = new Crystal(s)
  redraw()
}

const randomCrystalSize = () => {
  return SCALE * 10 * round(random(4, 12))
}

function refreshGrid(evt) {
  gridType = evt.target.value
  redraw()
}

function refreshLayers(evt) {
  let layerNumber = evt.target.value
  let newStatus = evt.target.checked
  layerStatus[layerNumber] = newStatus
  redraw()
}

function exportSVG() {
  let d = new Date()
  let filename = `sketch-${Math.round(d.getTime()/1000).toString()}.svg`
  saveSVG(filename)
}

function renderGridRec() {
  // Layer 1
  if(layerStatus[0]) {
    push()
    translate(width/2-l, height/2-l)
    for(let c of rectGrid1) {
      crystal0.render(c[0], c[1])
    }
    pop()
  }

  // Layer 2
  if(layerStatus[1]) {
    push()
    translate(width/2-l+SCALE*d/2, height/2-l+SCALE*d/2)
    for(let c of rectGrid2) {
      crystal1.render(c[0], c[1])
    }
    pop()
  }
}

function renderGridTri() {
  // Layer 1
  if(layerStatus[0]) {
    triangleGrid1.map(item=>crystal0.render(item[0], item[1]))
  }

  // Layer 2
  let dx = triGridSide/2, dy = dx * Math.tan(radians(30))
  if(layerStatus[1]) {
    triangleGrid2.map(item=>crystal1.render(dx + item[0], dy + item[1]))
  }
}




////////////////

function draw() {
  background(bgColor)
  switch(gridType) {
    case "rec":
      renderGridRec()
      break
    case "hex":
      renderGridTri()
      break
    default:
      renderGridRec()
  }
}
