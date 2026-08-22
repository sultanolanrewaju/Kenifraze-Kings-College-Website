import axios from 'axios';
import Donation from "../models/PaymentModel.js";
import dotenv from 'dotenv/config';

// Getting All the Donor
export const getDonor = async(req,res)=>{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";
    const status = req.query.status || "";

    // Dynamic filter query for MongoDB
    const query = {};

    if(status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        {donorfName :{$regex:search,$options:"i"}},
        {donorlName :{$regex:search,$options:"i"}},
        {email :{$regex:search,$options:"i"}},
        {reference :{$regex:search,$options:"i"}},
      ]
    }

    // Skip previous pages and fetch limited records
    const skip = (page - 1) * limit;
    const Finddonor = await Donation.find(query).sort({createdAt: -1 }).skip(skip).limit(limit)
  res.status(200).json(Finddonor)
  } catch (error) {
    console.log("Error :" + error)
    res.status(500).send("Error in getting Donor")
  }
}

// 1. Initialize Payment
export const initializeDonation = async (req, res) => {
  try {
    const {   donorfName,donorlName,email,amount } = req.body;
    console.log(donorfName,donorlName,email,amount);
    //console.log(process.env.TEST_PAYSTACK_SECRET_KEY);
    

    if (!email || !amount || !donorfName || !donorlName) {
      return res.status(400).json({ error: "Email, amount, and donorName are required." });
    }
    console.log("tester",{donorfName,donorlName,email,amount });
    

    // Convert amount to Kobo/Cents (Paystack calculates in lowest currency unit: 1 NGN = 100 Kobo)
    const amountInKobo = Math.round(Number(amount) * 100);

    // Call Paystack API
    const paystackResponse = await axios.post(
      `${process.env.PAYSTACK_URL}transaction/initialize`,
      {
        email,
        amount: amountInKobo,
        callback_url: process.env.FRONTEND_URL || "localhost:5173/verify", // React redirect page
        metadata: {  donorfName,donorlName },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { authorization_url, reference } = paystackResponse.data.data;

    // Save pending record to MongoDB
    await Donation.create({
       donorfName,
      donorlName,
      email,
      amount: Number(amount),
      reference,
      status: 'pending',
    });

    // Send redirect URL back to React frontend
    res.status(200).json({ authorization_url, reference });
console.log(process.env.FRONTEND_URL);

  } catch (error) {
    console.error("Paystack Init Error:", error.response?.data || error.message);
    console.log(error);
    
    res.status(500).json({ error: error.response?.data?.message || "Payment initialization failed." });
  }
};

// 2. Verify Payment
export const verifyDonation = async (req, res) => {
  try {
    const { reference } = req.params;

    // DEBUG LOGS
    console.log("Extracted Reference:", reference);
    console.log("Secret Key Loaded:", process.env.TEST_PAYSTACK_SECRET_KEY ? "YES" : "NO - KEY IS UNDEFINED");

    if (!reference) {
      return res.status(400).json({ error: "Transaction reference is required." });
    }

    // Call Paystack to verify status directly with their servers
    const paystackResponse = await axios.get(
      `${process.env.PAYSTACK_URL}transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_PAYSTACK_SECRET_KEY}`,
          "Content-Type":"application/json"
        },
      }
    );

    const { status, amount,channel,paid_at, customer, metadata } = paystackResponse.data.data;

    if (status === 'success') {
      // Find pending donation record and update status
      const updatedDonation = await Donation.findOneAndUpdate(
        { reference },
        { status: 'success' },
        { returnDocument: "after" }
      );

      return res.status(200).json({
        message: "Payment verified successfully!",
        donation: {
          ...updatedDonation.toObject(),
        channel,
        paidAt:paid_at,
        }
      });
    }else{
      return res.status(400).json({ error: "Payment verification failed or was abandoned." });
    
    } 
  } catch (error) {
    console.error("Paystack Verify Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error verifying donation status." });
  }
};