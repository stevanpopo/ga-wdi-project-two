const User = require('../models/user');

function newRoute(req, res) {
  console.log('Show new session form (login form)');
  res.render('sessions/new');
}

function createRoute(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      console.log('Signing in', user);
      // if the user cannot be found, or did not supply a valid password
      if(!user || !user.validatePassword(req.body.password)) {
        console.log('User failed login requirements');
        return res.redirect('/login'); // send them back to the login page
      }
      req.session.userId = user._id; // store the user's ID in the session cookie (enabled by express-session)
      res.redirect('/'); // otherwise send them to the homepage
    })
    .catch(next);
}

function deleteRoute(req, res){
  console.log('Logging out');
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
