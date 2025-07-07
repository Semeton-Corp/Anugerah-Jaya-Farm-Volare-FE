import api from "./api";
const token = localStorage.getItem("token");

//store
//warehouse
export const createWarehousePlacement = (payload) => {
  return api.post("/placements/warehouses", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//cage
