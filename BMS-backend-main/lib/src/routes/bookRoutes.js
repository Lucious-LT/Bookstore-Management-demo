"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const router = express_1.default.Router();
router.get("/", bookController_1.getAllBooks);
router.get("/:authorId", bookController_1.getBooksById);
router.post("/", bookController_1.createNewBook);
router.put("/:id", bookController_1.updateBook);
router.delete("/:id", bookController_1.deleteBook);
exports.default = router;
