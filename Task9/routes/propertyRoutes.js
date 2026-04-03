import express from "express";
import { createProperty } from "../controller/propertyController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/add", upload.single("propertyImage"), createProperty);
export default router;