exports.processBody = (req, res, next) => {
	if (req.body.data) {
		req.body = {...req.body, ...req.body.data};
		delete req.body.data;
	}
	next();
};