const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const router = new KoaRouter();


router.post("/createSet", async (ctx,next)=>{
    const newSet = await ctx.orm.cset.build({
        components:"",
        creator: 0,
        prob: 0,
        active:true
    });
    await newSet.save();
    ctx.response.body = newSet.id;
})




router.post("/set", async (ctx, next)=>{
    const upd = JSON.parse(ctx.body);
    const sets = upd.setID;
    const selSet = await ctx.orm.cset.findByPk(sets);
    
    selSet.components = upd.components;
    selSet.active = true;
    return ctx.status = 200;
    
});
module.exports = router;
