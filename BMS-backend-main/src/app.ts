import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from "express-session";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';


const app = express();

dotenv.config()

const DB = process.env.DB_URL;
console.log("DB",DB);
mongoose
  .connect(DB || 'mongodb+srv://Lucious:lucious0801a,H@cluster0.uy59lo1.mongodb.net/')
  .then(() => {
    console.log('db connected');
  });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);


// app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, "../../", 'views'));
app.use('/books', bookRoutes);

app.use('/users', userRoutes);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", '../public')));







  app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(500);
    res.send(err);
  });

  module.exports = app;
