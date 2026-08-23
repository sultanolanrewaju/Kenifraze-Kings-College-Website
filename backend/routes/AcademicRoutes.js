import express from "express"
import { deleteAcademic, getAcademic,getOneAcademic, postAcademic, updateAcademic, UpdateSpecific } from "../controller/academicController.js"
import upload from "../middlewares/uploadMiddlewares.js"
const router = express.Router()

// Protected Routes
router.post("/",upload.single("ImageUrl"),postAcademic)
router.put("/:id",upload.single("ImageUrl"),updateAcademic)
router.patch("/:id",upload.single("ImageUrl"),UpdateSpecific)
router.delete("/:id",deleteAcademic)


router.get("/",getAcademic)
router.get("/:id",getOneAcademic)



export default router