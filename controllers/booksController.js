import Book from "../models/Book.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

export const getAllBooks = async (req, res) => {
  try {
    // pag kuha han ngatanan nga libro tikang ha database
    const books = await Book.find();

    // inen is handler para haligot la an pag sesend hin success response
    successResponse(res, 200, "Books retrieved successfully", books);
  } catch (error) {
    //same adi pag pa haligot la an response pag may error
    errorResponse(res, 500, "An error occurred while retrieving books", error);
  }
};

// dapat naka async kay database operation ini
export const createBook = async (req, res) => {
  try {
    // pag extract han data tikang ha request body
    const { title, author, genre, year_published } = req.body;

    // simple validation
    if (!title || !author || !genre || !year_published) {
      errorResponse(res, 400, "All book fields are required");
      return;
    }

    // pag create han bag-o nga libro ha database
    const newBook = await Book.create({
      title,
      author,
      genre,
      year_published,
    });

    // pag send han success response gamit an helper
    successResponse(res, 201, "Book created successfully", newBook);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while creating the book", error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    // pag extract han book ID tikang ha request query parameters
    const { id } = req.query;

    // simple validation
    if (!id) {
      errorResponse(res, 400, "Book ID is required");
      return;
    }

    // pag delete han libro tikang ha database
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      errorResponse(res, 404, "Book not found");
      return;
    }

    // kon ma delete na, pag send han success response
    successResponse(res, 200, "Book deleted successfully");
  } catch (error) {
    errorResponse(res, 500, "An error occurred while deleting the book", error);
  }
};

export const updateBook = async (req, res) => {
  try {
    // pag extract han book ID tikang ha request parameters
    const { id } = req.params;
    // pag extract han updated data tikang ha request body
    const { title, author, genre, year_published } = req.body;

    // pag update han libro ha database
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, year_published },
      { new: true, runValidators: true }
    );

    // kon waray ma update, pag send hin 404 response
    if (!book) {
      errorResponse(res, 404, "Book not found");
      return;
    }
    // pag send han success response
    successResponse(res, 200, "Book updated successfully", book);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while updating the book", error);
  }
};
