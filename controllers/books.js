const Book = require('../models/book.js');
// const User = require('../models/user.js');

Book.likes = 0;
console.log('Book likes', Book.likes);

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
      books.forEach(book => {
        const commenters = [];
        book.comments.forEach(comment => {
          if (!commenters.includes(comment.comment_creator.toString())){
            commenters.push(comment.comment_creator.toString());
          }
        });
        book.commenters_count = commenters.length;
      });
      res.render('books/index', {books});
    });
}

function createRoute(req, res){
  console.log('Create a new book');
  const bookData = req.body;
  bookData['creator'] = res.locals.currentUser.id;
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
      // const $likeButton = $('like-button');
      // console.log($likeButton);
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
  console.log('delete comment route');
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
    .then(book => res.redirect(`/books/${book._id}`)) // reload the cheese SHOW page
    .catch(next);
}

function incrementLikes(req, res){
  console.log('incrementLikes called');
  Book
    .findById(req.params.id)
    .exec()
    .then(book => {
      book.likes ? book.likes ++ : book.likes = 1;
      console.log('book', book);
      console.log('book likes', book.likes);
      return book.save();
    })
    .then( book => res.redirect(`/books/${book._id}`));

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
  commentDelete: commentDeleteRoute,
  increment: incrementLikes
};
