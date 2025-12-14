// Pag import han Book model tikang ha models folder
import Book from "../models/Book.js";

// Pag import han helper functions para standardized responses
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

/* ===============================
   PAG KUHA HAN NGATANAN NGA LIBRO
   =============================== */
export const getAllBooks = async (req, res) => {
  try {
    // Kuha han ngatanan nga libro tikang ha MongoDB collection
    const books = await Book.find();

    // Pag send hin success response upod an data han books
    successResponse(res, 200, "Books retrieved successfully", books);
  } catch (error) {
    // Kon may error ha database operation, pag balik error response
    errorResponse(res, 500, "An error occurred while retrieving books", error);
  }
};

/* ===============================
   PAG KUHA HAN BOOK PINAAGI HAN ID
   =============================== */
export const getBookById = async (req, res) => {
  try {
    // Pag convert han id tikang ha URL parameter ngadto number
    const id = Number(req.params.id);

    // Validation: kon diri valid nga number an ID
    if (isNaN(id)) {
      return errorResponse(res, 400, "Invalid book ID");
    }

    // Pag pangita han libro pinaagi han ID
    const book = await Book.findById(id);

    // Kon waray libro nga nakita
    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    // Kon may libro nga nakita, pag send hin success response
    successResponse(res, 200, "Book retrieved successfully", book);
  } catch (error) {
    // Pag handle han unexpected nga error
    errorResponse(res, 500, "An error occurred while retrieving the book", error);
  }
};

/* ======================================
   PAG KUHA HAN NGATANAN NGA BOOKS BY GENRE
   ====================================== */
export const getBooksByGenre = async (req, res) => {
  try {
    // Kuha han genre tikang ha query parameter (?genre=Fantasy)
    const genre = req.query.genre;

    // Validation: kinahanglan may genre nga ginhatag
    if (!genre) {
      return errorResponse(res, 400, "Genre is required");
    }

    // Pangita han ngatanan libro nga pareho an genre (case-insensitive)
    const books = await Book.find({
      genre: { $regex: new RegExp(`^${genre}$`, "i") }
    });

    // Kon waray libro nga nagtugma han genre
    if (books.length === 0) {
      return errorResponse(res, 404, "No books found for this genre");
    }

    // Pag balik hin success response upod an list han books
    successResponse(res, 200, "Books retrieved successfully", books);
  } catch (error) {
    // Pag handle han error kon may problema ha database
    errorResponse(res, 500, "An error occurred while retrieving books by genre", error);
  }
};

/* ===============================
   PAG CREATE HAN BAG-O NGA LIBRO
   =============================== */
export const createBook = async (req, res) => {
  try {
    // Pag destructure han data tikang ha request body
    const { _id, title, author, genre, year_published } = req.body;

    // Validation: kon may kulang nga field
    if (_id === undefined || !title || !author || !genre || !year_published) {
      return errorResponse(res, 400, "All book fields are required");
    }

    // Pag convert han ID ngadto number
    const id = Number(_id);

    // Validation: kon diri number an ID
    if (isNaN(id)) {
      return errorResponse(res, 400, "Invalid book ID");
    }

    // Pag check kon may existing nga libro nga pareho an ID
    const existingBook = await Book.findById(id);
    if (existingBook) {
      return errorResponse(res, 400, "A book with this ID already exists");
    }

    // Pag create han bag-o nga libro ha database
    const newBook = await Book.create({
      _id: id,
      title,
      author,
      genre,
      year_published
    });

    // Pag balik hin success response upod an new book
    successResponse(res, 201, "Book created successfully", newBook);
  } catch (error) {
    // Pag handle han error kon may problema ha pag create
    errorResponse(res, 500, "An error occurred while creating the book", error);
  }
};

/* ===============================
   PAG DELETE HAN LIBRO BY ID
   =============================== */
export const deleteBook = async (req, res) => {
  try {
    // Pag convert han ID tikang ha URL parameter
    const id = Number(req.params.id);

    // Validation: kon diri valid nga number
    if (isNaN(id)) {
      return errorResponse(res, 400, "Invalid book ID");
    }

    // Pag delete han libro pinaagi han ID
    const book = await Book.findByIdAndDelete(id);

    // Kon waray libro nga nadelete
    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    // Pag balik hin success response
    successResponse(res, 200, "Book deleted successfully");
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while deleting the book", error);
  }
};

