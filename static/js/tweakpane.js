import { els, dqs } from "./els.js";

//  Tweakpane show/hide
const customize = dqs(".customize");
const customizeBtn = dqs(".toggle-customize");

export function toggleTweakPane() {
  customize.classList.toggle("customize-open");
  customizeBtn.classList.toggle("btn-icon-toggled");
}

customizeBtn.addEventListener("click", e => {
  toggleTweakPane();
});

const pane = new Tweakpane({
  container: dqs(".tweakpane-mount")
});

const f1 = pane.addFolder({
  title: "Bulletin Board Controls"
});
var PARAMS = {
  Columns: 4,
  Gutter: 8,
  Background: { r: 255, g: 255, b: 255 }
};
// Columns
f1.addInput(PARAMS, "Columns", { step: 1, min: 0, max: 16 }).on(
  "change",
  val => {
    var grid = document.querySelector(".grid");
    PARAMS.columns = val;
    grid.style.columnCount = PARAMS.Columns;
  }
);

// Gutter
f1.addInput(PARAMS, "Gutter", { step: 1, min: 0, max: 128 }).on(
  "change",
  val => {
    var grid = document.querySelector(".grid");
    var items = document.querySelectorAll(".item");
    for (var i = 0; i < items.length; i++) {
      items[i].style.marginBottom = PARAMS.Gutter + "px";
    }
    PARAMS.Gutter = val;
    grid.style.padding = PARAMS.Gutter + "px";
    grid.style.columnGap = PARAMS.Gutter + "px";
  }
);
// Background colour
f1.addInput(PARAMS, "Background").on("change", val => {
  var grid = document.querySelector(".grid");
  PARAMS.background = val;
  let x = PARAMS.Background;
  grid.style.backgroundColor = `rgb(${x.r}, ${x.b}, ${x.g})`;
});
