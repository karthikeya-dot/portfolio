import { MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PROJECTS = [
  {
    title: 'Real-Time Chat Application',
    description:
      'Developed a real-time chat application using Python, Django, HTML, and CSS, with features such as user registration, login, and secure authentication. Built messaging and contact management modules and designed both frontend and backend functionality. Used ChatGPT for coding support, debugging, and optimization to improve application performance and reliability.',
    techStack: ['Python', 'Django', 'HTML', 'CSS', 'WebSockets', 'SQLite'],
    highlights: [
      'User registration & authentication system',
      'Real-time messaging with WebSocket support',
      'Contact management module',
      'Frontend & backend co-designed',
      'Performance optimized with AI-assisted debugging',
    ],
    icon: MessageSquare,
    gradient: 'from-pink-500/10 to-purple-500/5',
    border: 'border-pink-400/20',
  },
];

export default function Projects() {
  const ref = useScrollAnimation();

  return (
    <section id="projects" className="py-20 md:py-28 projects-section" ref={ref}>
      <div className="section-container">
        <div className="scroll-animate mb-12">
          <p className="section-subtitle">What I've Built</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-3xl">
          {PROJECTS.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div key={idx} className={`scroll-animate delay-${idx + 1}`}>
                <div className={`card h-full flex flex-col bg-gradient-to-br ${project.gradient} border ${project.border} hover:border-pink-400/50`}>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-400/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed mb-5 text-sm">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex-1">
                    <p className="text-xs font-mono text-pink-400 uppercase tracking-wider mb-3">Key Features</p>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
