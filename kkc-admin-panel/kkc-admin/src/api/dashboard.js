// src/api/dashboard.js
import { apiGet } from "./client";

// Expected shape: { totalInstructors, totalDonators, totalSiteVisits, recentActivity: [] }
export const getDashboardSummary = () => apiGet("dashboard/summary");
