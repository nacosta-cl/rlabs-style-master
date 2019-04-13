const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('resourcesIndex','/', async (ctx) => {
    await ctx.render('resources/index', { });
});

module.exports = router;