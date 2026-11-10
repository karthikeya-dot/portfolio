import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
export default function ScrollUI() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className="progress" style={{ width: `${pct}%` }} aria-hidden="true" />
      <a href="#home" className={`totop ${pct > 8 ? 'show' : ''}`} aria-label="Back to top"><FiArrowUp /></a>
    </>
  );
}
