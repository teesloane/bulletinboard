import { els, dqs } from './els.js'

const gridItemClass = 'item';

/**
 * Navigates images (called by arrow keys)
 * Finds sibling of current image and replaces dialogImg with it
 */
function navigateDialog(dir) {
  var ns;
  if (dir == "left") {
    ns = els.selectedImg.previousElementSibling
  } else {
    ns = els.selectedImg.nextElementSibling
  }
  els.dialogImg.src = ns.src
  els.selectedImg = ns
}

function closeDialog() {
  els.dialogContainer.classList.add('hide');
  els.closeDialog.classList.add("hide")
  els.dialogImg.src = ""
}

document.body.addEventListener('click', (e) => {
  if (
    e.target.tagName === 'IMG'
    && e.target.className === gridItemClass
  ) {
    els.dialogContainer.classList.remove('hide');
    els.dialogImg.src = e.target.src
    els.selectedImg = e.target
    els.closeDialog.classList.remove("hide")
  } else {
    closeDialog()
  }
});

els.closeDialog.addEventListener('click', () => {
  closeDialog()
});

document.onkeydown = function (evt) {
  evt = evt || window.event;
  console.log(evt.keyCode)
  switch(evt.keyCode) {
    case 27:
      closeDialog()
      break;
    case 37:
      navigateDialog("left")
      break;
    case 39:
      navigateDialog("right")
      break;
  }

};

