// src/utils/dateUtils.js
export const toISODate = (date) => {
  // date: Date | string
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}
