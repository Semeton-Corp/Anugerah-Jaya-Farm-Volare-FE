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

export const getChickenMonitoring = () => {
  return api.get("chickens/monitorings", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
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
