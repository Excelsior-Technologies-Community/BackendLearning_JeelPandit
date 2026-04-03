import express from "express";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();
const PORT = 5003;

// connect db
connectDB();

// middleware
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("Movie API with MongoDB is running");
});

// movie routes
app.use("/api/movies", movieRoutes);

// wrong route
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
