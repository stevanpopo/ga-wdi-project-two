const router = require('express').Router();
const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const books = require('../controllers/books');


// Request listeners

// Routes for registration, login and users
router.route('/')
  .get(static.index);

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

// Routes for books
router.route('/books')
  .get(books.index)
  .post(books.create);

router.route('/books/new')
  .get(books.new);

router.route('/books/:id')
  .get(books.show)
  .put(books.update)
  .delete(books.delete);

router.route('/books/:id/edit')
  .get(books.edit);

module.exports = router;
