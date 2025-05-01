import api from "./api";
const token = localStorage.getItem("token");

export const getListDailyWorks = () => {
  return api.get("/works/dailies", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getAdditionalWorks = () => {
    return api.get("/works/additionals", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  };

