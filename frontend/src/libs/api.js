import axios from "axios";

// Uses Vercel's env variable when deployed, or defaults to localhost in dev
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});



export default API;
