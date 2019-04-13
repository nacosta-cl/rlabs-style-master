module.exports = {
  provider: {
    // your provider name directly or from ENV var
    //service: 'SendGrid',
    // auth data always from ENV vars
    // 
    host: 'smtp.sendgrid.net',
    port: 465,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
    },
  },
  // defaults to be passed to nodemailer's emails
  defaults: {
    from: 'LR <laresistencia@caiuc.cl>',
  },
};
