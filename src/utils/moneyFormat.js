export const formatRupiah = (number) => {
  const numeric = Number(number);
  if (isNaN(numeric)) return "0";
  return new Intl.NumberFormat("id-ID").format(numeric);
};
