import express from "express";
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
} from "../controller/studentController.js";

const studentRoute = express.Router();

studentRoute.post("/", createStudent);
studentRoute.get("/", getAllStudents);
studentRoute.get("/:id", getSingleStudent);
studentRoute.put("/:id", updateStudent);
studentRoute.delete("/:id", deleteStudent);

export default studentRoute;
