import express from "express";
import { addUser, getUsers } from "../controller/userController.js";

const router = express.Router();

// Add user
router.post("/users", addUser);

// Get users with pagination/filter/search
router.get("/users", getUsers);

export default router;
