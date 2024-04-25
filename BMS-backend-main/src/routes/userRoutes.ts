import express from 'express';
import Signup from '../controller/userController';
import { userLogin } from '../controller/loginController';


const router = express.Router();

// Route for user signup
router.post('/signup', Signup);
router.post('/login', userLogin);
// Route for user login


export default router;
