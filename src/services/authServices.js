import api from "./api";
const token = localStorage.getItem("token");

// Named export
export const login = (username, password) => {
  return api.post("/authentication/signin", { username, password });
};

export const signUp = (payload) => {
  return api.post("/authentication/signup", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
