import api from "./api";

export const getCage = () => {
  const token = localStorage.getItem("token");

  return api.get("/cages", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
