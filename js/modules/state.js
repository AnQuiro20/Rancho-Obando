export const PRICING = {
  DAILY_PRICE: 45000,
  LONG_STAY_PRICE: 40000,
  LOW_SEASON_PRICE: 40000,
  SECURITY_DEPOSIT: 25000
};

export const bookingData = {
  checkin: "",
  checkout: "",
  days: 2,
  totalPrice: 90000,
  pricePerDay: PRICING.DAILY_PRICE
};

export function initState() {
  // Solo para mantener estructura (no cambia comportamiento).
}
