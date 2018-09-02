// function drawTestLines() {
//   let numShapes = randomSelectTwo() ? SIDES : SIDES*2
//   let layerColor = selectRandomFromPalette()
//
//   ellipse(width/2,height/2,CRYSTAL_SIZE,CRYSTAL_SIZE)
//   stroke(layerColor)
//   push()
//     const angle = TWO_PI/numShapes
//     translate(width/2, height/2)
//     for(let i=0; i < numShapes; i++) {
//       line(0,0,0,CRYSTAL_SIZE/2-4)
//       rotate(angle)
//     }
//   pop()
// }

// function doPolygon(x0, y0, radius) {
//   beginShape()
//   for(let i = 0; i < SIDES; i++) {
//     let angle = i * TWO_PI/SIDES
//     let posX = x0 + radius * cos(angle)
//     let posY = y0 + radius * sin(angle)
//     vertex(posX, posY)
//   }
//   endShape(CLOSE)
// }

const doPolygon = (x0, y0, radius, numSides) => {
  push()
  let s = parseInt(document.getElementById('select0').value);
  if(s === 3 || s === 12) rotate(radians(-30))
  if(s === 6) rotate(radians(60))

  beginShape()
  for(let i = 0; i < numSides; i++) {
    let angle = i * TWO_PI/numSides
    let posX = x0 + radius * cos(angle)
    let posY = y0 + radius * sin(angle)
    vertex(posX, posY)
  }
  endShape(CLOSE)
  pop()
}

const doTriangle = (center, radius, direction) => {
  let a0 = (direction > 0.5) ? 0 : TWO_PI/6
  let numPoints = 3
  beginShape();
  for(let i = 0; i < numPoints; i++) {
    vertex(center + radius * cos(i * TWO_PI/numPoints + a0), radius * sin(i * TWO_PI/numPoints + a0));
    endShape(CLOSE);
  }
}

const randomSelectTwo = () => {
  return (random(1) > 0.5)
}

const radians = (angleDegrees) => {
  return angleDegrees * Math.PI / 180
}

const selectRandomFromPalette = () => {
  let paletteSubset = palette.filter((c, i)=>colorsSelected[i])
  if(paletteSubset.length===0) {
    return color(255)
  }
  let rando = floor(random(0, paletteSubset.length))
  return paletteSubset[rando]
}




const layerConstructors = [
  {
    name: 'Outline Shape',
    init: (n) => new OutlineShape(n),
    weight: 0.3
  },
  {
    name: 'Centered Shape',
    init: (n) => new CenteredShape(n),
    weight: 0.3
  },
  {
    name: 'Circles',
    init: (n) => new Circles(n),
    weight: 0.5
  },
  {
    name: 'Simple Lines',
    init: (n) => new SimpleLines(n),
    weight: 0.3
  },
  {
    name: 'Dotted Lines',
    init: (n) => new DottedLines(n),
    weight: 0.3
  },
  {
    name: 'Ring of Shapes',
    init: (n) => new RingOfShapes(n),
    weight: 0.3
  },
  {
    name: 'Stepped Polygons',
    init: (n) => new SteppedPolygons(n),
    weight: 0.6
  }
]

// const getTriangleGrid = (wd, ht, cols, rows, sideLen) => {
// 	let dx = 1, dy = (dx/2)/Math.tan(radians(30))
// 	let x, y, pts = []
//   let w = (cols-1) * dx * sideLen
//   let h = (rows-1) * dy * sideLen
//   for(let i = 0; i < rows; i++) {
//     y = i * dy
//     let c = (i % 2 == 0) ? cols : cols - 1
//     for(let j = 0; j < c; j++) {
//       x = j * dx
//       if(i % 2 == 1) x += dx/2
//       pts.push([wd/2 + sideLen * x - w/2, ht/2 + sideLen * y - h/2])
//     }
//   }
// 	return pts
// }

const getTriangleGrid = (wd, ht, cols, rows, sideLen, outer) => {
	let dx = 1, dy = (dx/2)/Math.tan(radians(30))
	let x, y, pts = []
  let w = (cols-1) * dx * sideLen
  let h = (rows-1) * dy * sideLen
  let r = outer ? rows : rows - 1
  r = rows
  for(let i = 0; i < r; i++) {
    y = i * dy
    let c = (i % 2 == 0) ? cols : cols - 1
    if(!outer) {
      c = (i % 2 == 0) ? cols-1 : cols - 2
    }
    for(let j = 0; j < c; j++) {
      x = j * dx
      if(i % 2 == 1) x += dx/2
      pts.push([wd/2 + sideLen * x - w/2, ht/2 + sideLen * y - h/2])
    }
  }
	return pts
}
