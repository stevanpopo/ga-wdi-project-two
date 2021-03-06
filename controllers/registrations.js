const User = require('../models/user');
const Book = require('../models/book');

function newRoute(req, res){
  // render the new registrations form
  res.render('registrations/new');
}

function createRoute(req, res){
  User
    // create a new user with the contents of the request
    .create(req.body)
    .then((user)=>{
      console.log('User being created in DB', user);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
}

function indexRoute(req, res){
  console.log('Show all users');


  User
    .find()
    .exec()
    .then( users => {
      res.render('users/index', {users});
    });
}

function showRoute(req, res){
  console.log('Show one user profile');

  Promise.all([Book.find(), User.findById(req.params.id)])
    .then(values => {
      const user = values[1];
      const userId = values[1]._id.toString();
      const bookCommentPairs = [];
      values[0].forEach(book => {
        const filteredArr = book.comments.filter(comment => comment.comment_creator.toString() === userId);
        const bookComments = [];
        filteredArr.forEach(comment => bookComments.push(comment.content));
        const bookAndComments = [];
        bookAndComments.push([book.book_name, bookComments, book.id]);
        bookCommentPairs.push(bookAndComments);
      });
      res.render('users/show', {user, bookCommentPairs});
    });
}

function editRoute(req, res){
  console.log('Show the edit form');

  User
    .findById(req.params.id)
    .exec()
    .then( user =>{
      res.render('users/edit', {user});
    });
}

function updateRoute(req, res){
  console.log('Update user profile');

  User
    .findById(req.params.id)
    .update(req.body)
    .then( user =>{
      console.log(user);
      return res.redirect(`/users/${req.params.id}`);
    });
}

function deleteRoute(req, res){
  console.log('in the delete user route');
  User
    .findById(req.params.id)
    .exec()
    .then( user =>{
      user.remove();
      return res.redirect('/users');
    });
}

function followRoute(req, res){
  console.log('in the follow route');
  User
    .findById(req.params.id)
    .exec()
    .then( user =>{
      // res.locals.currentUser.followers.push(user.id);
      // console.log(res.locals.currentUser._id);
      if (!user.followers.includes(res.locals.currentUser._id.toString())){
        user.followers.push(res.locals.currentUser._id.toString());
      } else {
        // window.alert('You already follow this user');
        console.log('ALREADY FOLLOWING USER');
      }
      // console.log(res.locals.currentUser);
      return user.save();
    })
    .then(res.redirect(`/users/${req.params.id}`));
}

module.exports = {
  // export functions
  new: newRoute,
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  follow: followRoute
};
