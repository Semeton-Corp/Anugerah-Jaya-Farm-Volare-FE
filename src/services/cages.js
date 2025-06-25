import api from "./api";

export const getCage = () => {
  const token = localStorage.getItem("token");

  return api.get("/cages", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenCage = () => {
  const token = localStorage.getItem("token");
  const locationId = localStorage.getItem("locationId");

  return api.get(`/cages/chickens?locationId=${locationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
