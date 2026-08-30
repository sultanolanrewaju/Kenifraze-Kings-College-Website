import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY?.trim());

export const sendMail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  // 1. Correct validation logic (checks that ALL fields exist)
  if (!name || !phone || !email || !message) {
    console.log("Validation Failed: Missing required fields");
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    // 2. Destructure data and error from Resend response
    const { data, error } = await resend.emails.send({
      from: "Sultan Dev <onboarding@resend.dev>", // MUST include email address
      to: "sultanolanrewaju65@gmail.com",          // Must match your Resend account email during testing
      replyTo: email,
      subject: `Inquiry from ${name}`,
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 3. Handle Resend API error cleanly
    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Email sent successfully:", data);
    return res.status(200).json({ message: "Email Sent Successfully!!!", data });

  } catch (error) {
    console.error("Server Catch Error: ", error);
    return res.status(500).json({ error: "Internal Server Error while sending email" });
  }
};