import mongoose from "mongoose";

import * as z from 'zod';

const userSchemas = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
});

export default userSchemas;



const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pageCount: { type: Number, required: true },
  publisher: { type: String, required: true },
  Genre: { type: String, required: true },

  authorId: { type: mongoose.Schema.Types.ObjectId, 
    ref:  "users"},
});

const userSchema = new mongoose.Schema({
  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  
  // Add more fields as needed
});

const Book = mongoose.model('Book', bookSchema, 'books');
const User = mongoose.model('User', userSchema, 'users');

export{ Book, User };
