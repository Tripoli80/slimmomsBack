const nodemailer = require('nodemailer');
require('dotenv').config();

const passwordMail = process.env.MAIL_PASSWORD;
const smtpConfig = {
  host: 'mail.adm.tools',
  port: 465,
  secure: true,
  auth: {
    user: 'no-reply@uait.pro',
    pass: passwordMail,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

const verifyMailSend = async ({ email, verificationToken }) => {
  const html = `<a href=${process.env.BASE_URL}api/users/verify/${verificationToken}>Click on link to verify your email</a>`;
  const emailOptions = {
    from: 'no-reply@uait.pro',
    to: email,
    subject: 'Verify letter',
    html: html,
  };
  try {
    const response = await transporter.sendMail(emailOptions);
    return response;
  } catch (error) {
    throw new Error({ messages: 'Error send verify mail' });
  }
};

module.exports = { verifyMailSend };
