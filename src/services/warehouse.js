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
