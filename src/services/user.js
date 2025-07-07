import api from "./api";
const token = localStorage.getItem("token");

export const getListUser = (roleId) => {
  return api.get("/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      roleId: roleId,
    },
  });
};
