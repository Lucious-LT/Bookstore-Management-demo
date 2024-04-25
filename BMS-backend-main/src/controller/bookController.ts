import { Request, Response } from "express";
import { Book } from "../model/user";




import { z } from 'zod';

// Define the schema for validating new book data
export const bookSchemas= z.object({
  title: z.string().nonempty(),
  author: z.string().nonempty(),
  pageCount: z.number().int().min(1),
  publisher: z.string().nonempty(),
  Genre: z.string().nonempty(),
});



export async function getAllBooks(req: Request, res: Response) {
  try {
    const allBooks = await Book.find();
    res.status(200).json({ allBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function getBooksById(req: Request, res: Response) {
  try {
    const authorId = req.params.authorId;
    const books = await Book.find({ authorId });
    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function createNewBook(req: Request, res: Response) {
  const { title, author, pageCount, publisher, Genre } = req.body;
  
  // Validate the request body
  try {
   bookSchemas.parse({
      title,
      author,
      pageCount,
      publisher,
      Genre
    });

    // If validation passes, create the new book
    const newBook = await Book.create({ title, author, pageCount, Genre, publisher });
    res.status(201).json(newBook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return res.status(400).json({ errors: error });
    }
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function updateBook(req: Request, res: Response) {
  const bookId = req.params.id;
  const { title, author, pageCount, publisher, Genre } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, pageCount, publisher, Genre },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function deleteBook(req: Request, res: Response) {
  const bookId = req.params.id;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({
      message: 'Book deleted successfully',
      book: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}


