class Layer {
  constructor (n) {
    this.sides = n
    this.numShapes = this.sides
    this.angle = TWO_PI/this.numShapes
    this.stepsOut = 8
    this.singleStep = (CRYSTAL_SIZE/2) / this.stepsOut
    this.thinStroke = 2
    this.layerColor = selectRandomFromPalette()
  }
}

/*
 *  THIS CLASS DRAWS A FLORET OF CIRCLES
 */
class Circles extends Layer {
  constructor (n) {
    super(n)
    this.shapeSize = (CRYSTAL_SIZE / 2) * random(0.93-.5, 0.93+.5)
    this.position = (CRYSTAL_SIZE / 2) - this.shapeSize / 2 * random(0.8, 1.2)
  }
  render () {
    strokeWeight(1)
    stroke(this.layerColor)
    noFill()
    push()
    if(this.numShapes === 3) rotate(radians(90))
    for(let i = 0; i <= this.numShapes; i++) {
      ellipse(this.position, 0, this.shapeSize, this.shapeSize)
      rotate(this.angle)
    }
    pop()
  }
}


/*
 *  THIS CLASS DRAWS n OR 2*n LINES IN AN ASTERISK SHAPE
 */
class SimpleLines extends Layer {
  constructor (n) {
    super(n)
    this.numSteps = randomSelectTwo() ? this.stepsOut : floor(this.stepsOut * 1.25)
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2
    this.angle = TWO_PI/this.numShapes
    this.step = (CRYSTAL_SIZE/2) / this.numSteps
    this.start = floor(random(0, this.numSteps))
    this.stop = floor(random(this.start, this.numSteps + 1))
    this.weight = this.thinStroke
  }
  render () {
    if(this.start != this.stop) {
      strokeWeight(this.weight)
      stroke(this.layerColor)
      noFill()
      push()
      if(this.sides === 3) rotate(radians(90))
      for(let i=0; i < this.numShapes; i++) {
        line(this.start * this.step, 0, this.stop * this.step, 0)
        rotate(this.angle)
      }
      pop()
    }
  }
}


/*
 *  THIS CLASS DRAWS 6 OR 12 DOTTED LINES IN AN ASTERISK SHAPE
 */
class DottedLines extends Layer {
  constructor (n) {
    super(n)
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2
    this.angle = TWO_PI/this.numShapes
    this.shapeSize = SCALE * 2
    this.centerOffset = this.singleStep
    // this.stepColors = []
    // for(let i = 0; i < this.numShapes; i++) {
    //   this.stepColors.push(selectRandomFromPalette())
    // }
  }
  render () {
    noStroke()
    fill(this.layerColor)
    push()
      if(this.sides === 3) rotate(radians(90))
      for(let i=0; i < this.numShapes; i++) {
        // fill(this.stepColors[i])
        for(let x=this.centerOffset; x < CRYSTAL_SIZE/2; x+=this.singleStep) {
          //line(this.start * this.step, 0, this.stop * this.step, 0)
          rect(x, 0, this.shapeSize, this.shapeSize)
        }
        rotate(this.angle)
      }
    pop()
    if(this.counter++ >= 20) {
      this.counter = 0
    }
  }
}


/*
 *  THIS CLASS DRAWS AN OUTLINE SHAPE. WE WANT OUR SHAPES
 *  TO STAY WITHIN THIS OUTLINE
 */
class OutlineShape extends Layer {
  constructor () {
    super()
    this.radius = CRYSTAL_SIZE/2
    this.hexagonTrue = randomSelectTwo()
  }
  render () {
    strokeWeight(1)
    //stroke('#888')
    stroke(this.layerColor)
    noFill()
    push()
      if(this.hexagonTrue) {
        ellipse(0, 0, 2 * this.radius, 2 * this.radius)
      } else {
        doPolygon(0, 0, this.radius, this.sides)
      }
    pop()
  }
}


/*
 *  THIS CLASS DRAWS A CENTERED SHAPE
 */
class CenteredShape extends Layer {
  constructor (n) {
    super(n)
    this.randomShape = random(1)
    this.shapeSize = floor(random(this.stepsOut/2, this.stepsOut)) * this.singleStep
    this.alpha = floor(random(63, 215))
    this.renderOption = random(1)
  }
  render () {
    if(this.renderOption) {
      fill(red(this.layerColor), green(this.layerColor), blue(this.layerColor), this.alpha)
      noStroke()
    } else {
      strokeWeight(1)
      stroke(red(this.layerColor), green(this.layerColor), blue(this.layerColor))
      noFill()
    }
    push()
    if(this.randomShape < 0.5) {
      ellipse(0, 0, 2 * this.shapeSize)
    } else {
      doPolygon(0, 0, this.shapeSize, this.sides)
    }
    pop()
  }
}


/*
 *  THIS CLASS DRAWS A RING OF SHAPES
 */
 class RingOfShapes extends Layer {
   constructor(n) {
     super(n)
     this.steps = floor(random(1, this.stepsOut))
     this.center = this.steps * this.singleStep
     this.randomShape = random(1)
     this.direction = randomSelectTwo() // used for triangle only
     this.fillColor = randomSelectTwo() ? this.layerColor : color(0, 1)
     this.weight = this.thinStroke
     this.alpha = floor(random(31, 223))

     if(this.steps < this.stepsOut/2) {
       this.radius = floor(random(1, this.steps)) * this.singleStep
     } else if (this.steps > this.stepsOut / 2) {
       this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
     } else {
       this.radius = floor(random(1, (this.stepsOut/2) + 1)) * this.singleStep
     }
   }

   render () {
     strokeWeight(this.weight)
     stroke(this.layerColor)
     fill(this.fillColor, this.alpha/2)
       for(let i = 0; i < this.numShapes; i++) {
         if(this.randomShape < 0.33) {
           ellipse(0, this.center, this.radius, this.radius)
         } else if(this.randomShape > 0.33 && this.randomShape < 0.66) {
           rect(0, this.center, this.radius, this.radius)
         } else {
           doTriangle(this.center, this.radius, this.direction)
         }
        rotate(this.angle)
       }
   }
 }


 /*
  *  THIS CLASS DRAWS SET OF CONCENTRIC POLYGONS
  */
class SteppedPolygons extends Layer {
   constructor (n) {
     super(n)
     this.numSteps = randomSelectTwo() ? this.stepsOut : this.stepsOut * 1.25
     this.stepColors = []
     // for(let i = 0; i < this.numSteps; i++) {
     //   this.stepColors.push(selectRandomFromPalette())
     // }
     this.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
     this.singleStep = ((CRYSTAL_SIZE / 2) - this.centerOffset) / this.numSteps
     this.alphas = []
     this.stepColors = []
     this.showShape = []
     for(let i = 0; i < this.numSteps; i++) {
       this.alphas.push(random(32, 255))
       this.stepColors.push(selectRandomFromPalette())
       if(random(1) > 0.7) {
         this.showShape.push(true)
       } else {
         this.showShape.push(false)
       }
     }
   }

   render () {
     strokeWeight(this.thinStroke)
     noFill()
     push()
     //if(this.numShapes === 3 || this.numShapes === 6) rotate(radians(45))
     rotate(this.angle / 2)
     for (let i = 1; i < this.numSteps + 1; i++) {
       if(this.showShape[i-1]) {
         stroke(red(this.stepColors[i-1]), green(this.stepColors[i-1]), blue(this.stepColors[i-1]), this.alphas[i-1]);
         doPolygon(0, 0, this.centerOffset + (i * this.singleStep), this.sides)
       }
     }
     pop()
   }
 }
