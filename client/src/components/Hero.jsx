import { FiDownload, FiMail } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { profile } from '../data/content';
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="hello">Hi, I am</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.title}</p>
          <p className="lead">{profile.intro}</p>
          <div className="cta">
            <a className="btn primary" href={profile.resume} download><FiDownload /> Download Resume</a>
            <a className="btn" href="#contact"><FiMail /> Contact Me</a>
            <a className="icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
        <div className="side">
        <img className="photo" src={profile.photo} alt="Satya Surya Karthikeya P" />
        </div>
      </div>
    </section>
  );
}
