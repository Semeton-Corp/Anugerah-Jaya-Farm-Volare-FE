import api from "./api";
const token = localStorage.getItem("token");

export const getListDailyWorks = () => {
  return api.get("/works/dailies", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getAdditionalWorks = () => {
  return api.get("/works/additionals", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createAdditionalWorks = (payload) => {
  return api.post("/works/additionals", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getDailyWorkByRoleId = (roleId) => {
  return api.get(`/works/dailies/${roleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createUpdateDailyWorkByRoleId = (payload) => {
  return api.post(`/works/dailies`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
