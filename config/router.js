const router = require('express').Router();
const registrations = require('../controllers/registrations');

// Request listeners
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));

router.route('registrations/new')
  .get(registrations.new);

module.exports = router;
