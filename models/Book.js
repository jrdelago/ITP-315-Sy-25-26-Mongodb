import mongoose from "mongoose";
// pag define han Book schema
const bookSchema = new mongoose.Schema(
  {
    // pag define han properties han Book schema
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
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
  },
  {
    // pag add han timestamps ha kada document
    timestamps: true,
  }
);
// pag create han Book model para ha database
const Book = mongoose.model("Book", bookSchema);

export default Book;
