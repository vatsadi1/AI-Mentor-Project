import axios from "axios";

const TOKEN_KEY = "pathforge_token";

const client = axios.create({
  baseURL: "/api",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function registerUser({ name, email, password }) {
  const { data } = await client.post("/auth/register", { name, email, password });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await client.post("/auth/login", { email, password });
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await client.get("/auth/me");
  return data.user;
}

export function getAuthErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Authentication failed. Please try again."
    );
  }
  return error?.message || "An unexpected error occurred.";
}

export { client as apiClient };
