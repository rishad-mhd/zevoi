const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

transporter.verify();

const sendmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports = { sendmail };
