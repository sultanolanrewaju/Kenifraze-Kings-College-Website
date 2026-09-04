import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY.trim());

export const sendMail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  // 1. Correct validation logic (checks that ALL fields exist)
  if (!name || !email || !message) {
    console.log("Validation Failed: Missing required fields");
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    // 2. Destructure data and error from Resend response
    const { data, error } = await resend.emails.send({
      from: "Kenifraze Kings COllege <support@kenifrazekingscollege.com>", // MUST include email address
      to: "sultanolanrewaju65@gmail.com",          // Must match your Resend account email during testing
      replyTo: email,
      subject:`🎓 New Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 0;">
              <tr>
                <td align="center">
                  
                  <!-- Main Container -->
                  <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                    
                    <!-- Header Bar -->
                    <tr>
                      <td style="background-color: #1e3a8a; padding: 25px 30px; ">
                    <div style="display:flex; flex-direction=row;gap=1em;">
                    <div>
     <img src="https://kenifrazekingscollege.com/IMAGES/compressor.jpeg" width = "90px" height="90px" style = "border-radius: 50%;object-fit: cover;display: block;">
               </div>
               <div>
                    
                        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">
                          Kenifraze Kings College
                        </h1>
                        <p style="color: #93c5fd; margin: 5px 0 0 0; font-size: 13px;">
                          Website Admissions & Inquiry Notification
                        </p>
                    
                    </div>  
                    </div>
                      </td>
                    </tr>
                  

                    <!-- Body Content -->
                    <tr>
                      <td style="padding: 30px;">
                        <h2 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                          New Contact Form Submission
                        </h2>

                        <!-- Info Table -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 110px; font-weight: 600;">
                              Parent Name:
                            </td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500;">
                              ${name}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                              Email Address:
                            </td>
                            <td style="padding: 8px 0; color: #1e40af; font-size: 14px; font-weight: 500;">
                              <a href="mailto:${email}" style="color: #1e40af; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500;">
                              ${phone}
                            </td>
                          </tr>
                        </table>

                        <!-- Message Box -->
                        <div style="background-color: #f8fafc; border-left: 4px solid #1e3a8a; padding: 16px; border-radius: 4px; margin-bottom: 25px;">
                          <p style="margin: 0 0 8px 0; color: #475569; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                            Message / Inquiry:
                          </p>
                          <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>

                        <!-- Action Callout -->
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; font-style: italic;">
                          💡 <strong>Tip:</strong> Simply click "Reply" in your email client to respond directly to ${name}.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #f3f4f6;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                          Sent automatically from <a href="https://kenifrazekingscollege.com" style="color: #6b7280; text-decoration: underline;">kenifrazekingscollege.com</a>
                        </p>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>

          </body>
        </html>
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