import api from "./api";
const token = localStorage.getItem("token");

export const inputAyam = (payload) => {
  return api.post("/chickens/monitorings", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenMonitoring = (locationId, date) => {
  return api.get("chickens/monitorings", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      locationId: locationId,
      date: date,
    },
  });
};

export const deleteChickenData = (dataId) => {
  return api.delete(`/chickens/monitorings/${dataId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenMonitoringById = (dataId) => {
  return api.get(`/chickens/monitorings/${dataId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateChickenMonitoring = (dataId, payload) => {
  return api.put(`/chickens/monitorings/${dataId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteChickenVaccineMonitoring = (chickenMonitoringId, id) => {
  return api.delete(
    `/chickens/monitorings/${chickenMonitoringId}/vaccines/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
};

export const deleteChickenDiseaseMonitoring = (chickenMonitoringId, id) => {
  return api.delete(
    `/chickens/monitorings/${chickenMonitoringId}/diseases/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
};

///HEALTH ITEMS
export const createChickenHealthItem = (payload) => {
  return api.post(`/chickens/healths/items`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenHealthItems = () => {
  return api.get(`/chickens/healths/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenHealthItemById = (id) => {
  return api.get(`/chickens/healths/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteChickenHealthItem = (id) => {
  return api.delete(`/chickens/healths/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateChickenHealthItem = (payload, id) => {
  return api.put(`/chickens/healths/items/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenOverview = (locationId, cageId, overviewGraphTime) => {
  return api.get(`/chickens/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      overviewGraphTime: overviewGraphTime,
      locationId: locationId,
      cageId: cageId,
    },
  });
};

//HEALTH MONITORING

export const createChickenHealthMonitoring = (payload) => {
  return api.post(`/chickens/healths/monitorings`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenHealthMonitoringsDetails = (id) => {
  return api.get(`/chickens/healths/monitorings/details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenHealthMonitoringById = (id) => {
  return api.get(`/chickens/healths/monitorings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateChickenHealthMonitoring = (payload, id) => {
  return api.put(`/chickens/healths/monitorings/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteChickenHealthMonitoring = (payload, id) => {
  return api.delete(`/chickens/healths/monitorings/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createChickenProcurementDraft = (payload) => {
  return api.post(`/chickens/procurements/drafts`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenProcurementDrafts = () => {
  return api.get(`/chickens/procurements/drafts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const confirmationChickenProcurementDraft = (payload, id) => {
  return api.post(
    `/chickens/procurements/drafts/${id}/confirmations`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
};

export const deleteChickenProcurementDraft = (id) => {
  return api.delete(`/chickens/procurements/drafts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenProcurements = () => {
  return api.get(`/chickens/procurements`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getChickenProcurement = (id) => {
  return api.get(`/chickens/procurements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const arrivalConfirmationChickenProcurement = (payload, id) => {
  return api.post(`/chickens/procurements/${id}/arrivals`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createChickenProcurementPayment = (payload, id) => {
  return api.post(`/chickens/procurements/${id}/payments`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createAfkirCustomer = (payload) => {
  return api.post(`/chickens/afkir/customers`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getAfkirCustomers = () => {
  return api.get(`/chickens/afkir/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getAfkirCustomer = (id) => {
  return api.get(`/chickens/afkir/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateAfkirCustomer = (payload, id) => {
  return api.put(`/chickens/afkir/customers/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteAfkirCustomer = (id) => {
  return api.delete(`/chickens/afkir/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
