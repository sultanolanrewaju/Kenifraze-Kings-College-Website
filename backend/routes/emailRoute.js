import express from "express"
import { sendMail } from "../controller/sendmail.js"

const router = express.Router()

router.post("/",sendMail)

export default router;