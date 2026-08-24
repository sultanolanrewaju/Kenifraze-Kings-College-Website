// import { Resend } from 'resend';
// import "dotenv/config";

// console.log(process.env.RESEND_API_KEY);
// const resend = new Resend(process.env.RESEND_API_KEY);

// async function runTest() {
//   console.log("Sending email...");

//   const { data, error } = await resend.emails.send({
//     from: 'onboarding@resend.dev', // Default testing sender address required by Resend
//     to: 'sultanolanrewaju65@gmail.com', // Must match your registered Resend account email during testing
//     subject: 'Hello World',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
//   });

//   if (error) {
//     return console.error("Failed to send email:", error);
//   }

//   console.log("Email sent successfully! Response Data:", data);
// }

// runTest();