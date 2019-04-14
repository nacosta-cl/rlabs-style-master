const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.post('interpretQR','/readQR', async(ctx)=>{
    
})


router.get('userCalledSeller', '/calledSeller', async(ctx) => {
    await ctx.render('userAction/calledSeller', {
        
    });
});
router.get('userCalledList', '/listSKUs', async(ctx) => {
    //Retrieve list from DB or API
    const list = ctx.params.listID;
    const skuresults = undefined;
    await ctx.render('userAction/listSKUs', {
        SKUlist: skuresults,
    });
});
router.get('userQR', '/qr', async(ctx) => {
    await ctx.render('userAction/qrScanner', {
        actID: ctx.params.probID,
    });
});




module.exports = router;