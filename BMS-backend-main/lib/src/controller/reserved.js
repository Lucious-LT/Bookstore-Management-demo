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
exports.deleteBook = exports.updateBook = exports.createNewBook = exports.getBooksBySingleAuthor = exports.getAllBooks = void 0;
const user_1 = require("../model/user");
const node_url_1 = __importDefault(require("node:url"));
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allBooks = yield user_1.Book.find();
            res.render('viewName', { allBooks });
        }
        catch (error) {
            res.status(500).json({
                message: (error)
            });
        }
    });
}
exports.getAllBooks = getAllBooks;
function getBooksBySingleAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.params.bookId;
            console.log("bookId", bookId);
            const books = yield user_1.Book.find({ authorId: bookId });
            res.json({ books });
            // res.status(200).json({
            //   message: books,
            // });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.getBooksBySingleAuthor = getBooksBySingleAuthor;
;
function createNewBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, author, pageCount, publisher, Genre, bookID } = req.body;
        try {
            const newBook = yield user_1.Book.create({ title, author, pageCount, Genre, publisher, bookID });
            const bookId = newBook.id;
            console.log("bookId", bookId);
            req.user = bookId;
            console.log("req.user", req.user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.createNewBook = createNewBook;
;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { query } = node_url_1.default.parse(req.url, true);
        const { title, author, pageCount, publisher, Genre, bookID } = req.body;
        console.log("id", query.id);
        try {
            const id = query.id;
            const bookObject = { title, author, pageCount, publisher, Genre, bookID };
            const updatedBook = yield user_1.Book.findByIdAndUpdate(id, bookObject, { new: true });
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
                message: error,
            });
        }
    });
}
exports.updateBook = updateBook;
;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { id } = req.params.id;
        const { query } = node_url_1.default.parse(req.url, true);
        const id = query.id;
        try {
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
            });
        }
    });
}
exports.deleteBook = deleteBook;
;
