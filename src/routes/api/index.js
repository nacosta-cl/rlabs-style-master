const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const router = new KoaRouter();
const util = require('util');

const request = require('request');
router.post("/createSet", async (ctx,next)=>{
    const newSet = await ctx.orm.cset.build({
        components:"",
        creator: 0,
        prob: 0,
        active:true
    });
    const a = await ctx.orm.prob.findByPk(1);
    await newSet.save();
    ctx.response.body = {
        "newSet" : newSet.id,
        "activeSKU" : a.activeMainSKU
    }
});

const getSuggestions = function(primer){
    const sugSKUs = [
        primer,
        '2000370834463', //pant
        '2000370967086', //pant
        '2000370703226', //pant
        '2000370633653', //pol
        '2000342778962',
        '2000373135819',
        '2000370652074', //zap
        '2000369079882',
        '2000369618852'
    ];
    return sugSKUs;
}


router.post("/smartSet", async (ctx, next)=>{
    console.log(ctx.request.body);
    const upd = JSON.parse(ctx.request.body);
    const primer = upd.startSKU;
    console.log(primer);
    
    const listsSuggestions = getSuggestions(primer); //3 por categoria, dando lugar a 12 prendas

    let skus = ""
    listsSuggestions.forEach((elem)=>{
        skus+=elem+","
    })
    skus = skus.substring(0,skus.length-1)
    console.log(skus)
    const requestPromise = util.promisify(request);
    const response = await requestPromise("https://simple.ripley.cl/api/v2/products?partNumbers="+skus);
    const rs = JSON.parse(response.body)
    console.log(rs.length);

    var res = {};

    res.one = [rs[0]]; //locked by design
    res.two = rs.slice(1,3);
    res.three = rs.slice(4,6);
    res.four = rs.slice(7,9);

    const selSet = await ctx.orm.cset.findByPk(upd.set);
    const sel1 = res.one;
    const sel2 = res.two[Math.floor(Math.random()*res.two.length)];
    const sel3 = res.three[Math.floor(Math.random()*res.three.length)];
    const sel4 = res.four[Math.floor(Math.random()*res.four.length)];
    
    selSet.components = res.one[0].partNumber +','+ sel2.partNumber+','+ sel3.partNumber +','+ sel4.partNumber;
    selSet.active = true;
    await selSet.save();
    ctx.response.body = {
        "sel1" : sel1[0],
        "sel2" : sel2,
        "sel3" : sel3,
        "sel4" : sel4,
    };
});

router.post("/set", async (ctx, next)=>{
    const upd = JSON.parse(ctx.request.body);
    const sets = upd.setID;
    const selSet = await ctx.orm.cset.findByPk(sets);
    
    selSet.components = upd.components;
    selSet.active = true;
    await selSet.save();
    return ctx.status = 200;
      
});

router.get("/getst", async (ctx, next)=>{
    const sets = ctx.query.setID;
    const selSet = await ctx.orm.cset.findByPk(sets);
    if(ctx.query.retrieveSet == 1){
        console.log(selSet.components)
        const skus = selSet.components;
        const requestPromise = util.promisify(request);
        const response = await requestPromise("https://simple.ripley.cl/api/v2/products?partNumbers="+skus);
        ctx.response.body.componentData = JSON.parse(response.body)
    }
    ctx.response.body = {selSet};
    return ctx.status = 200;
});
module.exports = router;
