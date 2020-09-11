import "./tweakpane.js";
import "./dialog.js";
import { els, hide, show } from "./els.js";

function handleLoad() {
  /** on load handling... */
  hide(els.main, els.footer, els.btnCustomize);
  els.btnCustomize.style.opacity = 0;
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
    console.log("done loading")
    hide(els.loading);
    show(els.main, els.footer, els.btnCustomize);
    setTimeout(() => { els.grid.style.opacity = 1; }, 1000);
    setTimeout(() => { els.btnCustomize.style.opacity = 0.5; }, 1700);
  });
}

// -- main --

handleLoad();
