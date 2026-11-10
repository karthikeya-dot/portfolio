import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; } });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((l) => { const el = document.getElementById(l.toLowerCase()); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <header className="nav">
      <a href="#home" className="brand">SSK<span>.</span></a>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
      <nav className={open ? 'open' : ''}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className={active === l.toLowerCase() ? 'on' : ''} onClick={() => setOpen(false)}>{l}</a>
        ))}
      </nav>
      <button className="theme" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <FiMoon /> : <FiSun />}</button>
    </header>
  );
}
