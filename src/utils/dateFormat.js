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

export const translateDateToBahasa = (dateStr) => {
  const monthMap = {
    January: "Januari",
    February: "Februari",
    March: "Maret",
    April: "April",
    May: "Mei",
    June: "Juni",
    July: "Juli",
    August: "Agustus",
    September: "September",
    October: "Oktober",
    November: "November",
    December: "Desember",
  };

  const [day, monthEng, year] = dateStr.split(" ");
  const monthInd = monthMap[monthEng];

  return `${day} ${monthInd} ${year}`;
};

export const formatDateToDDMMYYYY = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export const toYMD = (d) => {
  const today = new Date().toISOString().slice(0, 10);
  const dt = new Date(d);
  if (isNaN(dt)) return today;
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

export const convertToInputDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatDateForInput = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
};

export const formatTanggalIndonesia = (tanggal) => {
  const bulanIndonesia = [
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

  const [tahun, bulan, hari] = tanggal.split("-");
  return `${parseInt(hari)} ${bulanIndonesia[parseInt(bulan) - 1]} ${tahun}`;
};

export function getFormattedDateTime() {
  const now = new Date();

  // Array nama bulan dalam bahasa Indonesia
  const bulanIndo = [
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

  const jam = now.getHours().toString().padStart(2, "0");
  const menit = now.getMinutes().toString().padStart(2, "0");
  const tanggal = now.getDate();
  const bulan = bulanIndo[now.getMonth()];
  const tahun = now.getFullYear();

  return `${jam}:${menit}, ${tanggal} ${bulan} ${tahun}`;
}
