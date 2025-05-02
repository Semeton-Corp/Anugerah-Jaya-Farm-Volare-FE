import api from "./api";
const token = localStorage.getItem("token");

export const getRoles = () => {
  return api.get("/roles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
