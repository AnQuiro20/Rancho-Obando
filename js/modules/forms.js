import { DOM } from "./dom.js";
import { bookingData, PRICING } from "./state.js";
import { formatDate, isoToday, isoTomorrowFrom } from "./dates.js";
import { calculatePrice, updateCheckoutMinDate } from "./pricing.js";
import { show, hide } from "./modals.js";

export function initForms() {
  // Form principal
  DOM.bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleBookingSubmit();
  });

  // Cambios en fechas
  DOM.checkin.addEventListener('change', () => {
    updateCheckoutMinDate();
    calculatePrice();
  });

  DOM.checkout.addEventListener('change', () => calculatePrice());

  // Botón reservar en precios
  DOM.bookNowBtn.addEventListener('click', () => handleBookingSubmit());

  // Botón contacto
  DOM.contactBtn.addEventListener('click', () => show(DOM.contactModal));

  // Formulario final de reserva
  DOM.finalBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFinalBooking();
  });

  // Formulario de contacto
  DOM.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleContactSubmit();
  });
}

function handleBookingSubmit() {
  const checkin = new Date(bookingData.checkin);
  const checkout = new Date(bookingData.checkout);

  if (checkout <= checkin) {
    alert('La fecha de salida debe ser posterior a la fecha de llegada.');
    return;
  }

  const totalWithDeposit = bookingData.totalPrice + PRICING.SECURITY_DEPOSIT;

  let rateType = "Tarifa Regular";
  if (bookingData.days >= 7) {
    rateType = "Tarifa Estadía Larga (7+ días)";
  } else if (checkin.getDay() >= 1 && checkin.getDay() <= 4) {
    rateType = "Tarifa Temporada Baja (Lunes-Jueves)";
  }

  DOM.bookingSummary.innerHTML = `
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3>Resumen de Reserva</h3>
      <p><strong>Rancho Completo</strong> - 2 habitaciones, piscina privada</p>
      <p><strong>Fechas:</strong> ${formatDate(bookingData.checkin)} - ${formatDate(bookingData.checkout)}</p>
      <p><strong>Estancia:</strong> ${bookingData.days} noches (${bookingData.days} días)</p>
      <p><strong>Tarifa aplicada:</strong> ${rateType}</p>
      <p><strong>Precio por día:</strong> ₡${bookingData.pricePerDay.toLocaleString('es-CR')} CRC</p>
      <p><strong>Subtotal (${bookingData.days} días):</strong> ₡${bookingData.totalPrice.toLocaleString('es-CR')} CRC</p>
      <p><strong>Depósito de seguridad:</strong> ₡${PRICING.SECURITY_DEPOSIT.toLocaleString('es-CR')} CRC</p>
      <p style="font-size: 1.2rem; font-weight: bold; color: var(--primary-color); margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;">
        Total a pagar inicialmente: ₡${totalWithDeposit.toLocaleString('es-CR')} CRC
      </p>
      <p style="font-size: 0.9rem; color: var(--gray-color); margin-top: 5px;">
        * El depósito de ₡25,000 se reembolsa 48 hrs después del check-out
      </p>
    </div>
  `;

  show(DOM.bookingModal);
}

function handleFinalBooking() {
  const formData = {
    fullName: DOM.fullName.value,
    email: DOM.email.value,
    phone: DOM.phone.value,
    groupSize: DOM.groupSize.value,
    purpose: DOM.purpose.value,
    specialRequests: DOM.specialRequests.value,
    ...bookingData
  };

  console.log('Datos de reserva:', formData);

  hide(DOM.bookingModal);

  alert(
    `¡Reserva confirmada!\n\n` +
    `Hemos enviado un correo a ${formData.email} con los detalles de tu reserva y las instrucciones de pago.\n\n` +
    `Reserva para Rancho La Tranquilidad\n` +
    `Fechas: ${formatDate(formData.checkin)} - ${formatDate(formData.checkout)}\n` +
    `Total a pagar: ₡${(formData.totalPrice + PRICING.SECURITY_DEPOSIT).toLocaleString('es-CR')} CRC\n\n` +
    `¡Te esperamos en el rancho!`
  );

  DOM.finalBookingForm.reset();
  DOM.bookingForm.reset();

  // Restablecer fechas igual que antes
  const today = isoToday();
  const tomorrow = isoTomorrowFrom(today);

  DOM.checkin.value = today;
  DOM.checkout.value = tomorrow;
  DOM.groupSize.value = 2;

  calculatePrice();
}

function handleContactSubmit() {
  const formData = {
    name: DOM.contactName.value,
    email: DOM.contactEmail.value,
    phone: DOM.contactPhone.value,
    message: DOM.contactMessage.value
  };

  console.log('Mensaje de contacto:', formData);

  hide(DOM.contactModal);
  alert('¡Gracias por tu mensaje! Te contactaremos en un plazo de 24 horas hábiles.');

  DOM.contactForm.reset();
}
