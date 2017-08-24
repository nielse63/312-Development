
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { loadENV } from './helpers';

loadENV();

const msg = {
  'first-name': 'Erik',
  'last-name': 'Nielsen',
  'email-address': 'someone@something.com',
  message: 'This is a test',
};

export default function sendEmail(message = msg) {
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
  }, (err) => {
    if (err) {
      console.error(`Error: ${err}`);
    } else {
      console.log('Email sent successfully');
    }
  });
}
