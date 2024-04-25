"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.usersModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});
exports.userSchema = userSchema;
const usersModel = (0, mongoose_1.model)('users', userSchema);
exports.usersModel = usersModel;
