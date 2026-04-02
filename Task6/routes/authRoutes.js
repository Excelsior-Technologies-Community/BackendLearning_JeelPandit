import express from "express";
import {
  getUserById,
  getUsers,
  registerUser,
  loginUser,
} from "../controller/authController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
