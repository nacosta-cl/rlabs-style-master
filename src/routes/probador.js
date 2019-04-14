const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const util = require('util');

const router = new KoaRouter();
const request = require('request');

/*
Ruta para mostrar las prendas del probador en la interfaz superior de seleccion, donde se muestren las recomendaciones
*/
router.get('probadorGUIchooser', '/:probID/chooser', async(ctx) => {
    await ctx.render('probador/chooser/chooser', {
        layout: "probador/chooser/layout",
        actID: ctx.params.probID,
    });
});
/*
Ruta para mantener una imagen estatica de saludo
*/
router.get('probadorGUIchooser', '/:probID/static-chooser', async(ctx) => {
    await ctx.render('probador/chooser/staticChooser', {
        layout: "probador/chooser/layout",
        actID: ctx.params.probID,
    }); 
});
/*
Ruta para que el usuario se lleve el listado de prendas que escogio, y pedirlas quiza por ripley.cl
*/
router.get('probadorGUIretrieve', '/:probID/retrieveQR', async(ctx) => {
    const actualSet = 0;
    const qrSeller = ctx.request.protocol + '://' + ctx.request.get('host') + '/userAction/calledSeller?set='+actualSet;
    const qrList = ctx.request.protocol + '://' + ctx.request.get('host') + '/userAction/listSKUs?set='+actualSet;

    await ctx.render('probador/chooser/retrieveQR', {
        actualSet,
        qrSeller,
        qrList,
        layout: "probador/chooser/layout",
        actID: ctx.params.probID,
    });
});
/*
Ruta para mostrar una pantalla de cierre del selector
*/
router.get('probadorGUIuse', '/:probID/end', async(ctx) => {
    await ctx.render('probador/end', {
        actID: ctx.params.probID,
    });
});
/*
Ruta para seleccionar el ambiente de prueba, y si el usuario quiere continuar
*/
router.get('probadorGUIuse', '/:probID/use', async(ctx) => {
    //how to do a request on async
    const requestPromise = util.promisify(request);
    const response = await requestPromise("https://simple.ripley.cl/api/v2/products/"+ctx.query.sku);

    console.log('response', response.body);

    await ctx.render('probador/use', {
        prod: JSON.parse(response.body),
        actSKU: ctx.query.sku,
        actID: ctx.params.probID,
    });
});
/*
Ruta para mostrar la pantalla inicial del probador, donde se escanea un producto
*/
router.get('probadorGUIstart', '/:probID', async(ctx) => {
    await ctx.render('probador/index', {
        actID: ctx.params.probID,
    });
});

module.exports = router;