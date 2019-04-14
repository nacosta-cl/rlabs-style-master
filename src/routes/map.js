const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('mapSelector', '/', async(ctx) => {
    const succs = await ctx.orm.sucursal.findAll();
    console.log(succs)
    await ctx.render('map/index', {
        succs
    });
});

router.get('mainShower', '/mapGet', async(ctx) => {
    const succs = await ctx.orm.sucursal.findByPk(ctx.query.id);

    const res = await ctx.orm.prob.findAll();
    await ctx.render('map/map', {
        succs,
        res
    });
});

module.exports = router;