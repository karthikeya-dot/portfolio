# Satya Surya Karthikeya P: MERN Portfolio

## Structure
```
portfolio/
  package.json            root scripts
  server/  index.js, routes/contact.js, models/Message.js, .env.example
  client/  index.html, vite.config.js, public/(resume PDF)
           src/ App.jsx, main.jsx, index.css, data/content.js, components/(Navbar, Hero, Section, Contact)
```
## Run locally (Node 18+)
```
npm run install:all
cp server/.env.example server/.env    # set MONGO_URI and/or SMTP_*
npm run dev                           # client :5173, API :5000
```
Contact form: every message is saved as a new row in `server/data/messages.xlsx` (Date, Name, Email, Subject, Message). MongoDB and email are optional extras. If saving fails, the form shows an error (no fake success).
Open the file from `server/data/`, or set ADMIN_KEY and visit `/api/contact/download?key=YOUR_KEY`. Note: free hosts (Render free tier) wipe files on redeploy/restart, so use a persistent disk or download the sheet regularly.
Edit text, dates and project links in `client/src/data/content.js` (add `demo` URLs to show project buttons).

## Deploy (single service, e.g. Render)
1. Push to GitHub. Create a free MongoDB Atlas cluster and copy its connection string.
2. Render > New Web Service. Build: `npm run install:all && npm run build`. Start: `npm start`.
3. Add env vars from `server/.env.example` (CLIENT_URL = your site URL).
4. Alternative: client on Vercel/Netlify (rewrite `/api/*` to the API host), server on Render.
