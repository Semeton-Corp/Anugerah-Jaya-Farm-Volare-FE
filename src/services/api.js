import axios from "axios";

const api = axios.create({
  baseURL: "http://volare.cupcakez.my.id/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
