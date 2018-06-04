const User = require('../models/user.js');

function newRoute(req, res){
  res.render('registrations/new');
  console.log('new reg pending');
}

module.exports = {
  // export functions
  new: newRoute
};
