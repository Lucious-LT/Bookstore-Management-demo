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
exports.userLogin = exports.strictNewUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../model/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const morgan_1 = require("morgan");
// Zod to validate
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.strictNewUserSchema = exports.userSchema.strict();
function Signup(req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = exports.strictNewUserSchema.parse(req.body);
            const { username, email, password } = validation;
            // Check if the email already exists
            const existingUser = yield auth_1.usersModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "Email already exists. Please signin instead.",
                    statusCode: 400
                });
            }
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create a new user
            const newUser = new auth_1.usersModel({
                username,
                email,
                password: hashedPassword
            });
            // Save the new user to the database
            yield newUser.save();
            // Log in the user and get the token
            res.status(201).json({
                message: `User with Email: ${email} signed up successfully!`,
                token: morgan_1.token
            });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    });
}
exports.default = Signup;
function userLogin(req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            exports.userSchema.parse({ email, password });
            // Find the user by username
            const user = yield auth_1.usersModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Compare passwords
            const isPasswordValid = bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // If password is valid, generate a JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
            res.status(200).json({ token });
        }
        catch (error) {
            // Handle validation errors
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: "Invalid data" });
            }
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });
}
exports.userLogin = userLogin;
;
