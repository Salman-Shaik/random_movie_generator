const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use((req, res, next) => {
    let cookie = req.cookies.apiKey;
    if (!cookie) {
        res.cookie('apiKey', '8f38dc176aea0ef9cbb167f50a8fc9b2');
    } else {
        console.info("Api Key cookie already exists");
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
    next();
});

app.use(express.static('public'));

module.exports = app;
