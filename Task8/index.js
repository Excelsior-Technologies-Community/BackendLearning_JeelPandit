import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// db connect
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// // simple test register route
// app.get("/register", (req, res) => {
//   res.json({
//     message: "Register route is working",
//   });
// });

// routes
app.use("/api", authRoutes);

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});