/* ===============================
   PAG UPDATE HAN LIBRO
   =============================== */
export const updateBook = async (req, res) => {
  try {
    // Pag convert han ID tikang ha URL parameter
    const id = Number(req.params.id);

    // Validation: kon diri number an ID
    if (isNaN(id)) {
      return errorResponse(res, 400, "Invalid book ID");
    }

    // Pag kuha han updated fields tikang ha request body
    const { title, author, genre, year_published } = req.body;

    // Pag update han libro ha database
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, year_published },
      {
        new: true,          // Para ibalik an updated nga document
        runValidators: true // Para masunod an schema rules
      }
    );

    // Kon waray libro nga na-update
    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    // Pag balik hin success response upod an updated book
    successResponse(res, 200, "Book updated successfully", book);
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while updating the book", error);
  }
};

/* =================================
   PAG KUHA HAN TOTAL NUMBER OF BOOKS
   ================================= */
export const getTotalBooks = async (req, res) => {
  try {
    // Pag bilang han ngatanan libro ha collection
    const total = await Book.countDocuments();

    // Pag balik hin success response upod an total count
    successResponse(res, 200, "Total number of books retrieved successfully", { total });
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while counting the books", error);
  }
};

/* ===============================
   PAG BORROW HAN BOOK
   =============================== */
export const borrowBook = async (req, res) => {
  try {
    // Pag kuha han ID tikang ha URL
    const id = Number(req.params.id);

    // Pag kuha han borrower ngan dueDate tikang ha request body
    const { borrower, dueDate } = req.body;

    // Validation: kinahanglan may borrower ngan dueDate
    if (!borrower || !dueDate) {
      return errorResponse(res, 400, "Borrower name and due date are required");
    }

    // Pag pangita han libro pinaagi han ID
    const book = await Book.findById(id);

    // Kon waray libro nga nakita
    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    // Kon borrowed na an libro
    if (book.borrower) {
      return errorResponse(res, 400, "Book is already borrowed");
    }

    // Pag set han borrower ngan due date
    book.borrower = borrower;
    book.dueDate = new Date(dueDate);

    // Pag save han changes
    await book.save();

    // Pag balik hin success response
    successResponse(res, 200, "Book borrowed successfully", book);
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while borrowing the book", error);
  }
};

/* ===============================
   PAG RETURN HAN BOOK
   =============================== */
export const returnBook = async (req, res) => {
  try {
    // Pag kuha han ID tikang ha URL
    const id = Number(req.params.id);

    // Pag pangita han libro
    const book = await Book.findById(id);

    // Kon waray libro nga nakita
    if (!book) {
      return errorResponse(res, 404, "Book not found");
    }

    // Kon diri borrowed an libro
    if (!book.borrower) {
      return errorResponse(res, 400, "Book is not currently borrowed");
    }

    // Pag reset han borrower ngan dueDate
    book.borrower = null;
    book.dueDate = null;

    // Pag save han changes
    await book.save();

    // Pag balik hin success response
    successResponse(res, 200, "Book returned successfully", book);
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while returning the book", error);
  }
};

/* ===============================
   PAG KUHA HAN LIST HAN GENRES
   =============================== */
export const getAllGenres = async (req, res) => {
  try {
    // Pag kuha han unique nga genre values ha database
    const genres = await Book.distinct("genre");

    // Kon waray genres nga nakita
    if (genres.length === 0) {
      return errorResponse(res, 404, "No genres found in the library");
    }

    // Pag balik hin success response
    successResponse(res, 200, "Genres retrieved successfully", genres);
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while retrieving genres", error);
  }
};

/* ===============================
   PAG KUHA HAN LIST HAN AUTHORS
   =============================== */
export const getAllAuthors = async (req, res) => {
  try {
    // Pag kuha han unique nga author names ha database
    const authors = await Book.distinct("author");

    // Kon waray authors nga nakita
    if (authors.length === 0) {
      return errorResponse(res, 404, "No authors found in the library");
    }

    // Pag balik hin success response
    successResponse(res, 200, "Authors retrieved successfully", authors);
  } catch (error) {
    // Pag handle han error
    errorResponse(res, 500, "An error occurred while retrieving authors", error);
  }
};
