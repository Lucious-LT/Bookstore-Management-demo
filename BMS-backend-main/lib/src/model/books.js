"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    datePublished: { type: Date, required: true },
    pageCount: { type: Number, required: true },
    publisher: { type: String, required: true },
    Genre: { type: Number, required: true },
    bookId: { type: Number, required: true },
    published: { type: Boolean, required: true },
    // Add more fields as needed
});
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add more fields as needed
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.Book = Book;
