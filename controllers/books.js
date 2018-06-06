const Book = require('../models/book.js');
// const User = require('../models/user.js');

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
    .populate('creator')
    .populate('comments.comment_creator')
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

function commentCreateRoute(req, res, next) {
  Book
    .findById(req.params.id)
    .exec()
    .then(book => {
      const commentData = req.body;
      commentData.comment_creator = res.locals.currentUser.id;
      book.comments.push(commentData);
      console.log('commentData', commentData);
      return book.save();
    })
    .then(book => res.redirect(`/books/${book._id}`)) // reload the cheese SHOW page
    .catch(next);
}

function commentDeleteRoute(req, res, next) {
  // find the relevant cheese
  Book
    .findById(req.params.id)
    .then(book => {
      // find the specific comment
      const comment = book.comments.id(req.params.commentId);
      // remove the comment from the parent record
      comment.remove();

      // save the parent record
      return book.save();
    })
    .then(book => res.redirect(`/cheeses/${book._id}`)) // reload the cheese SHOW page
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
};
