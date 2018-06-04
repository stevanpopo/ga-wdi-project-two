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

module.exports = {
  // export functions
  new: newRoute,
  create: createRoute,
  index: indexRoute
};
