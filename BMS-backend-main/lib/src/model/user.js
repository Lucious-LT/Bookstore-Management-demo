"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const z = __importStar(require("zod"));
const userSchemas = z.object({
    username: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
});
exports.default = userSchemas;
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pageCount: { type: Number, required: true },
    publisher: { type: String, required: true },
    Genre: { type: String, required: true },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users" },
});
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    // Add more fields as needed
});
const Book = mongoose_1.default.model('Book', bookSchema, 'books');
exports.Book = Book;
const User = mongoose_1.default.model('User', userSchema, 'users');
exports.User = User;
