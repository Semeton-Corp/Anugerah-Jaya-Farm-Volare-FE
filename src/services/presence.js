import api from "./api";
const token = localStorage.getItem("token");

export const getCurrentPresence = () => {
  return api.get("/presences/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPresence = (month, year) => {
  return api.get("/presences/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params:{
      month: month,
      year:year
    }
  });
};

export const arrivalPresence = (id) => {
  return api.patch(
    `/presences/arrival/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const departurePresence = (id) => {
  return api.patch(
    `/presences/departure/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
