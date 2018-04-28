const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const router = express.Router();

const Task = require('../models/tasks');

router.use(bodyParser.json());

/* GET users listing. */
router.route('/')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;
  })
  .get(cors.cors, (req, res, next) => {
    res.send('Get all tasks');
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.send('Create new task');
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tasks');
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.send('Delete all tasks');
  });

router.param('taskId', (req, res, next, taskId) => {
  console.log('Check for task and load it to req object');
});

router.route('/:taskId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;
  })
  .get(cors.cors, (req, res, next) => {
    res.send('Get requested task');
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /tasks/' + req.params.taskId);
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.end('Update given task');
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.send('Delete task given');
  });

module.exports = router;
