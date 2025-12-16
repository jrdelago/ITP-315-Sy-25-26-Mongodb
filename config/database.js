import mongoose from "mongoose";

// Ini nga function amo an magkokonek ha MongoDB database
const connectDB = async () => {
  try {
    // Pag connect gamit an environment variable MONGODB_URI
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Kon waray koneksyon, mastop an server
  }
};

export default connectDB;
