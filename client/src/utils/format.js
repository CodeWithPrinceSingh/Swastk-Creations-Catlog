export const formatPrice = (amount) =>
  `₹${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export const discountPercent = (price, compareAtPrice) => {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
};
