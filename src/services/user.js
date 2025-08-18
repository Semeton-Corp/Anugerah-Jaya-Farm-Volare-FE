import api from "./api";
const token = localStorage.getItem("token");

export const getListUser = (roleId, locationId, page, keyword) => {
  return api.get("/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      roleId: roleId,
      locationId: locationId,
      page: page,
      keyword: keyword,
    },
  });
};

export const getUserById = (id) => {
  return api.get(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOverviewUser = (id, year, month) => {
  return api.get(`users/overview/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      year: year,
      month: month,
    },
  });
};
