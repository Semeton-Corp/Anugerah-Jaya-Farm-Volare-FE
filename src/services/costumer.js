import api from "./api";
const token = localStorage.getItem("token");

export const getCustomers = () => {
  return api.get("/customers", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
