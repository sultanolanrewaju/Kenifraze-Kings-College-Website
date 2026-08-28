import express from "express"
import {getInstructor ,getInstructorbyId,postInstructor,putInstructor,patchInstructor,deleteInstructor,deleteallInstructor} from "../controller/instructorController.js"
import upload from "../middlewares/uploadMiddlewares.js"


const router = express.Router()

// Protected Routes
router.post("/",upload.single("ImageUrl"),postInstructor)
router.put("/:id",upload.single("ImageUrl"),putInstructor)
router.patch("/:id",upload.single("ImageUrl"),patchInstructor)
router.delete("/:id",deleteInstructor)
router.delete("",deleteallInstructor)


// Public Routes

router.get("/",getInstructor);
router.get("/:id",getInstructorbyId);


export default router