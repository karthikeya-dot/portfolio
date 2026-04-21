import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const EDUCATION = [
  {
    degree: 'MCA — Master of Computer Application',
    institution: 'SRM Institute of Science and Technology',
    period: '2025 – 2027',
    score: 'CGPA: 8.92 (1st Sem)',
    level: 'Post Graduate',
    highlight: true,
  },
  {
    degree: 'BCA — Bachelor of Computer Application',
    institution: 'Sri Chandrasekharendra Saraswathi Viswa Mahavidyalaya',
    period: '2022 – 2025',
    score: 'CGPA: 7.92',
    level: 'Under Graduate',
    highlight: false,
  },
  {
    degree: '12th Standard',
    institution: 'Pak Palanisamy HR Sec School',
    period: '2022',
    score: '78%',
    level: 'Higher Secondary',
    highlight: false,
  },
  {
    degree: '10th Standard',
    institution: 'Pak Palanisamy HR Sec School',
    period: '2020',
    score: '58%',
    level: 'Secondary',
    highlight: false,
  },
];

export default function Education() {
  const ref = useScrollAnimation();

  return (
    <section id="education" className="py-20 md:py-28 bg-slate-800/30" ref={ref}>
      <div className="section-container">
        <div className="scroll-animate mb-12">
          <p className="section-subtitle">Academic Background</p>
          <h2 className="section-title">Education</h2>
          <div className="section-divider" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {EDUCATION.map((edu, idx) => {
              const isRight = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  } scroll-animate delay-${idx + 1}`}
                >
                  {/* Card — takes up one half */}
                  <div className={`flex-1 ${isRight ? 'md:text-right' : 'md:text-left'} pl-10 sm:pl-0`}>
                    <div className={`card inline-block w-full text-left ${edu.highlight ? 'border-cyan-400/40 bg-cyan-500/5' : ''}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          edu.highlight ? 'bg-cyan-500/20 border border-cyan-400/40' : 'bg-slate-700/50 border border-slate-600/50'
                        }`}>
                          <GraduationCap className={`w-4 h-4 ${edu.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                        </div>
                        <div>
                          <span className={`text-xs font-mono uppercase tracking-wider ${edu.highlight ? 'text-cyan-400' : 'text-slate-500'}`}>
                            {edu.level}
                          </span>
                          <h3 className="text-base font-semibold text-white mt-0.5">{edu.degree}</h3>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mb-3">{edu.institution}</p>

                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {edu.period}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          edu.highlight ? 'text-cyan-400' : 'text-slate-400'
                        }`}>
                          <Award className="w-3 h-3" />
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-5 md:static md:flex-none flex-none z-10 hidden sm:flex">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      edu.highlight
                        ? 'border-cyan-400 bg-cyan-400/30'
                        : 'border-slate-500 bg-slate-800'
                    } md:-mx-2`} />
                  </div>

                  {/* Spacer for the other half */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
