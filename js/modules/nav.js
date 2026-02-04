import { DOM } from "./dom.js";

export function initNav() {
  DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.navList.style.display = DOM.navList.style.display === 'flex' ? 'none' : 'flex';
  });
}
