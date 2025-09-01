import api from "./api";
const token = localStorage.getItem("token");

export const getGeneralOverview = () => {
  return api.get("/generals/overview", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
