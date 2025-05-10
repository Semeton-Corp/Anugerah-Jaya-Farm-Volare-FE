import api from "./api";
const token = localStorage.getItem("token");

export const getListStaff = () => {
    return api.post("/eggs/monitorings", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  };