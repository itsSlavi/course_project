import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🟢 Автоматично добавяне на токена
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Token в localStorage:", token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("➡️ Sending token:", req.headers.Authorization);
  }
  console.log("📤 Headers към бекенда:", req.headers);
  return req;
});

export default API;
