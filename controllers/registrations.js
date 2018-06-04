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

module.exports = {
  // export functions
  new: newRoute,
  create: createRoute
};
