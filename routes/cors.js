const express = require('express');
const cors = require('cors');
const config = require('../config');

const app = express();

let whitelist = config.whitelist.split(',');
if (whitelist !== [] && whitelist[0] !== '') {
	whitelist = config.whitelist.split(',');
} else {
	whitelist = ['http://localhost:3000'];
}

const corsOptionsDelegate = (req, callback) => {
	let corsOptions;

	if (whitelist.includes(req.header('Origin'))) {
		corsOptions = {origin: true};
	} else {
		corsOptions = {origin: false};
	}
	callback(null, corsOptions);
};

exports.cors = cors;
exports.corsWithOptions = cors(corsOptionsDelegate);
