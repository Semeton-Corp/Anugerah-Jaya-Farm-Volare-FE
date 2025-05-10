import api from "./api";
const token = localStorage.getItem("token");

export const getSuppliers = () => {
  return api.get("/suppliers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSupplierById = (id) => {
  return api.get(`/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSuppliers = (payload, id) => {
  return api.put(`/suppliers/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSupplier = (id) => {
  return api.delete(`/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSupplier = (payload) => {
  return api.post("/suppliers", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
