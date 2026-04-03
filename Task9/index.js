import express from "express";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();
const PORT = 5001;

connectDB();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("Property Upload API is running..."));
app.use("/api/property", propertyRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));