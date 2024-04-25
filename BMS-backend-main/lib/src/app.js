"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const DB = process.env.DB_URL;
console.log("DB", DB);
mongoose_1.default
    .connect(DB || 'mongodb+srv://Lucious:lucious0801a,H@cluster0.uy59lo1.mongodb.net/')
    .then(() => {
    console.log('db connected');
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
// app.use(bodyParser.json());
// view engine setup
app.set('views', path_1.default.join(__dirname, "../../", 'views'));
app.use('/books', bookRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../", '../public')));
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(500);
    res.send(err);
});
module.exports = app;
