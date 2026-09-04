import express from "express"
import {loginAdmin} from "../controller/AdminController.js"
const router = express.Router()

router.post("/login",loginAdmin)

export default router;