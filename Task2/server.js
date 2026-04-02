import mongoose from "mongoose";
import express from "express";
import router from "./router/index.js";

const app = express();
const PORT = 8000;

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", router);

// mongodb connection 
mongoose.connect("mongodb://localhost:27017/userData")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB Error:", error);
});