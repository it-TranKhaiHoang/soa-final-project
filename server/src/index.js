const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();
const database = require('./config/database');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const apiRouter = require('./resources/routers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('tkh'));
app.use(session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to database
database.connect();

// Router


app.listen(port, () => console.log('Server started'));
