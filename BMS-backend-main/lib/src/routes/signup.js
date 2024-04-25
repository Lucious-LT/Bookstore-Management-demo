"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../model/user");
const signup_1 = require("../controller/signup");
const router = express_1.default.Router();
router.post("/", signup_1.checkIfUserHasAccount);
router.get('/', (req, res) => {
    res.render('signup', { Book: user_1.Book });
});
exports.default = router;
