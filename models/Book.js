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
    // FIELD PARA MAHIBAROAN KUN HIN-O AN NAGHIRAM HAN LIBRO
borrower: {
  type: String,        // String ini kay ngaran han borrower (pananglitan: "Juan Dela Cruz")
  default: null        // Default = null, buot sidngon waray naghihiram kon diri pa borrowed
},

// FIELD PARA MAHIBAROAN KUN SAN-O IBABALIK AN LIBRO
dueDate: {
  type: Date,          // Date ini kay petsa han pagbalik han libro
  default: null        // Default = null kon waray pa due date (waray pa ginborrow)
}

    
  },
  { timestamps: true } // Automatic nga add han createdAt ngan updatedAt
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
