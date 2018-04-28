const errors = require('throw.js');

const isAdmin = (User) =>
	User.admin;

const isUserOwner = (Resource, User) =>
	User.equals(Resource.user || Resource);

exports.verifyAdmin = (req, res, next) =>
	isAdmin(req.user)
		? next()
		: next(new errors.Forbidden('Only administrators are allowed to perform this operation'));

exports.verifyNotAdmin = (req, res, next) =>
	!isAdmin(req.user)
		? next()
		: next(new errors.Forbidden('Administrators are not allowed to perform this operation'));

exports.verifyUser = (req, res, next) =>
	isAdmin(req.user) || isUserOwner(req.params.userId, req.user)
		? next()
		: next(new errors.Forbidden('You are not authorized to perform this operation'));

exports.verifyTask = (req, res, next) =>
	isUserOwner(req.task, req.user)
		? next()
		: next(new errors.Forbidden('You are not authorized to perform this operation'));