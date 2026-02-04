import { initDOM } from "./modules/dom.js";
import { initState } from "./modules/state.js";
import { initPricing } from "./modules/pricing.js";
import { initNav } from "./modules/nav.js";
import { initModals } from "./modules/modals.js";
import { initForms } from "./modules/forms.js";

document.addEventListener("DOMContentLoaded", () => {
  initDOM();
  initState();
  initPricing();
  initNav();
  initModals();
  initForms();
});
