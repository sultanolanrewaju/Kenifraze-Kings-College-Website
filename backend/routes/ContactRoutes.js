import express from "express"
import { deleteContact, getContact, postContact } from "../controller/contactController.js";

const router = express.Router();

router.get("/",getContact)
router.patch("/:id",postContact)
router.delete("/",deleteContact)

export default router