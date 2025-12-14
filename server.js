import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import connectDB from "./config/database.js";

dotenv.config();

// Pag connect ha MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parse hin JSON
app.use(express.json());

// Base route para han books API
app.use("/api", bookRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(`Hello! Running in ${process.env.NODE_ENV || "development"} mode.`);
});

// Start han server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
