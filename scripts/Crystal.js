class Crystal {
  constructor(n) {
    this.layers = []

    layerConstructors.forEach(layerCon => {
      let picker = random(1)
      if(picker > layerCon.weight) {
        this.layers.push(layerCon.init(n))
      }
    })
  }

  render(x, y) {
    push()
    translate(x, y)
    this.layers.forEach(layer => {
      layer.render()
    })
    pop()
  }
}
