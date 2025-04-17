import api from "./api";

export const inputAyam = (payload) => {
  const token = localStorage.getItem("token");

  return api.post("/chickens/monitorings", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
