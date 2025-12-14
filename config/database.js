import mongoose from "mongoose";

// pag connect ha database na function
const connectDB = async () => {
  try {
    // pag connect ha mongoose gamit an MONOGODB_URI tikang ha environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
