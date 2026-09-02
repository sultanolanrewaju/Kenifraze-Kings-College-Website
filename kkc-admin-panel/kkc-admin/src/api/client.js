// src/api/client.js
// Thin fetch wrapper shared by every API module. Keeps auth headers,
// error handling and FormData vs JSON logic in one place.

export const API_BASE_URL = "http://localhost:5000/api/" ;

function getAuthToken() {
  return localStorage.getItem("kkc_admin_token");
}

/**
 * @param {string} path - e.g. "/instructors" or "/instructors/12"
 * @param {object} options
 * @param {string} options.method
 * @param {object|FormData|null} options.body
 * @param {boolean} options.isFormData - set true when body is FormData
 */
export async function apiRequest(path, { method = "GET", body = null, isFormData = false } = {}) {
  const headers = {};
  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData && body) headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    credentials: "include",
  });

  // Multer/Express errors often come back as JSON with a `message` field.
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errBody = await response.json();
      message = errBody.message || message;
    } catch {
      // response wasn't JSON, keep default message
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const apiGet = (path) => apiRequest(path, { method: "GET" });
export const apiPost = (path, body, isFormData = false) =>
  apiRequest(path, { method: "POST", body, isFormData });
export const apiPatch = (path, body, isFormData = false) =>
  apiRequest(path, { method: "PATCH", body, isFormData });
export const apiDelete = (path) => apiRequest(path, { method: "DELETE" });
