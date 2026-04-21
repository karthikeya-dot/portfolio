import { Download, Mail, Linkedin, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg"
    >
      {/* Animated white dots canvas background */}
      <canvas id="dots-canvas" className="absolute inset-0 w-full h-full" />

      {/* Subtle pink radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(236,72,153,0.10), transparent)' }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-500/5 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-purple-500/5 blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }} />

      <div className="relative section-container py-24 pt-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1 animate-fade-in-up">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-pink-400 font-mono text-sm tracking-wider">Available for opportunities</span>
            </div>

            <div>
              <p className="text-slate-300 font-light text-lg sm:text-xl mb-2">
                👋 Hi, Welcome to my Portfolio
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-3 hero-heading">
                Satya Surya
                <br />
                <span className="text-gradient-pink">Karthikeya P</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-light">
                Aspiring Full Stack Developer
                <span className="text-slate-500 mx-2">/</span>
                Data Engineer
              </p>
            </div>

            <p className="text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              A motivated fresher seeking an opportunity to learn, grow, and contribute
              to the success of the company. Passionate about building scalable applications
              and data-driven solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="/assets/p_s_s_karthikeya_resume.pdf"
                download="Satya_Surya_Karthikeya_Resume.pdf"
                className="btn-primary"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <button onClick={scrollToContact} className="btn-secondary">
                <Mail className="w-4 h-4" />
                Contact Me
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/satyasuryakarthikeya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-400/40 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:satyasuryakarthikeya@gmail.com"
                className="w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-400/40 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Profile Image with animation */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative profile-wrapper">
              {/* Rotating ring */}
              <div className="profile-ring-outer" />
              <div className="profile-ring-inner" />
              {/* Glow */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-pink-500/25 to-purple-500/15 blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
              {/* Image */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-pink-400/50 shadow-2xl shadow-pink-500/20 profile-img-container">
                <img
                  src="/assets/images/profile_pic.jpeg"
                  alt="Satya Surya Karthikeya P"
                  className="w-full h-full object-cover profile-img"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-pink-400/40 rounded-xl px-3 py-2 shadow-lg shadow-pink-500/10">
                <p className="text-xs text-slate-400 font-mono">MCA Student</p>
                <p className="text-sm font-semibold text-pink-400">CGPA 8.92</p>
              </div>
              {/* Orbiting dot */}
              <div className="orbit-dot" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-slate-600 text-xs font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      {/* Dots canvas script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const canvas = document.getElementById('dots-canvas');
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          let dots = [];
          function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
          }
          function init() {
            dots = [];
            const count = Math.floor((canvas.width * canvas.height) / 8000);
            for (let i = 0; i < count; i++) {
              dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.3 + 0.1,
                dir: Math.random() * Math.PI * 2,
              });
            }
          }
          function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach(d => {
              ctx.beginPath();
              ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255,255,255,' + d.alpha + ')';
              ctx.fill();
              d.x += Math.cos(d.dir) * d.speed;
              d.y += Math.sin(d.dir) * d.speed;
              if (d.x < 0) d.x = canvas.width;
              if (d.x > canvas.width) d.x = 0;
              if (d.y < 0) d.y = canvas.height;
              if (d.y > canvas.height) d.y = 0;
            });
            requestAnimationFrame(draw);
          }
          resize();
          init();
          draw();
          window.addEventListener('resize', () => { resize(); init(); });
        })();
      ` }} />
    </section>
  );
}
