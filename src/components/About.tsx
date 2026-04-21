import { MapPin, Phone, Mail, Linkedin, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '8428475787', href: 'tel:8428475787' },
  { icon: Mail, label: 'Email', value: 'satyasuryakarthikeya@gmail.com', href: 'mailto:satyasuryakarthikeya@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Kanchipuram, Tamil Nadu, India', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'satyasuryakarthikeya', href: 'https://www.linkedin.com/in/satyasuryakarthikeya' },
  { icon: Globe, label: 'Languages', value: 'English, Telugu, Tamil', href: null },
];

export default function About() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-900" ref={ref}>
      <div className="section-container">
        <div className="scroll-animate mb-12">
          <p className="section-subtitle">Who I Am</p>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Bio */}
          <div className="scroll-animate-left">
            <div className="card h-full">
              <h3 className="text-xl font-semibold text-white mb-4">My Story</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                I'm Satya Surya Karthikeya P, an aspiring Full Stack Developer and Data Engineer
                currently pursuing my MCA at SRM Institute of Science and Technology.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                With a strong foundation in Python, SQL, and cloud technologies, I'm passionate about
                building efficient, scalable solutions. My hands-on experience from internships at
                Big Bucks Innovation and InternPe has equipped me with practical Python skills and
                real-world problem-solving abilities.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I'm actively seeking opportunities where I can contribute my skills, collaborate with
                talented teams, and continue growing as a developer in the tech industry.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <p className="text-sm font-mono text-cyan-400 mb-2">Objective</p>
                <blockquote className="text-slate-300 italic border-l-2 border-cyan-400/50 pl-4">
                  "A motivated fresher seeking an opportunity to learn, grow, and contribute
                  to the success of the company."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="scroll-animate-right">
            <div className="card h-full">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Details</h3>
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-slate-300 hover:text-cyan-400 transition-colors text-sm break-all"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
