import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Contact from './components/Contact';
import ScrollUI from './components/ScrollUI';
import { FaLinkedin } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { profile, about, skills, projects, experience, certifications, education } from './data/content';

export default function App() {
  const [cert, setCert] = useState(null);
  return (
    <>
      <ScrollUI />
      <Navbar />
      <main>
        <Hero />
        <Section id="about" title="About Me">
          <div className="about">{about.map((p) => <p key={p}>{p}</p>)}</div>
        </Section>
        <Section id="skills" title="Technical Skills">
          <div className="grid skills">
            {skills.map((s) => (
              <div className="card" key={s.group}><h3>{s.group}</h3>
                <div className="badges">{s.items.map((i) => <span key={i} className="badge">{i}</span>)}</div>
              </div>
            ))}
          </div>
        </Section>
        <Section id="projects" title="Projects">
          <div className="grid two">
            {projects.map((p) => (
              <article className="card project" key={p.title}>
                <h3>{p.title}</h3>
                <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="badges">{p.tags.map((t) => <span key={t} className="badge alt">{t}</span>)}</div>
                {p.demo && (
                  <div className="cta">
                    {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noreferrer"><FiExternalLink /> Live Demo</a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>
        <Section id="experience" title="Internship Experience">
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.org}><span className="dot" />
                <h3>{e.role}</h3><p className="meta">{e.org} | {e.period}</p>
                <ul>{e.points.map((x) => <li key={x}>{x}</li>)}</ul>
              </li>
            ))}
          </ol>
          <h3 className="sub">Certifications</h3>
          <div className="grid two">
            {certifications.map((c) => (
              <div className="card cert" key={c.name + c.issuer}>
                <button className="thumb" onClick={() => setCert(c)} aria-label={`View ${c.name} certificate`}><img src={c.img} alt="" loading="lazy" /></button>
                <h3>{c.name}</h3><p>{c.issuer}</p><p className="meta">{c.date}</p>
                <button className="btn" onClick={() => setCert(c)}>View certificate</button>
              </div>
            ))}
          </div>
        </Section>
        <Section id="education" title="Education">
          <div className="grid two">
            {education.map((e) => (
              <div className="card" key={e.degree}><h3>{e.degree}</h3><p>{e.school}</p><span className="badge alt">{e.score}</span></div>
            ))}
          </div>
        </Section>
        <Section id="contact" title={<>Get In <span className="grad">Touch</span></>}><Contact /></Section>
      </main>
      {cert && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={cert.name} onClick={() => setCert(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <button className="btn" onClick={() => setCert(null)}>Close</button>
            <img src={cert.img} alt={`${cert.name} certificate`} />
          </div>
        </div>
      )}
      <footer className="footer">
        <div><strong>{profile.name}</strong><p>{profile.title}</p></div>
        <div className="socials">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
