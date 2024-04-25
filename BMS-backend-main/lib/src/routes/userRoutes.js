"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const loginController_1 = require("../controller/loginController");
const router = express_1.default.Router();
// Route for user signup
router.post('/signup', userController_1.default);
router.post('/login', loginController_1.userLogin);
// Route for user login
exports.default = router;
