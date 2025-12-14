import express from "express";
import {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
  getBookById,
  getBooksByGenre,
  getTotalBooks,
  borrowBook,
  returnBook
} from "../controllers/booksController.js";

const router = express.Router();

// Kuha tanan libro
router.get("/books", getAllBooks);

// GET total number of books
router.get("/books/total", getTotalBooks);

// GET books by genre
router.get("/books/genre", getBooksByGenre);

// GET book by ID
router.get("/books/:id", getBookById);

// BORROW a book
router.put("/books/borrow/:id", borrowBook);

// RETURN a book
router.put("/books/return/:id", returnBook);

// Create bag-o nga libro
router.post("/books", createBook);

// Delete libro gamit an ID
router.delete("/books/:id", deleteBook);

// Update libro gamit an ID
router.put("/books/:id", updateBook);

export default router;
