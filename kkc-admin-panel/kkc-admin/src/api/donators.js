// src/api/donators.js
import { apiGet } from "./client";

// Read-only: donations are recorded by the payment webhook, not the admin panel.
export const getDonators = () => apiGet("payment/donate");
