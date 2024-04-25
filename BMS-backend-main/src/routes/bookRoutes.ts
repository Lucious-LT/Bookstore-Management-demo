import express from "express";

import {
  getAllBooks,
  getBooksById,
  createNewBook,
  updateBook,
  deleteBook
} from "../controller/bookController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:authorId", getBooksById);
router.post("/", createNewBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
