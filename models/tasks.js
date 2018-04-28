const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Task = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  priority: {
    type: String,
    required: true
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

module.exports = mongoose.model('Task', Task);
