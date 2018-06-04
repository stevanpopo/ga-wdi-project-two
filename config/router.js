const router = require('express').Router();
const static = require('../controllers/static');
const registrations = require('../controllers/registrations');

// Request listeners
// router.get('/', (req, res) => res.render('pages/home'));
//router.get('/about', (req, res) => res.render('pages/about'));

router.route('/')
  .get(static.index);

router.route('/about')
  .get(static.about);

router.route('/register')
  .get(registrations.new);

module.exports = router;
