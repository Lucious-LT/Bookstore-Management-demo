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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createNewBook = exports.getBooksById = exports.getAllBooks = exports.bookSchemas = void 0;
const user_1 = require("../model/user");
const zod_1 = require("zod");
// Define the schema for validating new book data
exports.bookSchemas = zod_1.z.object({
    title: zod_1.z.string().nonempty(),
    author: zod_1.z.string().nonempty(),
    pageCount: zod_1.z.number().int().min(1),
    publisher: zod_1.z.string().nonempty(),
    Genre: zod_1.z.string().nonempty(),
});
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allBooks = yield user_1.Book.find();
            res.status(200).json({ allBooks });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.getAllBooks = getAllBooks;
function getBooksById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorId = req.params.authorId;
            const books = yield user_1.Book.find({ authorId });
            res.json({ books });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.getBooksById = getBooksById;
function createNewBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, author, pageCount, publisher, Genre } = req.body;
        // Validate the request body
        try {
            exports.bookSchemas.parse({
                title,
                author,
                pageCount,
                publisher,
                Genre
            });
            // If validation passes, create the new book
            const newBook = yield user_1.Book.create({ title, author, pageCount, Genre, publisher });
            res.status(201).json(newBook);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                // Handle validation errors
                return res.status(400).json({ errors: error });
            }
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.createNewBook = createNewBook;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.id;
        const { title, author, pageCount, publisher, Genre } = req.body;
        try {
            const updatedBook = yield user_1.Book.findByIdAndUpdate(bookId, { title, author, pageCount, publisher, Genre }, { new: true });
            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({
                message: 'Book updated successfully',
                book: updatedBook,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.updateBook = updateBook;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.id;
        try {
            const deletedBook = yield user_1.Book.findByIdAndDelete(bookId);
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
            });
        }
    });
}
exports.deleteBook = deleteBook;
