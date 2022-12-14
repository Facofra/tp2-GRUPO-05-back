var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
require('dotenv').config()



var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var catalogRouter = require('./routes/catalog');
var bookRouter = require('./routes/book');
var prestamoRouter = require('./routes/prestamo');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());




// RUTAS
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/catalog', catalogRouter);
app.use('/book', bookRouter);
app.use('/prestamo', prestamoRouter);













// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
