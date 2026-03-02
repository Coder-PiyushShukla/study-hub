import api from "./Api";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // Just in case old data is stuck
};

const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export default { register, login, logout, getProfile };