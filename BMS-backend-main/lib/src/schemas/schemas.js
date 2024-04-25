"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../model/auth");
const validUser = {
    username: "example_user",
    email: "user@example.com",
    password: "password123",
};
// Now validate the object against the schema
try {
    auth_1.userSchema.validate(validUser);
    console.log("Validation passed, the user object is valid.");
}
catch (error) {
    console.error("Validation failed with error:", error);
}
