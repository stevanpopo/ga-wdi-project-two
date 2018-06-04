const router = require('express').Router();

// Request listeners
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));

module.exports = router;
