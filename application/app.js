var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');
const { Z_TEXT } = require('zlib');

var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            /**
             * more helpers
             */
        }
    })
);
app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dbtest', dbRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.status(500);
    res.send('Something went wrong with your database');
})
module.exports = app;
