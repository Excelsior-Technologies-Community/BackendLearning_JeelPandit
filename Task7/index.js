import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 8002;

// middleware
app.use(express.json());

// DB connect
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// use routes
app.use("/api", userRoutes);

// server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
