const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const errors = require('throw.js');

const cors = require('./cors');
const User = require('../models/users');
const authenticate = require('../auth/authenticate');
const authorization = require('../auth/authorization');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.all('*', cors.corsWithOptions, (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

router.get('/', authenticate.verifyUser, authorization.verifyAdmin, (req, res, next) => {
  User.find({})
    .populate('tasks', '-user')
    .then((users) => {
      res.statusCode = 200;
      res.json({success: true, users});
    }, err => next(err))
    .catch(err => next(err));
});

router.get('/:userId', authenticate.verifyUser, authorization.verifyUser, (req, res, next) => {
	User.findById(req.params.userId, '-admin')
		.populate('tasks', '-user')
		.then(user => {
			if (!user) {
				return next(new errors.NotFound('User ' + userId + ' not found'));
			}

			res.statusCode = 200;
			res.json({success: true, user});
		}, err => next(err))
		.catch(err => next(err));
});

router.post('/signup', (req, res, next) => {
  User.register(new User({email: req.body.email}), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      return res.json({success: false, err});
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
			    return res.json({success: false, err});
		    }

		    passport.authenticate('local')(req, res, () => {
			    res.statusCode = 200;
			    res.json({success: true, user, message: 'Registration Successful!'});
		    });
	    });
    }
  });
});

router.post('/login',
	passport.authenticate('local', {failWithError: true}),
	(req, res, next) => {
		const token = authenticate.getToken({_id: req.user._id});
		const {email, firstName, lastName, tasks, _id} = req.user;
		res.statusCode = 200;
    res.json({success: true, user: {email, firstName, lastName, tasks, _id}, token, message: 'You are successfully logged in'});
	},
	(err, req, res, next) => {
		err.message = 'Authentication error';
		return next(err);
	}
);

router.post('/logout', authenticate.verifyUser, (req, res, next) => {
  if (req.user) {
  	req.user = null;
  	req.statusCode = 200;
  	return res.json({success: true, user: {}, status: 'Successfully logged out'});
  } else {
	  return next(new errors.Forbidden('You are not logged in!'));
  }
});

module.exports = router;
