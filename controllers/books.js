const Book = require('../models/book.js');

function newRoute(req, res){
  console.log('Show new books form');
  if(!res.locals.isLoggedIn) return res.redirect('/'); //if not logged in, send to home page
  res.render('books/new'); // otherwise render new form
}

function indexRoute(req, res){
  console.log('Show all books');

  Book
    .find()
    .populate('creator') // rather than just being an ID, populate becomes the whole linked object
    .exec()
    .then( books =>{
      res.render('books/index', {books});
    });
}

function createRoute(req, res){
  console.log('Create a new book');
  console.log(req.body);
  const bookData = req.body;
  bookData['creator'] = res.locals.user.id;
  // console.log(bookData);
  Book
    .create(req.body)
    .then(book =>{
      return res.redirect(`/books/${book.id}`);
    });
}

function showRoute(req, res){
  console.log('Show individual book page');

  Book
    .findById(req.params.id)
    .exec()
    .then( book =>{
      res.render('books/show', {book});
    });
}

function editRoute(req, res){
  console.log('in the edit route');
  Book
    .findById(req.params.id)
    .exec()
    .then( book =>{
      res.render('books/edit', {book});
    });
}

function updateRoute(req, res){
  console.log('in the update route');
  Book
    .findById(req.params.id)
    .update(req.body)
    .then( book =>{
      console.log(book);
      return res.redirect(`/books/${req.params.id}`);
    });
}

function deleteRoute(req, res){
  console.log('in the delete route');
  Book
    .findById(req.params.id)
    .exec()
    .then( book =>{
      book.remove();
      return res.redirect('/books');
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
