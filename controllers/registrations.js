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
      // console.log(userId);
      const userComments = [];
      values[0].forEach(book => {
        // userComments.concat(book.comments.filter(comment => comment.comment_creator.toString() === userId));
        // THIS WORKS - const filteredArr = book.comments.filter(comment => comment.comment_creator.toString() === userId);
        // console.log('filtered array', filteredArr);
        console.log(book.book_name); // this prinst book name
        book.comments.forEach( comment => console.log(comment.content)); // this prints comment
        //console.log(book.comments);
        // THIS WORKS - Array.prototype.push.apply(userComments, filteredArr);
        // console.log('filtered array', filteredArr);
        // console.log('userComments array', userComments);
        // book.comments.forEach(comment => console.log(comment));
      });
      // console.log('filtered array', filteredArr);
      // console.log('userComments array', userComments);
      res.render('users/show', {user, userComments});
      // console.log(userComments);
      // res.render('users/show', {values});
    });
  // User
  //   .findById(req.params.id)
  //   .populate('all_comments')
  //   .exec()
  //   .then( user => {
  //     console.log(user);
  //     console.log(user.all_comments);
  //     res.render('users/show', {user});
  //   });
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

module.exports = {
  // export functions
  new: newRoute,
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
