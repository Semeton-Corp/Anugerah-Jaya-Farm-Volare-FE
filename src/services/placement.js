import api from "./api";
const token = localStorage.getItem("token");

//store
export const createStorePlacement = (payload) => {
  return api.post("/placements/stores", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//warehouse
export const createWarehousePlacement = (payload) => {
  return api.post("/placements/warehouses", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//cage
