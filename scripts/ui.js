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
//let colorsSelected = palette.map(()=>false)
let uiCheckboxes = []


const selectMe = (n) => {
  let cb = document.getElementById(`cb${n}`)
  let status = cb.checked
  cb.checked = !status
}

// const makePaletteOLD = () => {
//   let sb = document.getElementById("sidebar")
//
//   let swatchesWrapper = document.createElement("DIV")
//   swatchesWrapper.classList.add("swatch-wrapper")
//
//   for(let i=0; i < palette.length; i++) {
//     let temp = document.createElement("DIV")
//     temp.classList.add("swatch-cont")
//     temp.innerHTML = `<div class="checkbox-cont"><input id='cb${i}' type="checkbox" name="color${i}" value=${i}></div><div class="swatch" onclick="selectMe(${i})">&nbsp;</div>`
//     swatchesWrapper.appendChild(temp)
//     uiCheckboxes.push(temp)
//   }
//   sb.appendChild(swatchesWrapper)
//   for(let item of defaultColors) {
//     let thing = document.getElementById(`cb${item}`)
//     thing.checked = true
//   }
//   let swatches = document.getElementsByClassName('swatch')
//   let r, g, b
//   for (let i = 0; i < swatches.length; i++) {
//     r = palette[i][0]
//     g = palette[i][1]
//     b = palette[i][2]
//     swatches[i].style.backgroundColor = `rgb(${r},${g},${b})`;
//   }
// }

function toggleSwatch(evt) {
  let s = colorsSelected[evt.target.dataset.index]
  colorsSelected[evt.target.dataset.index] = !s
  //console.log(colorsSelected)
}
const makePalette = () => {
  let sb = document.getElementById("sidebar")
  let swatchesContainer = document.createElement("DIV")
  swatchesContainer.classList.add('swatch-wrapper')
  for(let i=0; i < palette.length; i++) {
    let r = palette[i][0]
    let g = palette[i][1]
    let b = palette[i][2]
    let d0 = document.createElement("DIV")
    let d1 = document.createElement("DIV")

    d0.id = `sw${i}-cont`
    d0.classList.add("switch-cont")

    d1.id = `sw${i}`
    d1.classList.add("swatch-switch", "transform")
    d1.dataset.index = (i)
    d1.style.backgroundColor = `rgb(${r},${g},${b})`
    if(defaultColors.includes(i)) d1.classList.add("transform-active")

    d0.addEventListener("click", () => {
      d1.classList.toggle("transform-active")
    })
    d1.addEventListener("transitionend", toggleSwatch)

    d0.appendChild(d1)
    swatchesContainer.appendChild(d0)
  }
  sb.appendChild(swatchesContainer)
}

function makeButtons() {
	let sb = document.getElementById("sidebar")

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

  sb.appendChild(buttons)
}

function makeSelect() {
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
  document.getElementById("sidebar").appendChild(dropdowns)
}

function makeRadioBtns() {
  let radios = document.createElement("FORM")
  radios.classList.add("radios-wrapper")

  let radio0 = document.createElement("INPUT")
  let label0 = document.createElement("LABEL")
  let radio1 = document.createElement("INPUT")
  let label1 = document.createElement("LABEL")

  label0.htmlFor = "radio0"
  label0.innerHTML = " Rec"
  radio0.setAttribute("type", "radio")
  radio0.setAttribute("name", "gridSelect")
  radio0.setAttribute("value", "rec")
  radio0.setAttribute("id", "radio0")

  radio0.checked = true
  radio0.addEventListener("change", refreshGrid)
  radio1.addEventListener("change", refreshGrid)

  label1.htmlFor = "radio1"
  label1.innerHTML = " Hex"
  radio1.setAttribute("type", "radio")
  radio1.setAttribute("name", "gridSelect")
  radio1.setAttribute("value", "hex")
  radio1.setAttribute("id", "radio1")

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

  document.getElementById("sidebar").appendChild(radios)
}

function makeLayerSwitches() {
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

  document.getElementById("sidebar").appendChild(layerSwitches)
}

////////////////

window.onload = () => {
  makePalette()
  //makePalette2()
  makeSelect()
  makeLayerSwitches()
  makeRadioBtns()
  makeButtons()
}
