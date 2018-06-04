const User = require('../models/user.js');

function newRoute(req, res){
  console.log('here?');
  res.render('registrations/new');
  console.log('new reg pending');
}

module.exports = {
  // export functions
  new: newRoute
};
