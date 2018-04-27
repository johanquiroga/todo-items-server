const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const validate = require('mongoose-validator');

const firstNameValidator = [
  validate({
    validator: 'isAlpha',
    message: 'El nombre debería contener letras unicamente'
  })
];

const lastNameValidator = [
  validate({
    validator: 'isAlpha',
    message: 'El nombre debería contener letras unicamente'
  })
];

const User = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: firstNameValidator
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: lastNameValidator
  },
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
