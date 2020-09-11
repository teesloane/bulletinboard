export const dqs = s => document.querySelector(s);

export var els = {
  main: dqs(".main"),
  loading: dqs(".loading"),
  grid: dqs(".grid"),
  footer: dqs("footer"),
  dialogContainer: dqs(".dialog-container"),
  dialogImg: dqs(".dialogImg"),
  btnCustomize: dqs(".toggle-customize"),
  selectedImg: null,
  closeDialog: dqs(".toggle-close")
};

export function hide() {
  for (var i = 0; i < arguments.length; i++) {
    var a = arguments;
    a[i].classList && a[i].classList.add("hide");
  }
}

export function show() {
  for (var i = 0; i < arguments.length; i++) {
    var a = arguments;
    a[i].classList && a[i].classList.remove("hide");
  }
}
