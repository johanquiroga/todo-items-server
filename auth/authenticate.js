const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/users');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
	return jwt.sign(user, config.secretKey, {expiresIn: 36000});
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use(new JwtStrategy(opts,
	(jwt_payload, done) => {
		User.findOne({_id: jwt_payload._id}, (err, user) => {
			if (err) {
				return done(err, false);
			} else if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);

exports.verifyUser = passport.authenticate('jwt', {session: false, failWithError: true});