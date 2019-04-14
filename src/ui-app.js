const env = require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaFlashMessage = require('koa-flash-message').default;
const koaStatic = require('koa-static');
const koaStaticCache = require('koa-static-cache');
const render = require('koa-ejs');
const session = require('koa-session');
const override = require('koa-override-method');
const mailer = require('./mailers');
const koaWebpack = require('koa-webpack');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const routes = require('./routes');
const orm = require('./models');

// App constructor
const app = new Koa();

const developmentMode = app.env === 'development';
const testMode = app.env === 'test';
const productionMode = app.env === 'production';
var staticOptions = {};

if(testMode || productionMode){
  console.log("nodevmode");
  console.log("Sec enabled")
  //Helmet stuff -> Some security initiatives
  app.use(helmet.frameguard('sameorigin'));
  app.use(helmet.hidePoweredBy());
  app.use(helmet.noSniff());
  app.use(
    helmet.hsts({
      force: true,
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    })
  );
  app.use(helmet.ieNoOpen());
  app.use(helmet.xssFilter());
  staticOptions = {
    br: true,
    gzip: true,
    maxAge: 3000,
  }
} else if (developmentMode){
  console.log("devmode");
  staticOptions = {
    br: true,
    gzip: true,
    maxAge: 5,
  }
  
  const options = {};
  let middleware;
  const starterWebpack = async function () {
    middleware = await koaWebpack(options);
    app.use(middleware);
  };
  starterWebpack();
} else {
  process.exit(1);
}

app.keys = [
  process.env.secret1,
  process.env.secret2,
  process.env.secret3,
  process.env.secret4,
];

/*
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];
*/
// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  ctx.acceptsEncodings('gzip', 'deflate', 'br');
  return next();
});
app.use(compress({
  threshold: 256,
  flush: require('zlib').Z_SYNC_FLUSH,
}));
// log requests
app.use(koaLogger());

app.use(koaStaticCache(path.join(__dirname, '..', 'build'), {
  gzip: true,
  maxAge: 5,
}));

app.use(koaStatic(path.join(__dirname, '..', 'public'), {
  gzip: true,
  maxAge: 5 ,
  
}));
// expose a session hash to store information across requests from same client
app.use(session({
  maxAge: 1 * 60 * 60 * 1000, // 1 hour
}, app));

// flash messages support
app.use(koaFlashMessage);

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
  formidable: {
    maxFields: 10,
    maxFieldsSize: 30 * 1024 * 1024,
    maxFileSize: 100 * 1024 * 1024,
    uploadDir: path.join(__dirname, '..', 'public', 'uploads'),
    keepExtensions: true,
    multiples: true,
  },
}));

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body.fields || ctx.request.body);
  return next();
});

// Configure EJS views
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html.ejs',
  cache: !developmentMode,
});

mailer(app);

// Routing middleware


app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    } else if (ctx.status === 401) {
      ctx.throw(401);
    } else if (ctx.status === 403) {
      ctx.throw(403);
    } else if (ctx.status === 500) {
      ctx.throw(500);
    }
  } catch (error) {
    console.log(error.status);
    ctx.status = error.status || 500;
    ctx.app.emit('error', error, ctx);
    if (ctx.status === 404) {
      if (ctx.request.url === '/index.html') { // Compat header
        await ctx.redirect('/');
      } else if (ctx.request.url.match(/.*\..*/i) === null) {
        await ctx.redirect('https://http.cat/404');
      }
    } else if (ctx.status === 401) {
      await ctx.redirect('https://http.cat/401');
    } else if (ctx.status === 403) {
      await ctx.redirect('https://http.cat/403');
    } else if (ctx.status === undefined) {
      await ctx.redirect('https://http.cat/500');
    }
    // throw error;
  }
});

app.use(routes.routes());

module.exports = app;
