import { useState } from 'react';
import { X, Calendar, Building2, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CERTS = [
  {
    title: 'Python Intern',
    issuer: 'Big Bucks Innovation Private Limited',
    period: '2 Dec 2025 – 17 Dec 2025',
    image: '/assets/certificates/big_si_bucks_innovation_private_limited.jpeg',
    description:
      'Completed a Python internship involving practical programming tasks and project work. Applied core Python concepts, problem-solving techniques, and demonstrated professionalism and strong learning ability.',
    tags: ['Python', 'Problem Solving', 'Online Mode'],
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-400/25',
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-400/25',
  },
  {
    title: 'Python Intern',
    issuer: 'InternPe',
    period: '22 Dec 2025 – 18 Jan 2026',
    image: '/assets/certificates/internpe.jpeg',
    description:
      'Completed internship in Python Programming. Worked on programming tasks and practical exercises. Improved coding logic and problem-solving skills. Demonstrated professionalism and dedication.',
    tags: ['Python Programming', 'Coding Logic', 'Online Mode'],
    color: 'from-cyan-500/20 to-sky-500/10',
    border: 'border-cyan-400/25',
    accent: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-400/25',
  },
];

function CertModal({ cert, onClose }: { cert: typeof CERTS[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-slate-900 border border-slate-700/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700/50">
          <h3 className="font-semibold text-white">{cert.title} — {cert.issuer}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <img
          src={cert.image}
          alt={`${cert.title} certificate from ${cert.issuer}`}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default function Certifications() {
  const ref = useScrollAnimation();
  const [activeCert, setActiveCert] = useState<typeof CERTS[0] | null>(null);

  return (
    <section id="certifications" className="py-20 md:py-28 bg-slate-900" ref={ref}>
      <div className="section-container">
        <div className="scroll-animate mb-12">
          <p className="section-subtitle">Credentials</p>
          <h2 className="section-title">Certifications</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((cert, idx) => (
            <div key={idx} className={`scroll-animate delay-${idx + 1}`}>
              <div className={`card flex flex-col h-full bg-gradient-to-br ${cert.color} border ${cert.border} hover:shadow-lg cursor-pointer group`}
                   onClick={() => setActiveCert(cert)}>
                {/* Certificate thumbnail */}
                <div className="relative mb-5 rounded-xl overflow-hidden aspect-video bg-slate-800">
                  <img
                    src={cert.image}
                    alt={`${cert.issuer} certificate`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs text-white/80 font-mono">
                    Click to view certificate
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${cert.iconBg}`}>
                    <Award className={`w-5 h-5 ${cert.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      <p className={`text-sm font-medium ${cert.accent}`}>{cert.issuer}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>{cert.period}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/40">
                  {cert.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/40`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  );
}
