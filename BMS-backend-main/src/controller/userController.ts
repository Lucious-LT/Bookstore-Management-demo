import {Response, NextFunction } from "express";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { usersModel} from "../model/auth";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../../express';
import { token } from "morgan";
import { Request } from 'express';



// Zod to validate
export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  
});

export const strictNewUserSchema = userSchema.strict();


export default async function Signup(req: AuthenticatedRequest, res: Response, _next: NextFunction) {
  try {
    const validation = strictNewUserSchema.parse(req.body);
    const { username, email, password } = validation;

    // Check if the email already exists
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please signin instead.",
        statusCode: 400
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new usersModel({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Log in the user and get the token
  

    res.status(201).json({
      message: `User with Email: ${email} signed up successfully!`,
      token: token
    });
  } catch (error) {
    res.status(400).json({ message: error});
  }
}





  export async function userLogin(req: Request, res: Response, _next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string, password: string };
    userSchema.parse({ email, password });

    // Find the user by username
    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid =  bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If password is valid, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: "Invalid data"});
    }

    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



