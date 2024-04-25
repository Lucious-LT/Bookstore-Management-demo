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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const auth_1 = require("../model/auth");
// Import the findOne function from the usersModel module
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.strictNewUserSchema = exports.userSchema.strict();
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            exports.strictNewUserSchema.parse({ username, password });
            // Find the user by username
            const user = yield auth_1.usersModel.findOne({ username }); // Use the findOne function to find the user
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Compare passwords
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // If password is valid, generate a JWT token
            let token;
            try {
                token = jsonwebtoken_1.default.sign({ userId: user.get('_id'), username: user.username }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
            }
            catch (error) {
                console.error('JWT Sign Error:', error);
                return res.status(500).json({ error: 'Error signing JWT token' });
            }
            res.status(200).json({ token });
        }
        catch (error) {
            // Handle validation errors
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: error.message });
            }
            console.error('Login error:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    });
}
exports.userLogin = userLogin;
;
