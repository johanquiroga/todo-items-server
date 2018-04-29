const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Task = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  priority: {
    type: Number,
    min: 0,
    max: 2,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

Task.plugin(mongoosePaginate);
Task.plugin(sanitizerPlugin, {
  mode: 'sanitize',
  exclude: ['user', 'completed'],
});

module.exports = mongoose.model('Task', Task);
