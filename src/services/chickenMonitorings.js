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

export const getChickenMonitoring = (locationId) => {
  return api.get("chickens/monitorings", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      locationId: locationId,
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
