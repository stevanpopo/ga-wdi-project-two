const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_name: {type: String, required: true},
  book_author: {type: String, required: true},
  blurb: {type: String, minlength: 100},
  cover_image: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
