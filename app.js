require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

// Load database and Mongoose models
require('./app_server/models/db');

// Configure Passport authentication
require('./app_api/config/passport');

var hbs = require('hbs');
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

var partialsReady = new Promise(function(resolve) {
  hbs.registerPartials(
    path.join(__dirname, 'app_server', 'views', 'partials'),
    resolve
  );
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static public files
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Initialize Passport authentication
app.use(passport.initialize());

// Registration reads files asynchronously; even the first request must wait.
app.use(function(req, res, next) {
  partialsReady
    .then(function() {
      next();
    })
    .catch(next);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// Catch unauthorized authentication errors
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res
      .status(401)
      .json({
        message: err.name + ': ' + err.message
      });
  }

  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.render('error', {
    title: 'Error - Travlr Getaways',
    layout: 'layouts/layout'
  });
});

module.exports = app;