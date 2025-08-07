export function useAuth() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  return { user, token, isLoggedIn: !!token };
}

// src/hooks/useAuth.ts


export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/"; // or use navigate("/login") if using react-router
}
