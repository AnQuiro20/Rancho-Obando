import { DOM } from "./dom.js";

export function initModals() {
  // Cerrar modales
  DOM.closeModal.addEventListener('click', () => hide(DOM.bookingModal));
  DOM.closeContactModal.addEventListener('click', () => hide(DOM.contactModal));

  // Cerrar al hacer clic fuera
  window.addEventListener('click', (e) => {
    if (e.target === DOM.bookingModal) hide(DOM.bookingModal);
    if (e.target === DOM.contactModal) hide(DOM.contactModal);
  });
}

export function show(el) {
  el.style.display = 'flex';
}

export function hide(el) {
  el.style.display = 'none';
}
