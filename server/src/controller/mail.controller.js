import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendMail = async (firstname, lastname, phone, email, message, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const subject = 'A New Mail - AgricVision';
    const to = process.env.EMAIL;
    const from = email;

    // Load and compile handlebars template
    const templatePath = path.join(__dirname, '../templates/feedback.hbs');
    const source = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(source);
    const html = template({
      firstname,
      lastname,
      phone,
      email,
      message,
    });

    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Mail sent:', info.response);
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error('Mail error:', error.message);
    res.status(500).json({ error: 'Failed to send mail' });
  }
};

export const mail = async (req, res) => {
  const { firstname, lastname, phone, email, message } = req.body;
  if (!firstname || !lastname || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  await sendMail(firstname, lastname, phone, email, message, res);
};

export default mail