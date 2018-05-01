const express = require('express');
const bodyParser = require('body-parser');
const errors = require('throw.js');

const cors = require('./cors');
const Task = require('../models/tasks');
const authenticate = require('../auth/authenticate');
const authorization = require('../auth/authorization');

const router = express.Router();

router.use(bodyParser.json());

/* GET tasks listing. */
router.route('/')
	.all(cors.corsWithOptions, authenticate.verifyUser, authorization.verifyNotAdmin, (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		next();
	})
	.options((req, res) => {
		res.sendStatus = 200;
	})
  .get((req, res, next) => {
    Task.find({user: req.user._id})
      .populate('user', 'email firstName lastName')
      .then(tasks => {
      	res.statusCode = 200;
      	res.json({success: true, tasks});
      }, err => next(err))
	    .catch(err => next(err));
  })
  .post((req, res, next) => {
  	const { name, priority, dueDate } = req.body;
  	const user = req.user._id;
  	Task.create({name, priority, dueDate, user})
		  .then(task => {
		    res.statusCode = 200;
		    res.json({success: true, task});
	    }, err => next(err))
		  .catch(err => next(err));
  })
  .put((req, res, next) => {
  	return next(new errors.MethodNotAllowed('PUT operation not supported on /tasks'));
  })
  .delete((req, res, next) => {
    Task.remove({user: req.user._id})
	    .then(resp => {
	    	res.statusCode = 200;
	    	res.json({success: true, message: `${resp.n} task(s) were deleted`});
      }, err => next(err))
	    .catch(err => next(err));
  });

router.param('taskId', (req, res, next, taskId) => {
  Task.findById(taskId)
    .populate('user', 'email firstName lastName')
	  .then(task => {
	  	if(!task) {
	  		return next(new errors.NotFound('Task ' + taskId + ' not found'));
		  }

		  req.task = task;
	  	return next();
    }, err => next(err))
	  .catch(err => next(err));
});

router.route('/:taskId')
	.all(cors.corsWithOptions, authenticate.verifyUser, authorization.verifyNotAdmin, authorization.verifyTask, (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		next();
	})
	.options((req, res) => {
		res.sendStatus = 200;
	})
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({success: true, task: req.task});
  })
  .post((req, res, next) => {
		return next(new errors.MethodNotAllowed('POST operation not supported on /tasks/' + req.params.taskId));
  })
  .put((req, res, next) => {
  	const {
      name = req.task.name,
      priority = req.task.priority,
      dueDate = req.task.dueDate,
		  completed = req.task.completed
  	} = req.body;
    Task.findByIdAndUpdate(req.task._id, {$set: {name, priority, dueDate, completed}}, {new: true})
	    .then(task => {
	    	res.statusCode = 200;
	    	res.json({success: true, task});
      }, err => next(err))
	    .catch(err => next(err));
  })
  .delete((req, res, next) => {
    req.task.remove()
	    .then(task => {
	    	res.statusCode = 200;
	    	res.json({success: true, task})
      }, err => next(err))
	    .catch(err => next(err));
  });

module.exports = router;
