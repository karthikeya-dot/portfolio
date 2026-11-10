import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend, FiExternalLink, FiGlobe, FiSmartphone } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../data/content';
const empty = { name: '', email: '', subject: '', message: '' };
const check = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (f.subject.trim().length < 3) e.subject = 'Enter a subject.';
  if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
  return e;
};
const handle = profile.linkedin.split('/').filter(Boolean).pop();
const cards = [
  { tone: 'purple', Icon: FiMail, PillIcon: FiExternalLink, pill: 'Send Email', label: 'Email Me', value: profile.email, href: `mailto:${profile.email}` },
  { tone: 'cyan', Icon: FiPhone, PillIcon: FiSmartphone, pill: 'Call Me', label: 'Phone', value: `+91 ${profile.phone}`, href: `tel:+91${profile.phone}` },
  { tone: 'blue', Icon: FaLinkedinIn, PillIcon: FiExternalLink, pill: 'View Profile', label: 'LinkedIn', value: handle, href: profile.linkedin, ext: true },
  { tone: 'pink', Icon: FiMapPin, PillIcon: FiGlobe, pill: 'Based In', label: 'Location', value: 'Tamil Nadu, India' },
];
export default function Contact() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    const v = check(f); setErrors(v); setStatus(null);
    if (Object.keys(v).length) return;
    setBusy(true);
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { setStatus({ type: 'ok', text: d.message }); setF(empty); }
      else { if (d.errors) setErrors(d.errors); setStatus({ type: 'err', text: d.error || 'Please fix the highlighted fields.' }); }
    } catch { setStatus({ type: 'err', text: `Could not reach the server. Email me at ${profile.email}.` }); }
    setBusy(false);
  }
  const field = (k, label, area) => (
    <label className={k === 'message' ? 'full' : ''}>{label}
      {area ? <textarea rows={5} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} />
            : <input type={k === 'email' ? 'email' : 'text'} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} />}
      {errors[k] && <small>{errors[k]}</small>}
    </label>
  );
  return (
    <div className="contact">
      <p className="contact-intro">{profile.contactIntro}</p>
      <div className="contact-cards">
        {cards.map(({ tone, Icon, PillIcon, pill, label, value, href, ext }) => {
          const body = (
            <>
              <span className={`ic ${tone}`}><Icon /></span>
              <span className={`pill ${tone}`}><PillIcon /> {pill}</span>
              <span className="lbl">{label}</span>
              <strong className="val">{value}</strong>
            </>
          );
          return href
            ? <a key={label} className="ccard" href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>{body}</a>
            : <div key={label} className="ccard">{body}</div>;
        })}
      </div>
      <div className="msg-panel">
        <div className="msg-head"><FiSend /> Send a Direct Message</div>
        <form onSubmit={submit} noValidate>
          <div className="row2">{field('name', 'Your Name')}{field('email', 'Your Email')}</div>
          {field('subject', 'Subject')}
          {field('message', 'Message', true)}
          <button className="btn primary" disabled={busy}><FiSend /> {busy ? 'Sending…' : 'Send Message'}</button>
          {status && <p role="status" className={`status ${status.type}`}>{status.text}</p>}
        </form>
      </div>
    </div>
  );
}
