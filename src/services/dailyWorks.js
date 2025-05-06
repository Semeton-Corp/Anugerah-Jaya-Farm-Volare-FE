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

export const takeAdditionalWorks = (id) => {
  return api.post(
    `/works/additionals/takes/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
};

export const getAdditionalWorkById = (id) => {
  return api.get(`/works/additionals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateAdditionalWorkById = (id, payload) => {
  return api.put(`/works/additionals/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteAdditionalWorkById = (id) => {
  return api.delete(`/works/additionals/${id}`, {
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

export const deleteDailyWorkByRoleId = (id) => {
  return api.delete(`/works/dailies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
