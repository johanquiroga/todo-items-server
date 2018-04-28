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

const emailValidator = [
	validate({
		validator: 'isEmail',
		message: 'Por favor ingres un e-mail válido'
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
		lowercase: true,
		validate: emailValidator
	},
	admin: {
		type: Boolean,
		default: false
	},
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose, {
	usernameField: 'email',
	usernameLowerCase: true
});

module.exports = mongoose.model('User', User);
