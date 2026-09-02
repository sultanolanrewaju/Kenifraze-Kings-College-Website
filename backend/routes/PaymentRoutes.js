import express from 'express';
import { getDonor, initializeDonation, verifyDonation } from "../controller/PaymentController.js";
const router = express.Router();


// Get all Donor
router.get("/",getDonor)

// GET /api/payment/donate/verify/:reference
router.get('/verify/:reference', verifyDonation);

// POST /api/payment/donate/initialize
router.post('/initialize', initializeDonation);


export default router;