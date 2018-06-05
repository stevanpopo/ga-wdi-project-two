const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  image: {type: String, required: true},
  email: {type: String, required: true},
  password: { type: String, required: true }
}, {
  timestamps: true
});

// setup virtual storage for books creation
userSchema.virtual('books', {
  ref: 'Book',
  foreignField: 'creator',
  localField: '_id'
});

// setup virtual schema for password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // temp store the password on the user model so we can check it
    this._passwordConfirmation = passwordConfirmation;
  });

// AUTHENTICATION
// lifecycle hooks on authentication
// set up a pre-validate hook
userSchema.pre('validate', function checkPassword(next) {
  // check if password DOES NOT equal password
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue validation
  next();
});

userSchema.pre('save', function hashPassword(next) {
  // check if the password has been modified
  if(this.isModified('password')) {
    // if true, hash the password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // continue to save password
  next();
});

// SESSIONS
// compare user inputted password against hashed and stored password
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
