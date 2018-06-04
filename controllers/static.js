const User = require('../models/user');

function indexRoute(req, res) {
  // User
  //   .find()
  //   .exec()
  //   .then((users) => res.render('index', { users }));
  res.render('pages/home');
  console.log('Home page showing');
}

function aboutRoute(req, res){
  res.render('pages/about');
  console.log('About page showing');
}

module.exports = {
  index: indexRoute,
  about: aboutRoute
};
