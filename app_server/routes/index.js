const router = require('express').Router();
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.index);

// Keep clean URLs from the previous revision working with the static pages.
for (const page of ['rooms', 'meals', 'news', 'about', 'contact']) {
  router.get('/' + page, (req, res) => res.redirect(302, '/' + page + '.html'));
}
router.get('/dives.html', (req, res) => res.redirect(301, '/travel'));
router.get('/foods.html', (req, res) => res.redirect(301, '/meals.html'));

module.exports = router;
