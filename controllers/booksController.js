import Book from "../models/Book.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// PAG KUHA HAN NGATANAN NGA LIBRO
export const getAllBooks = async (req, res) => {
  try {
    // Kuha han tanan libro tikang ha database
    const books = await Book.find();
    // Send hin success response gamit an helper
    successResponse(res, 200, "Books retrieved successfully", books);
  } catch (error) {
    // Kon may error ha pagkuha
    errorResponse(res, 500, "An error occurred while retrieving books", error);
  }
};

// PAG KUHA HAN BOOK PINAAGI HAN ID
export const getBookById = async (req, res) => {
  try {
    // Kuha han ID tikang ha route parameters
    const id = Number(req.params.id);

    // Validation: kon diri valid nga number
    if (isNaN(id)) return errorResponse(res, 400, "Invalid book ID");

    // Kuha han libro tikang ha database
    const book = await Book.findById(id);

    // Kon waray makita nga libro
    if (!book) return errorResponse(res, 404, "Book not found");

    // Kon may makita, send success response
    successResponse(res, 200, "Book retrieved successfully", book);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while retrieving the book", error);
  }
};

// PAG KUHA HAN NGATANAN NGA BOOKS PINAAGI HAN GENRE
export const getBooksByGenre = async (req, res) => {
  try {
    // Kuha han genre tikang ha query parameters
    const genre = req.query.genre;

    // Validation: kon waray genre ginhatag
    if (!genre) return errorResponse(res, 400, "Genre is required");

    // Kuha han tanan libro nga pareho an genre (case-insensitive)
    const books = await Book.find({ genre: { $regex: new RegExp(`^${genre}$`, "i") } });

    // Kon waray makita nga libro
    if (books.length === 0) return errorResponse(res, 404, "No books found for this genre");

    // Send success response
    successResponse(res, 200, "Books retrieved successfully", books);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while retrieving books by genre", error);
  }
};



// PAG CREATE HAN BAG-O NGA LIBRO
export const createBook = async (req, res) => {
  try {
    const { _id, title, author, genre, year_published } = req.body;

    // Validation han required fields
    if (_id === undefined || !title || !author || !genre || !year_published) {
      return errorResponse(res, 400, "All book fields are required");
    }

    const id = Number(_id);
    if (isNaN(id)) return errorResponse(res, 400, "Invalid book ID");

    // Check kon may existing nga libro nga pareho ID
    const existingBook = await Book.findById(id);
    if (existingBook) return errorResponse(res, 400, "A book with this ID already exists");

    // Pag create han libro
    const newBook = await Book.create({ _id: id, title, author, genre, year_published });

    successResponse(res, 201, "Book created successfully", newBook);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while creating the book", error);
  }
};

// PAG DELETE HAN LIBRO
export const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return errorResponse(res, 400, "Invalid book ID");

    const book = await Book.findByIdAndDelete(id);
    if (!book) return errorResponse(res, 404, "Book not found");

    successResponse(res, 200, "Book deleted successfully");
  } catch (error) {
    errorResponse(res, 500, "An error occurred while deleting the book", error);
  }
};

// PAG UPDATE HAN LIBRO
export const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return errorResponse(res, 400, "Invalid book ID");

    const { title, author, genre, year_published } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, year_published },
      { new: true, runValidators: true } // Para makuha an updated book
    );

    if (!book) return errorResponse(res, 404, "Book not found");

    successResponse(res, 200, "Book updated successfully", book);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while updating the book", error);
  }
};

// PAG KUHA HAN TOTAL NUMBER HAN BOOKS HA LIBRARY
export const getTotalBooks = async (req, res) => {
  try {
    // Kuha han total number han books tikang ha database
    const total = await Book.countDocuments();

    // Pag send han success response
    successResponse(res, 200, "Total number of books retrieved successfully", { total });
  } catch (error) {
    errorResponse(res, 500, "An error occurred while counting the books", error);
  }
};

// PAG BORROW HAN BOOK
export const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrower, dueDate } = req.body;

    if (!borrower || !dueDate) {
      return errorResponse(res, 400, "Borrower name and due date are required");
    }

    const book = await Book.findById(id);
    if (!book) return errorResponse(res, 404, "Book not found");

    if (book.borrower) return errorResponse(res, 400, "Book is already borrowed");

    book.borrower = borrower;
    book.dueDate = new Date(dueDate);

    await book.save();

    successResponse(res, 200, "Book borrowed successfully", book);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while borrowing the book", error);
  }
};

// PAG RETURN HAN BOOK
export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return errorResponse(res, 404, "Book not found");

    if (!book.borrower) return errorResponse(res, 400, "Book is not currently borrowed");

    book.borrower = null;
    book.dueDate = null;

    await book.save();

    successResponse(res, 200, "Book returned successfully", book);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while returning the book", error);
  }
};

// PAG KUHA HAN LIST HAN NGATANAN NGA GENRES HA LIBRARY
export const getAllGenres = async (req, res) => {
  try {
    // Pag kuha han distinct genre values tikang ha database
    const genres = await Book.distinct("genre");

    if (genres.length === 0) {
      return errorResponse(res, 404, "No genres found in the library");
    }

    successResponse(res, 200, "Genres retrieved successfully", genres);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while retrieving genres", error);
  }
};

// PAG KUHA HAN LIST HAN NGATANAN NGA AUTHORS HA LIBRARY
export const getAllAuthors = async (req, res) => {
  try {
    // Pag kuha han distinct author values tikang ha database
    const authors = await Book.distinct("author");

    if (authors.length === 0) {
      return errorResponse(res, 404, "No authors found in the library");
    }

    successResponse(res, 200, "Authors retrieved successfully", authors);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while retrieving authors", error);
  }
};


