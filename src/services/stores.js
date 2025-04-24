import api from "./api";
const token = localStorage.getItem("token");

export const getStores = () => {
  return api.get("/stores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListStoreSale = () => {
  return api.get("/stores/sales", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStoreSaleById = (id) => {
  return api.get(`/stores/sales/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createStoreSale = (payload) => {
  return api.post("/stores/sales", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
