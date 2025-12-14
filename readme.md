# Books API - Express.js Backend

Usa nga RESTful API para ha pag-manage han mga libro gamit an Express.js na may MVC architecture ngan MongoDB database.

## Features

- CRUD operations para han mga libro (Create, Read, Update, Delete)
- MVC architecture (Models, Controllers, Routes)
- MongoDB database integration
- Input validation ngan error handling
- Clean JSON responses
- Mongoose para han database operations

## Tech Stack

- **express** - Web framework
- **mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **nodemon** - Development auto-reload

## Project Structure

```
├── models/
│   ├── books.js          # Predefined book data (para han testing)
│   └── Book.js           # Mongoose schema para han libro
├── Controllers/
│   └── booksController.js # Business logic ngan database operations
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

1. I-clone an repository
2. Install an dependencies:

```bash
npm install
```

3. Himoa hin `.env` file:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/books_db
```

4. I-start an MongoDB server
5. I-start an application:

```bash
npm start
```

## API Endpoints

### Kuhaon an Tanan nga Libro

**GET** `/api/books`

Nagbabalik han tanan nga libro tikang ha database.

### Mag-create hin Bag-o nga Libro

**POST** `/api/books`

Request body:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "year_published": 2024
}
```

### I-update an Libro

**PUT** `/api/books/:id`

Request body (pwede partial update):

```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "genre": "Updated Genre",
  "year_published": 2024
}
```

### I-delete an Libro

**DELETE** `/api/books?id={bookId}`

Nag-dedelete hin libro base han ID gamit an query parameter.

## Response Format

An tanan nga response kay naka-sunod hini nga structure:

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

- An application nag-uusa han MongoDB para han persistent storage
- Tanan nga operations kay async kay database operations ini
- An Mongoose schema nag-validate han data bago mag-save
- Try-catch blocks para han proper error handling

## Important Reminders

- Kinahanglan tanan nga libro fields pag mag-create
- An update operations nag-support han partial updates
- Nag-validate kun an libro kay existing na ha database
- MongoDB ID kay automatically generated
