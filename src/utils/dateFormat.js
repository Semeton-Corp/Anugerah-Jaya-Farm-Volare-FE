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

export const convertToInputDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};
