const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Setup transporter for Gmail SMTP (use 'app password', not gmail password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,     // your email@gmail.com
    pass: process.env.GMAIL_PASS      // your Gmail app password
  }
});

app.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,         // comma-separated list of emails
      subject,
      text
    });
    res.status(200).json({ message: "Mail sent" });
  } catch (e) {
    res.status(500).json({ message: "Mail failed", error: e.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
