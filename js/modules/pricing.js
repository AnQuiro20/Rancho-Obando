import { DOM } from "./dom.js";
import { bookingData, PRICING } from "./state.js";
import { isoToday, isoTomorrowFrom } from "./dates.js";

export function initPricing() {
  // Configurar fechas mínimas (igual que antes)
  const today = isoToday();
  const tomorrow = isoTomorrowFrom(today);

  DOM.checkin.min = today;
  DOM.checkin.value = today;

  DOM.checkout.min = tomorrow;
  DOM.checkout.value = tomorrow;

  // Calcular precio inicial
  calculatePrice();
}

export function updateCheckoutMinDate() {
  const checkinDate = new Date(DOM.checkin.value);
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkoutDate.getDate() + 1);

  DOM.checkout.min = checkoutDate.toISOString().split('T')[0];

  if (new Date(DOM.checkout.value) < checkoutDate) {
    DOM.checkout.value = checkoutDate.toISOString().split('T')[0];
  }
}

export function calculatePrice() {
  const checkin = new Date(DOM.checkin.value);
  const checkout = new Date(DOM.checkout.value);

  if (checkout <= checkin) {
    alert('La fecha de salida debe ser posterior a la fecha de llegada.');
    DOM.checkout.value =
      new Date(checkin.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return;
  }

  const timeDiff = checkout.getTime() - checkin.getTime();
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

  DOM.days.value = days;

  let pricePerDay = PRICING.DAILY_PRICE;

  if (days >= 7) {
    pricePerDay = PRICING.LONG_STAY_PRICE;
  } else if (checkin.getDay() >= 1 && checkin.getDay() <= 4) {
    pricePerDay = PRICING.LOW_SEASON_PRICE;
  }

  const totalPrice = days * pricePerDay;

  DOM.totalPrice.textContent = totalPrice.toLocaleString('es-CR');

  bookingData.checkin = DOM.checkin.value;
  bookingData.checkout = DOM.checkout.value;
  bookingData.days = days;
  bookingData.totalPrice = totalPrice;
  bookingData.pricePerDay = pricePerDay;
}
