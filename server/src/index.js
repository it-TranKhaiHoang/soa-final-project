const express = require('express');
const app = express();
require('dotenv').config();
const database = require('./config/database');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const apiRouter = require('./resources/routers/index');
const cors = require('cors');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('tkh'));
app.use(session());
app.use(flash());
app.use(cors());

// Connect to database
database.connect();

// Router
app.use('/api', apiRouter);

app.listen(port, () => console.log('Server started'));
