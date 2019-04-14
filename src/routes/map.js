const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('mainIndex', '/', async(ctx) => {
    await ctx.render('map/index', {});
});

router.get('mainIndex', '/get', async(ctx) => {
    await ctx.render('map/map', {});
});

module.exports = router;