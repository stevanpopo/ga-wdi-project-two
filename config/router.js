const router = require('express').Router();
const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const books = require('../controllers/books');


// Request listeners

// Routes for registration, login and users
router.route('/')
  .get(books.index)
  // .get(static.index);

router.route('/about')
  .get(static.about);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users')
  .get(registrations.index);

router.route('/users/:id')
  .get(registrations.show)
  .put(registrations.update)
  .delete(registrations.delete);

router.route('/users/:id/edit')
  .get(registrations.edit);

router.route('/users/:id/follow')
  .put(registrations.follow);

// Routes for books
router.route('/books')
  .post(books.create);

router.route('/books/new')
  .get(books.new);

router.route('/books/:id')
  .get(books.show)
  .put(books.update)
  .delete(books.delete);

router.route('/books/:id/edit')
  .get(books.edit);

router.route('/books/:id/comments')
  .post(books.commentCreate);

router.route('/books/:id/comments/:commentId')
  .delete(books.commentDelete);

router.route('/books/:id/likes')
  .put(books.increment);


module.exports = router;
