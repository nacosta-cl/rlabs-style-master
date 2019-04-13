const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('contact', '/', async(ctx) => {
    await ctx.render('/contact/index', {
        sendContactPath: ctx.router.url('contact-send')
    });
});

router.post('contact-send', '/', async(ctx) => {
    const contact = ctx.request.body;
    console.log(ctx.request.body);
    sendContactEventEmail(ctx, contact);
    await ctx.render('/contact/success');
});
module.exports = router;