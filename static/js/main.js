import "./tweakpane.js";
import "./dialog.js";
import { els, hide, show } from "./els.js";

function handleLoad() {
  /** on load handling... */
  hide(els.main, els.footer);
  Promise.all(
    Array.from(document.images)
      .filter(img => !img.complete)
      .map(
        img =>
          new Promise(resolve => {
            img.onload = img.onerror = resolve;
          })
      )
  ).then(() => {
    // some arbitrary timeouts for smoother load
    show(els.main, els.footer);
    hide(els.loading);
    setTimeout(() => {
      hide(els.loading);
    }, 900);
    setTimeout(() => {
      els.grid.style.opacity = 1;
    }, 1000);
  });
}

// -- main --

handleLoad();
