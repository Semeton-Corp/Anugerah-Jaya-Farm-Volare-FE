import api from "./api";
const token = localStorage.getItem("token");
const locationId = localStorage.getItem("locationId");

export const getCage = () => {
  return api.get("/cages", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenCage = () => {
  return api.get(`/cages/chickens?locationId=${locationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenCageById = (id) => {
  return api.get(`/cages/chickens/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createCage = (payload) => {
  return api.post("/cages", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateCage = (payload, id) => {
  return api.put(`/cages/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteCage = (id) => {
  return api.delete(`/cages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
