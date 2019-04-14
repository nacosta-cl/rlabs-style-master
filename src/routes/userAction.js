const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.post('interpretQR','/readQR', async(ctx)=>{
    
})
router.get('userAction', '/', async(ctx) => {
    await ctx.render('index', {
        
    });
});

router.get('userCalledSeller', '/calledSeller', async(ctx) => {
    const setBuy = ctx.query.set;
    
    await ctx.render('userAction/calledSeller', {
        setBuy: setBuy
    });
});
router.get('userCalledList', '/listSKUs', async(ctx) => {
    //Retrieve list from DB or API
    const setBuy = ctx.query.set;
    const skuresults = undefined;
    await ctx.render('userAction/listSKUs', {
        setBuy: setBuy,
        SKUlist: skuresults,
    });
});
router.get('userQR', '/qr', async(ctx) => {
    await ctx.render('userAction/qrScanner', {
        setBuy: setBuy,
        actID: ctx.params.probID,
    });
});




module.exports = router;