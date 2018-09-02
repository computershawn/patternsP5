let palette = [
  [255, 255, 255], // white
  [0, 0, 0], // black
  [255, 212, 0], // yellow
  [255, 121, 0], // orange
  [255, 52, 154], // pink
  [178, 0, 255], // purplish
  [0, 255, 215], // aqua
  [0, 255, 109], // green-blue
]
let defaultColors = [0, 4, 6]
let colorsSelected = palette.map((c,i)=>(defaultColors.includes(i)))

function toggleSwatch(evt) {
  let s = colorsSelected[evt.target.dataset.index]
  colorsSelected[evt.target.dataset.index] = !s
}

const makePalette = () => {
  let sb = document.getElementById("sidebar")
  let githubLogo = document.getElementById("github-logo-wrapper")
  let swatchesContainer = document.createElement("DIV")
  swatchesContainer.classList.add('swatch-wrapper')
  for(let i=0; i < palette.length; i++) {
    let r = palette[i][0]
    let g = palette[i][1]
    let b = palette[i][2]
    let d0 = document.createElement("DIV")
    let d1 = document.createElement("DIV")
    let d2 = document.createElement("DIV")
    let d3 = document.createElement("DIV")

    d0.classList.add("switch-cont-wrapper")
    d3.classList.add("switch-tick","fadable")

    d1.id = `sw${i}-cont`
    d1.classList.add("switch-cont")

    d2.id = `sw${i}`
    d2.classList.add("swatch-switch", "transform")
    d2.dataset.index = (i)
    d2.style.backgroundColor = `rgb(${r},${g},${b})`

    // If this swatch is one of the default colors, add classes
    // to show that the div is active
    if(defaultColors.includes(i)){
      d2.classList.add("transform-active")
      d3.classList.add("fadable-active")
    }

    d1.addEventListener("click", () => {
      d2.classList.toggle("transform-active")
      d3.classList.toggle("fadable-active")
    })
    d2.addEventListener("transitionend", toggleSwatch)

    d1.appendChild(d2)
    d0.appendChild(d1)
    d0.appendChild(d3)
    swatchesContainer.appendChild(d0)
  }
  //sb.appendChild(swatchesContainer)
  sb.insertBefore(swatchesContainer, githubLogo)
}

function makeButtons() {
  let sb = document.getElementById("sidebar")
  let githubLogo = document.getElementById("github-logo-wrapper")

  let buttons = document.createElement("DIV")
  buttons.classList.add("buttons-wrapper")

  let btn0 = document.createElement("BUTTON")
  var t0 = document.createTextNode("Refresh")
  btn0.appendChild(t0)
  btn0.addEventListener("click", refreshShapes)
  btn0.classList.add("btn")
  btn0.setAttribute('type', 'button')

  let btn1 = document.createElement("BUTTON")
  let t1 = document.createTextNode("Export")
  btn1.appendChild(t1)
  btn1.addEventListener("click", exportSVG)
  btn1.classList.add("btn")
  btn1.setAttribute('type', 'button')

  buttons.appendChild(btn0)
  buttons.appendChild(btn1)

  //sb.appendChild(buttons)
  sb.insertBefore(buttons, githubLogo)
}

function makeSelect() {
  let sb = document.getElementById("sidebar")
  let githubLogo = document.getElementById("github-logo-wrapper")

  let dropdowns = document.createElement("DIV")
  dropdowns.classList.add("dropdowns-wrapper")

  let sel = document.createElement("SELECT")
  sel.classList.add("select-cont")
  sel.setAttribute("id", "select0")

  let minSides = 3, maxSides = 12

  for(let i = minSides; i <= maxSides; i++) {
    var opt = document.createElement("OPTION")
    opt.text = i
    sel.add(opt)
  }

  sel.addEventListener("change", refreshShapes)
  dropdowns.appendChild(sel)
  //sb.appendChild(dropdowns)
  sb.insertBefore(dropdowns, githubLogo)
}

function makeRadioBtns() {
  let sb = document.getElementById("sidebar")
  let githubLogo = document.getElementById("github-logo-wrapper")

  let radios = document.createElement("FORM")
  radios.classList.add("radios-wrapper")

  let radio0 = document.createElement("INPUT")
  let label0 = document.createElement("LABEL")
  let radio1 = document.createElement("INPUT")
  let label1 = document.createElement("LABEL")

  label0.htmlFor = "radio-rec"
  label0.innerHTML = " Rec"
  radio0.setAttribute("type", "radio")
  radio0.setAttribute("name", "gridSelect")
  radio0.setAttribute("value", "rec")
  radio0.setAttribute("id", "radio-rec")

  radio0.checked = true
  radio0.addEventListener("change", refreshGrid)
  radio1.addEventListener("change", refreshGrid)

  label1.htmlFor = "radio-hex"
  label1.innerHTML = " Hex"
  radio1.setAttribute("type", "radio")
  radio1.setAttribute("name", "gridSelect")
  radio1.setAttribute("value", "hex")
  radio1.setAttribute("id", "radio-hex")

  let radio0Cont = document.createElement("DIV")
  let radio1Cont = document.createElement("DIV")

  radio0Cont.classList.add("radio-cont")
  radio1Cont.classList.add("radio-cont")

  radio0Cont.appendChild(radio0)
  radio0Cont.appendChild(label0)
  radio1Cont.appendChild(radio1)
  radio1Cont.appendChild(label1)

  radios.appendChild(radio0Cont)
  radios.appendChild(radio1Cont)

  //sb.appendChild(radios)
  sb.insertBefore(radios, githubLogo)
}

function makeLayerSwitches() {
  let sb = document.getElementById("sidebar")
  let githubLogo = document.getElementById("github-logo-wrapper")

  let layerSwitches = document.createElement("DIV")
  layerSwitches.classList.add("switches-wrapper")

  let switch0 = document.createElement("INPUT")
  let label0 = document.createElement("LABEL")
  let switch1 = document.createElement("INPUT")
  let label1 = document.createElement("LABEL")

  label0.htmlFor = "switch0"
  label0.innerHTML = " Layer 1"
  switch0.setAttribute("type", "checkbox")
  switch0.setAttribute("value", 0)
  switch0.setAttribute("id", "layer1-switch")

  label1.htmlFor = "switch1"
  label1.innerHTML = " Layer 2"
  switch1.setAttribute("type", "checkbox")
  switch1.setAttribute("value", 1)
  switch1.setAttribute("id", "layer2-switch")

  switch0.checked = switch1.checked = true
  switch0.addEventListener("change", refreshLayers)
  switch1.addEventListener("change", refreshLayers)

  let switch0Cont = document.createElement("DIV")
  let switch1Cont = document.createElement("DIV")

  switch0Cont.classList.add("layer-switch-cont")
  switch1Cont.classList.add("layer-switch-cont")

  switch0Cont.appendChild(switch0)
  switch0Cont.appendChild(label0)
  switch1Cont.appendChild(switch1)
  switch1Cont.appendChild(label1)

  layerSwitches.appendChild(switch0Cont)
  layerSwitches.appendChild(switch1Cont)

  //sb.appendChild(layerSwitches)
  sb.insertBefore(layerSwitches, githubLogo)
}

////////////////

window.onload = () => {
  makePalette()
  makeSelect()
  makeLayerSwitches()
  makeRadioBtns()
  makeButtons()
}
