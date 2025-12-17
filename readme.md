# Books API - Express.js Backend

An API to manage books in a library using Express.js that has MVC architecture and MongoDB database.

## Features

- CRUD operations para han mga libro (Create, Read, Update, Delete)
- MVC architecture (Models, Controllers, Routes)
- MongoDB database integration
- Input validation ngan error handling
- Clean JSON responses
- Mongoose for database operations

## Tech Stack

- **express** - Web framework
- **mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **nodemon** - Development auto-reload

## Project Structure

```
├── models/
│   └── Book.js           # Mongoose schema for the books
├── Controllers/
│   └── booksController.js # Business logic for database operations
├── routes/
│   └── bookRoutes.js      # API endpoints
├── helpers/
│   └── responseHelper.js  # Response utilities
├── config/
│   └── database.js        # MongoDB connection setup
├── server.js              # Entry point
└── .env                   # Environment variables
```

## Installation

1. Clone repository
2. Install dependencies:

```bash
npm install
```

3. Make an `.env` file:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://dbUser:dbuserpassword@books.hoi9nzl.mongodb.net/books_db
```

4. start the MongoDB server
5. start the application:

```bash
npm start
```

## API Endpoints

### Get books

**GET** `/api/books`

Getting all the books in the database

**GET** `/api/books/genre?genre=genre`

Getting a book by genre

**GET** `/api/books/:id`

Getting a book by id

**GET** `/api/books/total`

Getting the total number of books

**GET** `/api/books/genres`

Getting the list of genres available

**GET** `/api/books/authors`

Getting the list of authors available

### Creating/adding a new books

**POST** `/api/books`

Request body:

```json
 {
    "_id": 1,
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel García Márquez",
    "genre": "Magical Realism",
    "year_published": 1967
  }
```

### Update the books

**PUT** `/api/books/:id`

Request body:

```json
{
    "_id": 1,
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel García Márquez",
    "genre": "Magical Realism",
    "year_published": 1967
  }
```
### Borrow and return a book

**PUT** `/api/books/borrow/:id`

Request body:

```json
{
  "borrower": "John Doe",
  "dueDate": "2025-12-25"
}
```
**PUT** `/api/books/return/:id`

### Delete a book

**DELETE** `/api/books/:id`

Deleting a book by id using query parameter.

## Response Format

Structure:

**Success:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**

```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

## Development Notes

- The application uses MongoDB for persistent storage
- All operations are asynchronous because they involve database operations
- The Mongoose schema validates the data before saving
- Try–catch blocks are used for proper error handling

## Important Reminders

- All book fields are required when creating a book
- Update operations support partial updates
- The system validates whether the book already exists in the database