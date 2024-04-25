import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from "zod";
import { usersModel} from "../model/auth";


 // Import the findOne function from the usersModel module


export const userSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export const strictNewUserSchema = userSchema.strict();


export async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body as { username: string, password: string };
    strictNewUserSchema.parse({ username, password });

    // Find the user by username
    const user = await usersModel.findOne({ username }); // Use the findOne function to find the user

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If password is valid, generate a JWT token
    let token;
    try {
      token = jwt.sign(
        { userId: user.get('_id'), username: (user as any).username },
        process.env.JWT_SECRET || 'defaultSecret',
        { expiresIn: '1h' }
      );
    } catch (error) {
      console.error('JWT Sign Error:', error);
      return res.status(500).json({ error: 'Error signing JWT token' });
    }

    res.status(200).json({ token });
  } catch (error) {
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: error.message });
    }

    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
