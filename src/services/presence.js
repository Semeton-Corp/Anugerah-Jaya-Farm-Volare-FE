import api from "./api";
const token = localStorage.getItem("token");

export const getCurrentPresence = () => {
  return api.get("/presences/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
