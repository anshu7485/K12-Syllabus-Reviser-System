import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// ✅ Attach token and user ID with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add user ID to headers for backend validation
  if (user && config.headers) {
    try {
      const userData = JSON.parse(user);
      if (userData.id) {
        config.headers['X-User-ID'] = userData.id.toString();
      }
    } catch (e) {
      console.warn("Failed to parse user data from localStorage");
    }
  }
  
  return config;
});

export default api;
