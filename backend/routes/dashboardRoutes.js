import express from 'express';
import { getDashboardSummary } from "../controller/dashboardController.js"
const router = express.Router();

// Maps to GET /dashboard/summary (or GET /api/dashboard/summary)
router.get('/summary', getDashboardSummary);

export default router;