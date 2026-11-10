import { Router } from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';
import { saveToExcel, excelPath } from '../utils/excel.js';
import fs from 'fs';
const router = Router();
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const smtpReady = () => ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'].every((k) => process.env[k]);
const dbReady = () => mongoose.connection.readyState === 1;

router.post('/', async (req, res) => {
  const { name = '', email = '', subject = '', message = '' } = req.body || {};
  const errors = {};
  if (String(name).trim().length < 2) errors.name = 'Enter your name.';
  if (!emailOk(String(email).trim())) errors.email = 'Enter a valid email address.';
  if (String(subject).trim().length < 3) errors.subject = 'Enter a subject.';
  if (String(message).trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  try {
    await saveToExcel({ name: String(name).trim(), email: String(email).trim(), subject: String(subject).trim(), message: String(message).trim() });
    if (dbReady()) await Message.create({ name, email, subject, message });
    if (smtpReady()) {
      const port = Number(process.env.SMTP_PORT || 465);
      await nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
        .sendMail({ from: process.env.SMTP_USER, to: process.env.MAIL_TO, replyTo: email,
          subject: `Portfolio: ${subject}`, text: `From: ${name} <${email}>\n\n${message}` });
    }
    res.json({ ok: true, message: 'Message sent. I will reply soon.' });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ ok: false, error: 'Could not send your message. Please try again or email me directly.' });
  }
});
router.get('/download', (req, res) => {
  if (!process.env.ADMIN_KEY || req.query.key !== process.env.ADMIN_KEY) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  if (!fs.existsSync(excelPath())) return res.status(404).json({ ok: false, error: 'No messages yet.' });
  res.download(excelPath(), 'messages.xlsx');
});
export default router;
