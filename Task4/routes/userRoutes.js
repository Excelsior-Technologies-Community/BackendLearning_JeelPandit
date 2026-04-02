import express from "express";
import { createUser, getUsers, getUserById } from "../controller/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
