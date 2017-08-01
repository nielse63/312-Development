
require('dotenv').config();
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const msg = {
  'first-name': 'Erik',
  'last-name': 'Nielsen',
  'email-address': 'someone@something.com',
  message: 'This is a test',
};

module.exports = function sendEmail(message = msg) {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_API_DOMAIN,
    },
  };

  const html = Object.keys(message).map((key) => {
    const value = message[key];
    return `<strong>${key.replace(/-/, ' ')}</strong>: ${value}`;
  }).join('<br />');

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: process.env.GMAIL_FROM_EMAIL,
    to: process.env.GMAIL_TO_EMAIL,
    subject: 'New form submission',
    html,
  }, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log('Response');
      console.log(info);
    }
  });
};
