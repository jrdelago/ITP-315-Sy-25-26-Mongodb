import mongoose from "mongoose";

// Pag define han Book schema
const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: Number, // Gin gamit nga integer para ID
      required: [true, "ID is required"], // Kinahanglanon
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // Tangtangon an spaces ha unahan o urhi
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    year_published: {
      type: Number,
      required: [true, "Year published is required"],
    },
    borrower: {
      type: String,
      default: null
    },
    dueDate: {
      type: Date,
      default: null
    }
    
  },
  { timestamps: true } // Automatic nga add han createdAt ngan updatedAt
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
