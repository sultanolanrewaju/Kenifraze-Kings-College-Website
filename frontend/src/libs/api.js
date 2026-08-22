const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT
    : import.meta.env.VITE_PRODUCTION;

export default API_BASE_URL;