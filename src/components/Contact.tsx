import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const CONTACT_CARDS = [
  { icon: Mail, label: 'Email', value: 'satyasuryakarthikeya@gmail.com', href: 'mailto:satyasuryakarthikeya@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 8428475787', href: 'tel:8428475787' },
  { icon: MapPin, label: 'Location', value: 'Kanchipuram, Tamil Nadu, India', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'satyasuryakarthikeya', href: 'https://www.linkedin.com/in/satyasuryakarthikeya' },
];

export default function Contact() {
  const ref = useScrollAnimation();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'A valid email is required.';
    if (!form.message.trim() || form.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again or email directly.');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-800/30" ref={ref}>
      <div className="section-container">
        <div className="scroll-animate mb-12 text-center">
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <div className="section-divider mx-auto" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Have an opportunity or want to collaborate? I'd love to hear from you.
            Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-4 scroll-animate-left">
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/25 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-slate-300 hover:text-cyan-400 transition-colors text-sm truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-slate-300 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 scroll-animate-right">
            <div className="card">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-14 h-14 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary">
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5" htmlFor="name">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input-field"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5" htmlFor="email">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-field"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5" htmlFor="message">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity or how I can help..."
                      className="input-field resize-none"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-400/25 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
