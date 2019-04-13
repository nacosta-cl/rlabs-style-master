

module.exports = function sendEmail(ctx, data) {
  // you can get all the additional data needed by using the provided one plus ctx
  console.log('new mail');
  return ctx.sendMail('contact-event', { subject: 'test', to: 'test.test@test.test' }, { contact: data });
};
