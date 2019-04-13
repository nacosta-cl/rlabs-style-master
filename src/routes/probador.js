const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();
/*
Ruta para mostrar la pantalla inicial del probador, donde se escanea un producto
*/
router.get('probadorGUIstart', '/:probID/start', async(ctx) => {
    await ctx.render('index', {});
});
/*
Ruta para mostrar las prendas del probador en la interfaz superior de seleccion, donde se muestren las recomendaciones
*/
router.get('probadorGUIaux', '/:probID/chooser', async(ctx) => {
    await ctx.render('index', {});
});

/*
*/

router.get('probadorGUIretrieve', '/:probID/retrieve', async(ctx) => {
    await ctx.render('index', {});
});

/*
Ruta para seleccionar el ambiente de prueba, y si el usuario quiere continuar
*/
router.get('probadorGUIchoose', '/:probID', async(ctx) => {
    await ctx.render('index', {});
});

module.exports = router;