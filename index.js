// Required packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/router');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

//Called packages
const app = express();

// Used packages & Other bits
const { port, dbURI } = require('./config/environment');
// const PORT = process.env.PORT || 3000; no longer needed because of above line
const User = require('./models/user');
// const Book = require('./models/book');

mongoose.connect(dbURI);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

// tell express app to use express-session (enables cookies)
app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

// Check for cookie on page load (for Sessions)
app.use((req, res, next) => {
  // if there is no user ID, then there is nothing to do, move on
  if(!req.session.userId) return next();
  console.log('Middleware for sessions creation');

  // otherwise find user in db
  User
    .findById(req.session.userId)
    .populate({path: 'books', populate: 'books'})
    .exec()
    .then(user => {
      // if the user hasn't been found, log them out and redirect to login
      if(!user) req.session.regenerate(() => res.redirect('/login'));

      // add some helpers to res.locals, for use elsewhere
      res.locals.isLoggedIn = true; // create isLoggedIn to enact only when user is logged in
      res.locals.user = user; //  create user var

      // store the user data on `req` to be used inside the controllers
      //req.currentUser = user;

      next();
    });
});

app.use(express.static(`${__dirname}/public`));

//Last line always
app.use(router);
app.listen(port, () => console.log(`App is running on ${port}`));
