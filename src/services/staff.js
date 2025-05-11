import api from "./api";
const token = localStorage.getItem("token");

export const getListStaff = () => {
  return api.get("/staffs", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
