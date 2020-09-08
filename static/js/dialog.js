import { els, dqs } from './els.js'

const gridItemClass = 'item';

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
  if (evt.keyCode == 27) {
    closeDialog()
  }
};

