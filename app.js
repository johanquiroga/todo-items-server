const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errors = require('throw.js');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config');

const index = require('./routes/index');
const users = require('./routes/users');
const tasks = require('./routes/tasks');

const connect = mongoose.connect(config.mongoUrl);

connect.then(
  () => {
    console.log('Connected correctly to server: ' + config.mongoUrl);
  },
  (err) => {
    console.error(err);
	  process.exit(1);
  }
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);
app.use('/tasks', tasks);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new errors.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message || 'Something went wrong';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({success: false, err});
});

module.exports = app;
