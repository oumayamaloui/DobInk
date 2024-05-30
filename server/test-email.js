const nodemailer = require('nodemailer');

// Configure your email transport options here
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'pfe_2024@outlook.com',
    pass: 'pfepfe2024',
  },
});

// Define the email options
const mailOptions = {
  from: 'pfe_2024@outlook.com\'',
  to: 'azizsaidani1999@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('Email sent:', info.response);
});
