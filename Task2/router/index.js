import expess from "express";
import { createUser, getUsers } from "../controller/userDataLogic.js";

const router = expess.Router();

router.post("/create-user", createUser);
router.get("/get-users", getUsers);

export default router;
