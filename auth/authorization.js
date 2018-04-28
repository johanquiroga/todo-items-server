exports.verifyAdmin = (req, res, next) => {
	if (!req.user.admin) {
		const err = new Error('You are not authorized to perform this operation!');
		err.status = 403;
		return next(err);
	}

	next();
};