export const dqs = (s) => document.querySelector(s)

export var els = {
  grid: document.querySelector(".grid"),
  dialogContainer: dqs('.dialog-container'),
  dialogImg: dqs(".dialogImg"),
  selectedImg: null,
  closeDialog: dqs('.toggle-close')
}
