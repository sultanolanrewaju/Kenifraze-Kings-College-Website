import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express();
import mongoose from "mongoose"
import EventsRoutes from "./routes/EventsRoutes.js"
import AcademicRoutes from "./routes/AcademicRoutes.js"
import InstructorRoutes from "./routes/InstructorRoute.js"
import PaymentRoutes from "./routes/PaymentRoutes.js"
import ContactRoutes from "./routes/ContactRoutes.js"
import { configDotenv } from 'dotenv';

import cors from "cors"
app.use(express.json())
app.use(cors())

app.use("/api/admin/events",EventsRoutes)
app.use("/api/admin/academics",AcademicRoutes)
app.use("/api/admin/instructors",InstructorRoutes)
app.use("/api/admin/contact",ContactRoutes)
app.use("/api/payment/donate",PaymentRoutes)





// Local 
// MOngoURI = process.env.MONGO_URI ||

mongoose.connect("mongodb://localhost:27017/kkcDb").then(()=>{
  console.log("Mongodb Connected Successfully!!");
  app.listen(process.env.PORT,()=>{
      console.log(`Server Is running on port http://localhost:${process.env.PORT}`)
  });
})

