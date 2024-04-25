
import mongoose from 'mongoose';
import express from 'express';

 // Import the Book model from the correct file path

const router = express.Router();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)

// Load routes
app.use('/api/Auth', router);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running smoothely on http://localhost:${PORT}`);
});
