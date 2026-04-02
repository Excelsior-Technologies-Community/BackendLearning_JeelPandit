import express from 'express';  // ✅ Fixed: was "exprees"
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import studentRoute from './routes/studentRoute.js';

// Load .env into this project 
dotenv.config();

const app = express();  // ✅ Fixed: was "exprees"
const port = process.env.PORT || 8000;  // ✅ Fixed: now uses .env or default

// Connect to database
connectDb();

// Middleware 
app.use(express.json());  // ✅ Fixed: was "josn()"

// Routes
app.get('/', (req, res) => {
    res.send("Server is running on port " + port);
})

// ✅ Fixed: Now properly mounting all student routes
app.use('/api/students', studentRoute);

app.listen(port, () => {
    console.log("Server is running on port " + port);
})