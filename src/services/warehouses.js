import api from "./api";
const token = localStorage.getItem("token");

export const getWarehouses = () => {
  return api.get("/warehouses", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getWarehouseItems = (category, storeId) => {
  return api.get("/warehouses/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      category: category,
      storeId: storeId,
    },
  });
};

export const getWarehouseItemById = (id) => {
  return api.get(`/warehouses/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateWarehouseItem = (payload, id) => {
  return api.put(`/warehouses/items/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWarehouseItems = (payload) => {
  return api.post("/warehouses/items", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseOrderItems = () => {
  return api.get("/warehouses/order-items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const takeWarehouseOrderItem = (id) => {
  return api.patch(
    `/warehouses/order-items/${id}/takes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createWarehouseOrderItem = (payload) => {
  return api.post("/warehouses/order-items", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
