import api from "./api";

// Named export
export const login = (email, password) => {
  return api.post("/authentication/signin", { email, password });
};

export const register = (payload) => {
  return api.post("/auth/register", payload);
};
