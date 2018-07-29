const mailgun = require('mailgun.js');

const mg = mailgun.client({
  username: 'api',
  key:      process.env.MAILGUN_API_KEY,
});

module.exports = (app) => {
  app.post('/api/messages', (req, res) => {
    const items = Object.entries(req.body)
      .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
      .join('');
    mg.messages.create('312development.com', {
      from:    'My Form <noreply@312development.com>',
      to:      ['erik@312development.com'],
      subject: 'New Contact Form Submission',
      html:    `<ul>${items}</ul>`,
    }).then((msg) => {
      res.status(200).json(msg);
    }).catch((err) => {
      res.status(500).json(err);
    });
  });
};
