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

export const updateStoreSale = (storeSaleId, payload) => {
  return api.put(`/stores/sales/${storeSaleId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createStoreSalePayment = (id, payload) => {
  return api.post(`/stores/sales/${id}/payments`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStoreSalePayment = (storeSaleId, id, payload) => {
  return api.put(`/stores/sales/${storeSaleId}/payments/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
