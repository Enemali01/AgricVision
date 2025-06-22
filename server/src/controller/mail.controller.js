import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create reusable transporter
const createTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

// Load template
const loadTemplate = (filename, data) => {
  const templatePath = path.join(__dirname, '../templates', filename);
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  return template(data);
};

const sendMail = async (firstname, lastname, phone, email, message, file, res) => {
  try {
    const transporter = createTransporter();

    const html = loadTemplate('feedback.hbs', {
      firstname,
      lastname,
      phone,
      email,
      message,
    });

    // 1. Email to site owner
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: 'New Contact Form Submission - AgricVision',
      html,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    // 2. Auto-confirmation email to user
    const userHtml = loadTemplate('confirmation.hbs', {
      firstname,
      lastname,
    });

    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Thanks for contacting us!',
      html: userHtml,
    };

    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Mail sent successfully to both parties' });
  } catch (error) {
    console.error('Mail error:', error.message);
    res.status(500).json({ error: 'Failed to send mail' });
  }
};

export const mail = async (req, res) => {
  const { firstname, lastname, phone, email, message } = req.body;
  const file = req.file; // Multer should be configured to support single file upload

  if (!firstname || !lastname || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  await sendMail(firstname, lastname, phone, email, message, file, res);
};

export default mail