// import Admin from "./models/Admin.js";
// import "dotenv/config"
// import express from "express";
// import mongoose from "mongoose";

// const app = express();
// Create Admin First
// export const createAdmin = async(req,res)=>{
//     const admin = new Admin({
//        email:process.env.EMAIL,
//        password:process.env.PASSWORD
//     })
//     await admin.save()
// }

// mongoose.connect(process.env.MONGO_URI).then(()=>{
//   console.log("Mongodb Connected Successfully!!");
//   createAdmin().then(()=>{
//   app.listen(process.env.PORT,"0.0.0.0",()=>{
//       console.log(`Server Is running on port http://localhost:${process.env.PORT}`)
//   });
// })
// })

//     console.log("Admin Created Successfully!!")
// }).catch((err)=>{
//     console.log(err)
// })  