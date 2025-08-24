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

export const createWarehouses = (payload) => {
  return api.post("/warehouses", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getWarehousesDetail = (id) => {
  return api.get(`/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateWarehouses = (payload, id) => {
  return api.put(`/warehouses/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteWarehouse = (id) => {
  return api.delete(`/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getEggWarehouseItemSummary = (id, date) => {
  return api.get(`/warehouses/items/eggs/summary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: { date: date },
  });
};

export const getWarehousesOverview = (id) => {
  return api.get(`/warehouses/overview/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getWarehouseItemHistories = (date, page) => {
  return api.get(`/warehouses/items/histories`, {
    params: {
      date: date,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemHistoryById = (id) => {
  return api.get(`/warehouses/items/histories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehousesByLocation = (locationId) => {
  return api.get(`/warehouses`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: { locationId: locationId },
  });
};

export const getWarehouseItems = (warehouseId, category, itemNames, unit) => {
  return api.get("/warehouses/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      warehouseId: warehouseId,
      category: category,
      itemNames: itemNames,
      unit: unit,
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

export const getWarehouseItemProcurementDrafts = () => {
  return api.get("/warehouses/items/procurements/drafts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemProcurementDraft = (id) => {
  return api.get(`/warehouses/items/procurements/drafts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWarehouseItemProcurementDraft = (payload) => {
  return api.post("/warehouses/items/procurements/drafts", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirmationWarehouseItemProcurementDraft = (payload, id) => {
  return api.post(
    `/warehouses/items/procurements/drafts/${id}/confirmations`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteWarehouseItemProcurementDraft = (id) => {
  return api.delete(`/warehouses/items/procurements/drafts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemProcurements = () => {
  return api.get("/warehouses/items/procurements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemProcurement = (id) => {
  return api.get(`/warehouses/items/procurements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWarehouseItemProcurementPayment = (payload, id) => {
  return api.post(`/warehouses/items/procurements/${id}/payments`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const arrivalConfirmationWarehouseItemProcurement = (payload, id) => {
  return api.put(`/warehouses/items/procurements/${id}/arrivals`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemCornProcurementDrafts = () => {
  return api.get(`/warehouses/items/corns/procurements/drafts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemCornProcurementDraft = (id) => {
  return api.get(`/warehouses/items/corns/procurements/drafts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteWarehouseItemCornProcurementDraft = (id) => {
  return api.delete(`/warehouses/items/corns/procurements/drafts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCornWarehouseItemSummary = (id) => {
  return api.get(`/warehouses/items/corns/summary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWarehouseItemCornProcurementDraft = (payload) => {
  return api.post(`/warehouses/items/corns/procurements/drafts`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirmationWarehouseItemCornProcurementDraft = (payload, id) => {
  return api.post(
    `/warehouses/items/corns/procurements/drafts/${id}/confirmations`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getWarehouseItemCornProcurements = () => {
  return api.get(`/warehouses/items/corns/procurements`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWarehouseItemCornProcurement = (id) => {
  return api.get(`/warehouses/items/corns/procurements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWarehouseItemCornProcurementPayment = (paylaod, id) => {
  return api.post(
    `/warehouses/items/corns/procurements/${id}/payments`,
    paylaod,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getWarehouseItemCornPrice = () => {
  return api.get(`/warehouses/items/corns/prices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const arrivalConfirmationWarehouseItemCornProcurement = (
  payload,
  id
) => {
  return api.put(
    `/warehouses/items/corns/procurements/${id}/arrivals`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createReadyToEatFeed = (payload) => {
  return api.post(
    `/warehouses/procurements/drafts/ready-to-eat-feeds`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createRawFeed = (payload) => {
  return api.post(`/warehouses/procurements/drafts/raw-feeds`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
