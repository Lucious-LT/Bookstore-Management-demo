"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../model/user");
const router = express_1.default.Router();
// GET route to fetch all books
// POST route to create a new book
// router.use(authenticate)
router.post('/addBooks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, pageCount, publisher, Genre, bookID } = req.body;
        console.log("authorId", req.user);
        const authorId = req.user;
        // Validate and save the book to MongoDB
        const newBook = new user_1.Book({ title, author, pageCount, publisher, Genre, bookID, authorId });
        const savedBook = yield newBook.save();
        const bookId = savedBook.id;
        console.log("bookId", bookId);
        res.send("book added successfully");
    }
    catch (error) {
        console.error('Error creating a new book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBooks = yield user_1.Book.find();
        res.send(allBooks);
    }
    catch (error) {
        res.status(500).json({
            message: (error)
        });
    }
}));
// GET route to fetch a single book by its ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("id", id);
    try {
        const book = yield user_1.Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        console.log("book", book);
        res.send(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}));
// ...
// PUT route to update a single book by its ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, pageCount, publisher, genre, bookID } = req.body;
    try {
        // Find the book by ID
        const book = yield user_1.Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Update the book fields
        book.title = title || book.title;
        book.author = author || book.author;
        book.pageCount = pageCount || book.pageCount;
        book.publisher = publisher || book.publisher;
        book.Genre = genre || book.Genre;
        book.bookID = bookID || book.bookID;
        // Save the updated book
        const updatedBook = yield book.save();
        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: (error),
        });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find the book by ID and remove it
        const deletedBook = yield user_1.Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            message: 'Book deleted successfully',
            book: deletedBook,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: (error),
        });
    }
}));
// Additional routes for UPDATE and DELETE can be added here
exports.default = router;
