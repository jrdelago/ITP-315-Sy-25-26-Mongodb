import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import connectDB from "./config/database.js";

dotenv.config();

// pag connect ha database
connectDB();

const app = express();
const PORT = process.env.PORT;

// middleware para mag parse hin JSON requests meaning pirme JSON an body han request
app.use(express.json());
app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.send(
    `Hello, World! Running in ${process.env.NODE_ENV || "development"} mode.`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
