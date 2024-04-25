import { Schema, model, Document } from 'mongoose';



const userSchema = new Schema({
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



const usersModel = model('users', userSchema);

export { usersModel, userSchema };
    
