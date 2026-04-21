import { Linkedin, Mail, Code2, Heart } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-bold text-white">
                <span className="text-cyan-400">SSK</span>.dev
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Aspiring Full Stack Developer & Data Engineer based in Kanchipuram, Tamil Nadu.
              Open to new opportunities and collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className="text-slate-500 hover:text-cyan-400 text-sm transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.linkedin.com/in/satyasuryakarthikeya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:satyasuryakarthikeya@gmail.com"
                className="w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a
              href="/assets/p_s_s_karthikeya_resume.pdf"
              download="Satya_Surya_Karthikeya_Resume.pdf"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Download Resume →
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Satya Surya Karthikeya P. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-slate-600 text-sm">
            Built with <Heart className="w-3 h-3 text-red-400 fill-current" /> using React & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
