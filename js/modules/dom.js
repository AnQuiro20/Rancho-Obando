export const DOM = {};

export function initDOM() {
  DOM.bookingForm = document.getElementById('bookingForm');
  DOM.bookingModal = document.getElementById('bookingModal');
  DOM.closeModal = document.getElementById('closeModal');
  DOM.finalBookingForm = document.getElementById('finalBookingForm');
  DOM.bookingSummary = document.getElementById('bookingSummary');

  DOM.contactModal = document.getElementById('contactModal');
  DOM.closeContactModal = document.getElementById('closeContactModal');
  DOM.contactForm = document.getElementById('contactForm');
  DOM.contactBtn = document.getElementById('contactBtn');

  DOM.bookNowBtn = document.getElementById('bookNowBtn');
  DOM.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  DOM.navList = document.querySelector('nav ul');

  DOM.checkin = document.getElementById('checkin');
  DOM.checkout = document.getElementById('checkout');
  DOM.days = document.getElementById('days');
  DOM.totalPrice = document.getElementById('totalPrice');

  // Campos modal reserva
  DOM.fullName = document.getElementById('fullName');
  DOM.email = document.getElementById('email');
  DOM.phone = document.getElementById('phone');
  DOM.groupSize = document.getElementById('groupSize');
  DOM.purpose = document.getElementById('purpose');
  DOM.specialRequests = document.getElementById('specialRequests');

  // Campos contacto
  DOM.contactName = document.getElementById('contactName');
  DOM.contactEmail = document.getElementById('contactEmail');
  DOM.contactPhone = document.getElementById('contactPhone');
  DOM.contactMessage = document.getElementById('contactMessage');
}
