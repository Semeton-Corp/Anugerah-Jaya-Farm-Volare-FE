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

const MONTHS = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,

  janari: 0,
  januari: 0,
  febuari: 1,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agu: 7,
  agt: 7,
  ags: 7,
  agust: 7,
  agustus: 7,
  septeber: 8,
  september: 8,
  oktober: 9,
  nop: 10,
  nopember: 10,
  november: 10,
  des: 11,
  desember: 11,
};

export const toISODate = (input) => {
  if (!input) return new Date().toISOString().slice(0, 10);

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;

  // DD-MM-YYYY
  let m = input.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (m) {
    const [_, dd, mm, yyyy] = m;
    return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(
      2,
      "0"
    )}`;
  }

  // DD/MM/YYYY
  m = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const [_, dd, mm, yyyy] = m;
    return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(
      2,
      "0"
    )}`;
  }

  // DD Mon YYYY  (e.g., "26 Aug 2025", "26 Agustus 2025")
  m = input.match(/^(\d{1,2})\s+([A-Za-z\.]+)\s+(\d{4})$/);
  if (m) {
    const [_, dd, mon, yyyy] = m;
    const key = mon.toLowerCase().replace(/\./g, "");
    const idx = MONTHS[key];
    if (idx !== undefined) {
      return `${yyyy}-${String(idx + 1).padStart(2, "0")}-${String(dd).padStart(
        2,
        "0"
      )}`;
    }
  }

  const d = new Date(input);
  if (!Number.isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
};

export const toDDMMYYYY = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
};

export function getTodayMonthYear() {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function getTodayYear() {
  return new Date().getFullYear();
}

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

export function parseToDate(str) {
  if (!str && str !== 0) return null;
  if (str instanceof Date) return isNaN(str.getTime()) ? null : str;

  const s = String(str || "").trim();
  if (!s) return null;

  if (/^\d{4}-\d{2}-\d{2}(\b|T)/.test(s)) {
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }

  const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s);
  if (ddmmyyyy) {
    const [, dd, mm, yyyy] = ddmmyyyy;
    const d = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
