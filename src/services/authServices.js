import api from "./api";
const token = localStorage.getItem("token");

// Named export
export const login = (email, password) => {
  return api.post("/authentication/signin", { email, password });
};

export const signUp = (payload) => {
  return api.post("/authentication/signup", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
