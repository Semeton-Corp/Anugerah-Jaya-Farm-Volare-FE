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
