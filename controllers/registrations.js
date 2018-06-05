const User = require('../models/user.js');

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

  User
    .findById(req.params.id)
    .exec()
    .then( user => {
      res.render('users/show', {user});
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
