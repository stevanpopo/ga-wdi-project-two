const Book = require('../models/book.js');

function newRoute(req, res){
  console.log('Show new books form');
  // if(!res.locals.isLoggedIn) return res.redirect('/'); //shutdown the new url
  // res.render('books/new');
}

function indexRoute(result, req){
  console.log('Show all books');
  req.render('books/index');
}

module.exports = {
  new: newRoute,
  index: indexRoute
};
