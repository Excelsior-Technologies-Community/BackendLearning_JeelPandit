import express from "express";
import {
  getMovies,
  addMovie,
  getSingleMovie,
} from "../controller/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);
router.get("/:id", getSingleMovie);

export default router;