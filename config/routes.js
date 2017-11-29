const router = require('express').Router();
const lists  = require('../controllers/lists');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/lists')
  .get(secureRoute, lists.index)
  .post(secureRoute, lists.create);

router.route('/lists/:id')
  .get(secureRoute, lists.show)
  .put(secureRoute, lists.update)
  .delete(secureRoute, lists.delete);

router.route('/lists/:id/items/')
  .post(secureRoute, lists.itemsCreate);

router.route('/lists/:id/items/:itemId')
  .delete(secureRoute, lists.itemsDelete)
  .put(secureRoute, lists.itemsUpdate);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
