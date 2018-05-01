const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const validate = require('mongoose-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const firstNameValidator = [
  validate({
    validator: 'isAlpha',
    message: 'First name must not contain numbers or spaces'
  })
];

const lastNameValidator = [
  validate({
    validator: 'isAlpha',
    message: 'Last name must not contain numbers or spaces'
  })
];

const emailValidator = [
	validate({
		validator: 'isEmail',
		message: 'Please enter a valid E-mail'
	})
];

const User = new Schema({
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    validate: firstNameValidator
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    validate: lastNameValidator
  },
	email:  {
		type: String,
		required: true,
		validate: emailValidator
	},
	admin: {
		type: Boolean,
		default: false
	}
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose, {
	usernameField: 'email',
	usernameLowerCase: true
});
User.plugin(sanitizerPlugin, {
	mode: 'sanitize',
	exclude: ['tasks', 'admin'],
});

module.exports = mongoose.model('User', User);
