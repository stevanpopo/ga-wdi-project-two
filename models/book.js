const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const bookSchema = new mongoose.Schema({
  book_name: {type: String, required: true},
  book_author: {type: String, required: true},
  blurb: {type: String, minlength: 100},
  cover_image: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
