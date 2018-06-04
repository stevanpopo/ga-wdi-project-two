const router = require('express').Router();
const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

// Request listeners
// router.get('/', (req, res) => res.render('pages/home'));
//router.get('/about', (req, res) => res.render('pages/about'));

router.route('/')
  .get(static.index);

router.route('/about')
  .get(static.about);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
