const KoaRouter = require('koa-router');

const index = require('./routes/index');
const resources = require('./routes/resources');
const contact = require('./routes/contact');
const users = require('./routes/users');
const session = require('./routes/session');
const map = require('./routes/map');
const router = new KoaRouter();

router.use('/', index.routes());
router.use('/resources', resources.routes());
router.use('/map', map.routes());
router.use('/probador', probador.routes());
router.use('/contact', contact.routes());
router.use('/users', users.routes());
router.use('/session', session.routes());

module.exports = router;