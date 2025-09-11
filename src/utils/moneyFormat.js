export const formatRupiah = (number) => {
  const numeric = Number(number);
  if (isNaN(numeric)) return "0";
  return new Intl.NumberFormat("id-ID").format(numeric);
};

export const onlyDigits = (s) => {
  if (s === null || s === undefined) return "";
  return String(s).replace(/\D/g, "");
};

export const formatThousand = (s) => {
  const digits = onlyDigits(s);
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
