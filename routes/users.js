const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('./cors');
const User = require('../models/users');
const authenticate = require('../auth/authenticate');
const authorization = require('../auth/authorization');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authorization.verifyAdmin, (req, res, next) => {
  User.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, err => next(err))
  .catch(err => next(err));
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  User.register(new User({email: req.body.email}), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.json({err});
    } else {
	    const {firstName, lastName} = req.body;
	    if (firstName) {
		    user.firstName = firstName;
	    }
	    if (lastName) {
		    user.lastName = lastName;
	    }

	    user.save((err, user) => {
		    if (err) {
			    res.statusCode = 500;
			    res.setHeader('Content-Type', 'application/json');
			    return res.json({err});
		    }

		    passport.authenticate('local')(req, res, () => {
			    res.statusCode = 200;
			    res.setHeader('Content-Type', 'application/json');
			    res.json({success: true, status: 'Registration Successful!'});
		    });
	    });
    }
  });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
	const token = authenticate.getToken({_id: req.user._id});

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token, status: 'You are successfully logged in'});
});

router.post('/logout', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
  if (req.user) {
  	req.user = null;
  	req.statusCode = 200;
  	return res.json({success: true, token: null, status: 'Successfully logged out'});
  } else {
	  const err = new Error('You are not logged in!');
	  err.status = 403;
	  return next(err);
  }
});

module.exports = router;
