import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import contact from './routes/contact.js';

const app = express();
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../client/dist');
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, skip: (r) => r.method === 'GET' }), contact);
app.get('/api/health', (_, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1 }));
app.use(express.static(dist));
app.get('*', (req, res, next) => req.path.startsWith('/api') ? next() : res.sendFile(path.join(dist, 'index.html'), (e) => e && next()));

if (process.env.MONGO_URI)
  mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch((e) => console.error('MongoDB failed:', e.message));
else console.warn('MONGO_URI not set: messages will not be stored.');
app.listen(process.env.PORT || 5000, () => console.log('Server on port', process.env.PORT || 5000));
