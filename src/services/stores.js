import api from "./api";
const token = localStorage.getItem("token");

export const getStores = () => {
  return api.get("/stores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStoreDetail = (id) => {
  return api.get(`/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createStore = (payload) => {
  return api.post("/stores", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStore = (payload, id) => {
  return api.put(`/stores/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteStore = (id) => {
  return api.delete(`/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStoreOverview = (id) => {
  return api.get(`/stores/overview/${id}`, {
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

export const createStoreRequestItem = (payload) => {
  return api.post("/stores/request/items", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStoreRequestItems = (date, page, warehouseId, storeId) => {
  return api.get("/stores/request/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      date: date,
      page: page,
      warehouseId: warehouseId,
      storeId: storeId,
    },
  });
};

export const updateStoreRequestItem = (payload, id) => {
  return api.put(
    `/stores/request/items/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const warehouseConfirmationStoreRequestItem = (payload, id) => {
  return api.put(
    `/stores/request/items/${id}/warehouse-confirmations`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
