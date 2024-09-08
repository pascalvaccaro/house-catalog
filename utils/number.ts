export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(
    price,
  );

export const formatSurface = (surface: number) =>
  new Intl.NumberFormat("fr", { style: 'decimal', maximumFractionDigits: 0 }).format(
    surface,
  ) + ' m²';
