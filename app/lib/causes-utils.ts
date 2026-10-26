/* 1640000 becomes "₹16,40,000". Currency comes from the data, defaulting to rupees. */
export function formatMoney(value: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/* Share of the goal reached, from 0 to 100 */
export function percentOf(raised: number, goal: number) {
  return goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
}