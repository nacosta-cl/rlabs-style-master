const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const util = require('util');

const router = new KoaRouter();

/*
Ruta para mostrar las prendas del probador en la interfaz superior de seleccion, donde se muestren las recomendaciones
*/
router.get('probadorGUIchooser', '/:probID/chooser', async(ctx) => {
    await ctx.render('probador/chooser/chooser', {
        actID: ctx.params.probID,
    });
});

/*
Ruta para mantener una imagen estatica de saludo
*/
router.get('probadorGUIchooser', '/:probID/static-chooser', async(ctx) => {
    await ctx.render('probador/chooser/staticChooser', {
        actID: ctx.params.probID,
    });
});

/*
Ruta para que el usuario se lleve el listado de prendas que escogio, y pedirlas quiza por ripley.cl
*/

router.get('probadorGUIretrieve', '/:probID/retrieveQR', async(ctx) => {
    await ctx.render('probador/chooser/retrieveQR', {
        actID: ctx.params.probID,
    });
});
/*
Ruta para mostrar una pantalla de cierre del selector
*/
router.get('probadorGUIuse', '/:probID/end', async(ctx) => {
    await ctx.render('probador/use', {
        actID: ctx.params.probID,
    });
});
/*
Ruta para seleccionar el ambiente de prueba, y si el usuario quiere continuar
*/
const request = require('request');

router.get('probadorGUIuse', '/:probID/use', async(ctx) => {
    //how to do a request on async

    const requestPromise = util.promisify(request);
    const response = await requestPromise("https://simple.ripley.cl/api/v2/products/"+ctx.query.sku+"P");

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