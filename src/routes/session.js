const KoaRouter = require('koa-router');

const router = new KoaRouter();
router.get('session-new', '/new', async ctx => ctx.render('session/new', {
  createSessionPath: ctx.router.url('session-create'),
  notice: ctx.flashMessage.notice,
}));

router.put('session-create', '/', async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = await ctx.orm.User.findOne({ where: { username } });
  if (user == null) {
    return ctx.render('session/new', {
      username,
      createSessionPath: ctx.router.url('session-create-path'),
      error: 'Username inexistente',
    });
  }
  const isPasswordCorrect = await user.checkPassword(password);
  if (isPasswordCorrect) {
    ctx.session.userId = user.id;
    return ctx.redirect(ctx.router.url('restaurant-my-list'));
  }
  return ctx.render('session/new', {
    username,
    createSessionPath: ctx.router.url('session-create-path'),
    error: 'Username o contraseña incorrectos',
  });
});

router.delete('session-destroy', '/', (ctx) => {
  ctx.session = null;
  ctx.redirect(ctx.router.url('session-new'));
});

module.exports = router;
