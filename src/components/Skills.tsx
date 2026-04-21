import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SKILLS = [
  { name: 'Python', level: 75, category: 'Language' },
  { name: 'SQL', level: 75, category: 'Database' },
  { name: 'PySpark', level: 60, category: 'Big Data' },
  { name: 'AWS', level: 60, category: 'Cloud' },
];

const TOOL_TAGS = [
  'VS Code', 'Jupyter Notebook', 'ChatGPT', 'SQLite', 'PostgreSQL',
];

function SkillBar({ name, level, category, delay }: { name: string; level: number; category: string; delay: number }) {
  return (
    <div className={`scroll-animate delay-${delay}`}>
      <div className="card group">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white font-semibold text-sm">{name}</p>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">{category}</p>
          </div>
          <span className="text-slate-400 text-xs font-mono">{level}%</span>
        </div>
        <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useScrollAnimation();

  return (
    <section id="skills" className="py-20 md:py-28 bg-slate-800/30" ref={ref}>
      <div className="section-container">
        <div className="scroll-animate mb-12">
          <p className="section-subtitle">What I Know</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-divider" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SKILLS.map((skill, index) => (
            <SkillBar
              key={skill.name}
              {...skill}
              delay={Math.min((index % 3) + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6}
            />
          ))}
        </div>

        {/* Tools */}
        <div className="scroll-animate">
          <h3 className="text-lg font-semibold text-white mb-4">Tools & Platforms</h3>
          <div className="flex flex-wrap gap-3">
            {TOOL_TAGS.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/40 text-slate-300 text-sm
                           hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-slate-700/40 transition-all duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
