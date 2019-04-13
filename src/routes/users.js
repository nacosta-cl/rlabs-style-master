const KoaRouter = require('koa-router');
// const sendWelcomeEmail = require('../mailers/welcome');

const router = new KoaRouter();

router.get('user-new', '/new', async ctx => ctx.render('user/new', {
  user: ctx.orm.User.build(),
  createUserPath: ctx.router.url('user-create'),
}));

router.post('user-create', '/', async (ctx) => {
  ctx.request.body.authLevel = 0;
  ctx.request.body.is_valid = 'false';
  const user = ctx.orm.User.build(ctx.request.body);
  try {
    await user.save();
    ctx.flashMessage.notice = '¡Tu cuenta de usuario esta lista para comenzar a usarla!';
    await ctx.redirect(ctx.router.url('session-new'));
  } catch (validationError) {
    await ctx.render('user/new', {
      user,
      errors: validationError.errors,
      createUserPath: ctx.router.url('user-create'),
    });
  }
});

router.get('user-view', '/show', async (ctx) => {
  const user = await ctx.orm.User.findById(ctx.session.userId);
  if (user === null) {
    // no user
  } else {
    await ctx.render('user/show');
  }
});

router.put('user-edit', '/edit', async (ctx) => {
  const a = 0;
});

router.get('user', '/:id', async (ctx) => {
  const a = 0;
});

module.exports = router;
