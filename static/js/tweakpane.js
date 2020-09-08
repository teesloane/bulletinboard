import { els, dqs } from './els.js'


//  Tweakpane show/hide
const customize = dqs(".customize")
const customizeBtn = dqs(".toggle-customize")
customizeBtn.addEventListener("click", (e) => {
  customize.classList.toggle("customize-open")
  customizeBtn.classList.toggle("btn-icon-active")
})

const pane = new Tweakpane({
  container: document.querySelector(".customize")
});

const f1 = pane.addFolder({
  title: "Bulletin Board Controls"
})
var PARAMS = {
  columns: 4,
  gutter: 8,
  background: { r: 255, g: 255, b: 255 },
};
// Columns
f1.addInput(PARAMS, 'columns', { step: 1, min: 0, max: 16 }).on("change", (val) => {
  var grid = document.querySelector(".grid")
  PARAMS.columns = val
  grid.style.columnCount = PARAMS.columns
})

// Gutter
f1.addInput(PARAMS, 'gutter', { step: 1, min: 0, max: 128 }).on("change", (val) => {
  var grid = document.querySelector(".grid")
  var items = document.querySelectorAll(".item")
  for (var i = 0; i < items.length; i++) {
    items[i].style.marginBottom = PARAMS.gutter + "px"
  }
  PARAMS.gutter = val
  grid.style.columnGap = PARAMS.gutter + "px"
})
// Background colour
f1.addInput(PARAMS, 'background').on("change", (val) => {
  var grid = document.querySelector(".grid")
  PARAMS.background = val
  let x = PARAMS.background
  grid.style.backgroundColor = `rgb(${x.r}, ${x.b}, ${x.g})`
})
