import api from "./api";
const token = localStorage.getItem("token");

export const inputTelur = (payload) => {
  return api.post("/eggs/monitorings", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getEggMonitoring = () => {
  return api.get("/eggs/monitorings", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteEggData = (dataId) => {
  return api.delete(`/eggs/monitorings/${dataId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
