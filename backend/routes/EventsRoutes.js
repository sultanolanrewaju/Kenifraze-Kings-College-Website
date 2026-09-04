import express from "express"
import AdminRoute from "./AdminRoute.js"
import {  getEvent, getOneEvent, postEvent, putEvent,patchEvent,deleteOneEvent,deleteAllEvent, } from "../controller/eventController.js";
import upload from "../middlewares/uploadMiddlewares.js"

const router = express.Router();

var uploadMiddleware = upload.single("ImageUrl"); // Use the same field name as in your form

// Protected Routes
router.post("/",uploadMiddleware,postEvent)
router.put("/:id",uploadMiddleware,putEvent)
router.patch("/:id",patchEvent)
router.delete("/",deleteAllEvent)
router.delete("/:id",deleteOneEvent)


router.get("/",AdminRoute,getEvent)

router.get("/:id",getOneEvent)


export default router