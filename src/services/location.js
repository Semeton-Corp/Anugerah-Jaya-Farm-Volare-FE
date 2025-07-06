import api from "./api";
const token = localStorage.getItem("token");

export const getLocations = () => {
  return api.get("/locations", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
