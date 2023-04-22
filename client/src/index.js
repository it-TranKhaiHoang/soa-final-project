const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('tkh'));
app.use(session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
        helpers: {
            isManager: (val, options) => {
                if (val == 'manager') return options.fn(this);
            },
            ifEquals: (item, activeItem, options) => {
                return item == activeItem ? options.fn(this) : options.inverse(this);
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.get('/', (req, res) => {
    res.render('pages/home');
});

// Router

app.listen(port, () => console.log('Client started in http://localhost:3000'));
