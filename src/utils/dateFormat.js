export const getTodayDateInBahasa = () => {
  const today = new Date();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${day} ${month} ${year}`;
};
