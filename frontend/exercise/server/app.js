const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const expensesRouter = require('./routes/expenses');
const categoriesRouter = require('./routes/categories');
const db = require('./db')

const app = express();

const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/', indexRouter);
app.use('/expenses', expensesRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send();
});

app.listen(port, function() {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
