const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let createError = require('http-errors');

const indexRouter = require('./routes/index');
const projectRouter = require('./routes/projects');
const servicesRouter = require('./routes/services');
const aboutRouter = require('./routes/user');
const contactRouter = require('./routes/contact');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
let ejs = require('ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/projects', projectRouter);
app.use('/contact', contactRouter);
app.use('/services', servicesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;