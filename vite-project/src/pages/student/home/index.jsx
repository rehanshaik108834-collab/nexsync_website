import React, { useState, useEffect, useRef } from 'react';

const NexSyncApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorCircleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorDotRef.current && cursorCircleRef.current) {
        cursorDotRef.current.style.top = e.clientY + 'px';
        cursorDotRef.current.style.left = e.clientX + 'px';
        
        setTimeout(() => {
          if (cursorCircleRef.current) {
            cursorCircleRef.current.style.top = e.clientY + 'px';
            cursorCircleRef.current.style.left = e.clientX + 'px';
          }
        }, 50);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const hoverTriggers = document.querySelectorAll('.hover-trigger');
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    hoverTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', handleMouseEnter);
      trigger.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      hoverTriggers.forEach(trigger => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
        trigger.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'home') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = Math.random() * 5 + 2;
        this.size = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.9 ? '#D1FF00' : 'rgba(255,255,255,0.1)';
      }
      update() {
        this.x -= this.speed;
        if (this.x < 0) {
          this.x = width;
          this.y = Math.random() * height;
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size * 10, this.size);
      }
    }
    
    const particles = Array.from({ length: 150 }, () => new Particle());
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };
    animate();
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.includes('admin')) {
      setCurrentPage('admin');
    } else {
      alert('ACCESS DENIED. RESTRICTED AREA.');
    }
  };

  const HomePage = () => (
    <>
      <nav className={scrolled ? 'scrolled' : ''} style={{ position: 'relative', zIndex: 100 }}>
        <div className="logo hover-trigger">
          NEX<span style={{ color: '#d1ff00' }}>SYNC</span>.
        </div>
        <div className="nav-items">
          <a href="#mission" className="nav-link hover-trigger">Mission</a>
          <a href="#events" className="nav-link hover-trigger">Events</a>
          <a href="#projects" className="nav-link hover-trigger">Projects</a>
          <a href="#team" className="nav-link hover-trigger">Team</a>
        </div>
        <button onClick={() => setCurrentPage('login')} className="btn btn-primary hover-trigger">JOIN CLUB</button>
      </nav>

      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-label">/// IIIT SRI CITY SMART MOBILITY LAB</div>
            <h1>Building the <br />Autonomous Future</h1>
            <p className="hero-p">
              NexSync integrates V2V/V2I communication, IoT sensors for ADAS, and
              Computer Vision to build the next generation of transport systems.
            </p>
            <div className="btn-group">
              <a href="#projects" className="btn btn-primary hover-trigger">View Projects</a>
              <a href="#about" className="btn btn-glass hover-trigger">Explore Data</a>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://purepng.com/public/uploads/large/purepng.com-mclaren-p1-gtr-carcarvehicletransportmclaren-961524663363hsmca.png"
              alt="Autonomous Concept"
              className="car-img hover-trigger"
            />
            <div className="lidar-badge">
              LIDAR: ACTIVE<br />LATENCY: 12ms
            </div>
          </div>
        </div>
      </section>

      <section id="mission" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2>Core Directives</h2>
          <p>/// SECTOR 01: R&D OBJECTIVES</p>
        </div>

        <div className="bento-grid">
          <div className="card span-2 hover-trigger">
            <div className="card-icon"><i className="fas fa-crosshairs"></i></div>
            <h3>Our Mission</h3>
            <p>
              To accelerate the adoption of intelligent mobility solutions. We
              empower students to build real-world autonomous systems using
              Python, IoT, and Deep Learning. We collaborate with industry bodies
              to build scalable solutions.
            </p>
          </div>

          <div className="card hover-trigger">
            <div className="card-icon"><i className="fas fa-wifi"></i></div>
            <h3>IoT & Sensors</h3>
            <p>
              Hardware deployment for ADAS and V2I (Vehicle to Infrastructure)
              communication using ESP32 and Lidar.
            </p>
          </div>

          <div className="card hover-trigger">
            <div className="card-icon"><i className="fas fa-robot"></i></div>
            <h3>AI & Vision</h3>
            <p>
              Using YOLO and OpenCV for crowd counting, density analysis, and
              autonomous path planning algorithms.
            </p>
          </div>
        </div>
      </section>

      <section id="team" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2>Command Structure</h2>
          <p>/// SECTOR 02: LEADERSHIP NODE</p>
        </div>

        <div className="team-leads-grid">
          <div className="team-card hover-trigger" style={{ width: '300px' }}>
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
              className="team-img"
              alt="Adithya"
            />
            <span className="role-tag">CLUB LEAD</span>
            <div className="member-name">ADITHYA RAM S</div>
            <div className="member-year">UG3</div>
          </div>
          <div className="team-card hover-trigger" style={{ width: '300px' }}>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
              className="team-img"
              alt="Dhyanesh"
            />
            <span className="role-tag">CO-LEAD</span>
            <div className="member-name">DHYANESH</div>
            <div className="member-year">UG3</div>
          </div>
        </div>

        <h3 className="section-subtitle">CORE COMMITTEE</h3>
        <div className="team-grid">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="team-card hover-trigger">
              <span className="role-tag">CORE</span>
              <div className="member-name">MEMBER 0{i}</div>
            </div>
          ))}
        </div>

        <h3 className="section-subtitle">DOMAIN LEADS</h3>
        <div className="team-grid">
          <div className="team-card domain-lead hover-trigger">
            <span className="role-tag">UI/UX & WEB</span>
            <div className="member-name">VINOD K.</div>
          </div>
          <div className="team-card domain-lead hover-trigger">
            <span className="role-tag">ELECTRONICS</span>
            <div className="member-name">LEAD NAME</div>
          </div>
          <div className="team-card domain-lead hover-trigger">
            <span className="role-tag">DATA SCIENCE</span>
            <div className="member-name">LEAD NAME</div>
          </div>
          <div className="team-card domain-lead hover-trigger">
            <span className="role-tag">AI / ML</span>
            <div className="member-name">LEAD NAME</div>
          </div>
          <div className="team-card domain-lead hover-trigger">
            <span className="role-tag">PR & OUTREACH</span>
            <div className="member-name">LEAD NAME</div>
          </div>
        </div>
      </section>

      <section id="events" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2>Deployments</h2>
          <p>/// SECTOR 03: LIVE EVENTS</p>
        </div>

        <div className="bento-grid">
          <div className="card span-4 agentica-card hover-trigger">
            <div style={{ flex: 1 }}>
              <span className="agentica-label">/// UPCOMING HACKATHON</span>
              <h3 className="agentica-title">AGENTICA</h3>
              <p className="agentica-desc">
                The Ultimate AI Agent Mobility Challenge.<br />Part of Abhisarga '26.
              </p>
              <div style={{ marginTop: '30px' }}>
                <a href="#" className="btn btn-primary hover-trigger">REGISTER NOW</a>
              </div>
            </div>
            <div className="agentica-stats">
              <div className="stat">
                <h4>867</h4>
                <span>Registered</span>
              </div>
              <div className="stat">
                <h4>2.25L</h4>
                <span>Prize Pool</span>
              </div>
              <div className="stat">
                <h4>FEB 27</h4>
                <span>Launch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2>Project Log</h2>
          <p>/// SECTOR 04: COMPLETED BUILDS</p>
        </div>

        <div className="bento-grid">
          <div className="card span-2 hover-trigger">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>GeoGuide</h3>
              <span className="project-status">COMPLETED</span>
            </div>
            <p>
              Location-based assistant for discovery and trip planning. Focus on
              Routing and UX.
            </p>
            <div className="project-tags">
              <span className="tag">FLASK</span>
              <span className="tag">SQL</span>
            </div>
          </div>

          <div className="card span-2 hover-trigger">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Density AI</h3>
              <span className="project-status">IN PROGRESS</span>
            </div>
            <p>Computer-vision based safety analytics for transport hubs.</p>
            <div className="project-tags">
              <span className="tag">YOLO</span>
              <span className="tag">OPENCV</span>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'Teko, sans-serif', fontSize: '3rem' }}>NEXSYNC</h2>
        <p className="footer-address">
          ACADEMIC BLOCK-1, ROOM 248 /// IIIT SRI CITY
        </p>
        <p className="footer-email">
          nexsyncmotors.club@iiits.in
        </p>
        <p className="footer-copyright">
          &copy; 2026 NEXSYNC SMART MOBILITY LAB.
        </p>
      </footer>
    </>
  );

  const LoginPage = () => (
    <div className="login-container">
      <div className="scanner-line" />
      <div className="road-container"><div className="road-grid"></div></div>

      <div className="login-box">
        <h1 style={{ fontSize: '3rem' }}>SYSTEM ACCESS</h1>
        <p className="mono" style={{ marginBottom: '30px' }}>
          /// ADMIN CREDENTIALS REQUIRED
        </p>

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="admin@iiits.in"
            className="input-field"
          />
          <input 
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="PASSWORD"
            className="input-field"
          />
          <button type="submit" className="btn-race" style={{ width: '100%' }}>
            <span>AUTHENTICATE</span>
          </button>
        </form>
        <button
          onClick={() => setCurrentPage('home')}
          className="return-link"
        >
          &lt; RETURN
        </button>
      </div>
    </div>
  );

  const AdminPage = () => (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div className="scanner-line" />
      <div className="road-container"><div className="road-grid admin-grid"></div></div>

      <div className="sidebar">
        <div className="logo">NEX<span style={{ color: '#d1ff00' }}>SYNC</span>_</div>
        <div className="nav-item active">
          <i className="fas fa-chart-line"></i> STATUS
        </div>
        <div className="nav-item"><i className="fas fa-users"></i> PERSONNEL</div>
        <div className="nav-item"><i className="fas fa-rocket"></i> R&D LOGS</div>
        <div className="nav-item">
          <i className="fas fa-envelope"></i> COMMS
          <span style={{ marginLeft: 'auto', color: '#d1ff00', fontSize: '0.7rem' }}>[3]</span>
        </div>
        <div
          className="nav-item"
          style={{ marginTop: 'auto' }}
          onClick={() => setCurrentPage('home')}
        >
          <i className="fas fa-power-off"></i> LOGOUT
        </div>
      </div>

      <div className="main">
        <header>
          <div>
            <h2>SYSTEM COMMAND</h2>
            <p style={{ color: '#d1ff00', fontFamily: 'Share Tech Mono' }}>
              /// WELCOME, ADMIN
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Teko', fontSize: '1.5rem' }}>ADITHYA RAM</div>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>ID: NX-001</span>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-val">867</div>
            <div className="stat-label">AGENTICA REGISTRATIONS</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">24</div>
            <div className="stat-label">ACTIVE LAB MEMBERS</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">5</div>
            <div className="stat-label">PENDING APPROVALS</div>
          </div>
        </div>

        <div className="table-container">
          <h3 className="table-title">INCOMING REQUESTS</h3>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>TARGET</th>
                <th>SKILLS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rohan Kumar</td>
                <td>Density AI</td>
                <td>Python, OpenCV</td>
                <td><span className="status pending">PENDING</span></td>
                <td><button className="btn-action">REVIEW</button></td>
              </tr>
              <tr>
                <td>Sneha P.</td>
                <td>GeoGuide V2</td>
                <td>React, Node.js</td>
                <td><span className="status pending">PENDING</span></td>
                <td><button className="btn-action">REVIEW</button></td>
              </tr>
              <tr>
                <td>Vikram Singh</td>
                <td>Agentica</td>
                <td>Team Lead</td>
                <td><span className="status approved">APPROVED</span></td>
                <td><button className="btn-action">VIEW</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {currentPage === 'home' && (
        <>
          <div ref={cursorDotRef} className="cursor-dot" />
          <div ref={cursorCircleRef} className={`cursor-circle ${isHovering ? 'hovering' : ''}`} />
          
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -2 }}>
            <div className="road-container"><div className="road-grid"></div></div>
          </div>
          
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', background: 'radial-gradient(circle at center, #111 0%, #000 100%)' }} />
          </div>
          
          <div className="noise-overlay" />
          <div className="scanner-line" />
        </>
      )}
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@300;600&family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@300;400;600;700&family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        :root {
          --neon: #d1ff00;
          --neon-dim: rgba(209, 255, 0, 0.1);
          --black: #050505;
          --glass: rgba(255, 255, 255, 0.03);
          --border: rgba(255, 255, 255, 0.15);
          --panel: rgba(10, 10, 10, 0.95);
          --text-main: #ffffff;
          --text-muted: #888888;
          --font-display: "Teko", sans-serif;
          --font-body: "Space Grotesk", sans-serif;
          --font-code: "JetBrains Mono", monospace;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          cursor: none;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background-color: var(--black);
          color: var(--text-main);
          font-family: var(--font-body);
          overflow-x: hidden;
          font-size: 16px;
        }

        /* BACKGROUND EFFECTS */
        .road-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          perspective: 1000px;
          z-index: -2;
          background: #000;
        }
        
        .road-grid {
          position: absolute;
          top: 50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: linear-gradient(
              0deg,
              transparent 24%,
              rgba(209, 255, 0, 0.1) 25%,
              rgba(209, 255, 0, 0.1) 26%,
              transparent 27%,
              transparent 74%,
              rgba(209, 255, 0, 0.1) 75%,
              rgba(209, 255, 0, 0.1) 76%,
              transparent 77%,
              transparent
            ),
            linear-gradient(
              90deg,
              transparent 24%,
              rgba(209, 255, 0, 0.1) 25%,
              rgba(209, 255, 0, 0.1) 26%,
              transparent 27%,
              transparent 74%,
              rgba(209, 255, 0, 0.1) 75%,
              rgba(209, 255, 0, 0.1) 76%,
              transparent 77%,
              transparent
            );
          background-size: 100px 100px;
          transform: rotateX(80deg);
          animation: drive 0.5s linear infinite;
        }

        .admin-grid {
          animation: drive 4s linear infinite;
        }
        
        @keyframes drive {
          0% { transform: rotateX(80deg) translateY(0); }
          100% { transform: rotateX(80deg) translateY(100px); }
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .scanner-line {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 3px;
          background: var(--neon);
          box-shadow: 0 0 20px var(--neon);
          opacity: 0.5;
          animation: scan 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 9999;
        }
        
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        /* CUSTOM CURSOR */
        .cursor-dot,
        .cursor-circle {
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        }
        
        .cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--neon);
        }
        
        .cursor-circle {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        
        .cursor-circle.hovering {
          width: 60px;
          height: 60px;
          border-color: var(--neon);
          background: rgba(209, 255, 0, 0.05);
          mix-blend-mode: screen;
        }

        /* NAVIGATION */
        nav {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 25px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          transition: 0.3s;
        }
        
        nav.scrolled {
          background: rgba(5, 5, 5, 0.9);
          padding: 15px 5%;
        }

        .logo {
          font-family: var(--font-display);
          font-size: 2.2rem;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 1px;
        }
        
        .nav-items {
          display: flex;
          gap: 40px;
        }
        
        .nav-link {
          font-family: var(--font-code);
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          position: relative;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        
        .nav-link:hover {
          color: white;
        }

        /* BUTTONS */
        .btn {
          padding: 18px 36px;
          font-family: var(--font-code);
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
          transition: 0.3s;
          font-size: 0.9rem;
          display: inline-block;
          margin-right: 20px;
          cursor: pointer;
          border: none;
        }
        
        .btn-primary {
          background: var(--neon);
          color: black;
          border: 1px solid var(--neon);
        }
        
        .btn-primary:hover {
          background: transparent;
          color: var(--neon);
          box-shadow: 0 0 20px var(--neon-dim);
        }
        
        .btn-glass {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid var(--border);
          backdrop-filter: blur(5px);
        }
        
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: white;
        }

        .btn-race {
          background: var(--neon);
          color: black;
          padding: 12px 30px;
          font-family: var(--font-display);
          font-size: 1.4rem;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transform: skewX(-20deg);
          display: inline-block;
          font-weight: bold;
          transition: 0.3s;
        }
        
        .btn-race:hover {
          background: white;
          box-shadow: 0 0 30px white;
        }
        
        .btn-race span {
          display: block;
          transform: skewX(20deg);
        }

        /* HERO SECTION */
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          perspective: 1000px;
        }

        .hero-content {
          width: 100%;
          max-width: 1400px;
          padding: 0 5%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          z-index: 2;
        }

        .hero-label {
          font-family: var(--font-code);
          color: var(--neon);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .hero-label::before {
          content: "";
          width: 30px;
          height: 1px;
          background: var(--neon);
        }

        h1 {
          font-family: var(--font-display);
          font-size: clamp(5rem, 10vw, 9rem);
          line-height: 0.85;
          text-transform: uppercase;
          margin-bottom: 30px;
          background: linear-gradient(180deg, #fff 0%, #888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-p {
          max-width: 500px;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #ccc;
          margin-bottom: 40px;
        }

        .hero-visual {
          position: relative;
        }
        
        .car-img {
          width: 140%;
          margin-left: -20%;
          transform: rotateY(-10deg) rotateX(5deg);
          filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.8));
          animation: carFloat 6s ease-in-out infinite;
        }
        
        @keyframes carFloat {
          0%, 100% { transform: translateY(0) rotateY(-10deg); }
          50% { transform: translateY(-20px) rotateY(-10deg); }
        }

        .lidar-badge {
          position: absolute;
          top: 20%;
          right: 10%;
          background: rgba(0, 0, 0, 0.8);
          padding: 10px;
          border: 1px solid var(--neon);
          font-family: var(--font-code);
          font-size: 0.8rem;
          color: var(--neon);
        }

        /* SECTIONS */
        section {
          padding: 120px 5%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 60px;
          border-left: 3px solid var(--neon);
          padding-left: 30px;
        }
        
        .section-header h2 {
          font-family: var(--font-display);
          font-size: 4rem;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 10px;
        }
        
        .section-header p {
          font-family: var(--font-code);
          color: var(--neon);
        }

        .section-subtitle {
          font-family: var(--font-display);
          color: #fff;
          margin-bottom: 20px;
          text-align: center;
          font-size: 2rem;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .card {
          background: var(--glass);
          border: 1px solid var(--border);
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: 0.4s;
          position: relative;
          overflow: hidden;
        }
        
        .card:hover {
          border-color: var(--neon);
          transform: translateY(-5px);
          background: rgba(20, 20, 20, 0.8);
        }
        
        .card h3 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          text-transform: uppercase;
          margin-bottom: 10px;
          line-height: 0.9;
        }
        
        .card p {
          color: #aaa;
          line-height: 1.5;
          font-size: 1rem;
        }
        
        .card-icon {
          font-size: 2.5rem;
          color: var(--neon);
          margin-bottom: 20px;
        }

        .span-2 { grid-column: span 2; }
        .span-4 { grid-column: span 4; }

        /* TEAM */
        .team-leads-grid {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        .team-card {
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid var(--border);
          text-align: center;
          padding: 30px 20px;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .team-card:hover {
          border-color: var(--neon);
          transform: translateY(-5px);
        }
        
        .team-card::after {
          content: "";
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, transparent, rgba(209, 255, 0, 0.1), transparent);
          transition: 0.5s;
        }
        
        .team-card:hover::after {
          top: 100%;
        }

        .team-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 20px auto;
          border: 2px solid #333;
          transition: 0.3s;
          background-color: #111;
        }
        
        .team-card:hover .team-img {
          border-color: var(--neon);
        }

        .role-tag {
          font-family: var(--font-code);
          color: var(--neon);
          font-size: 0.75rem;
          background: rgba(209, 255, 0, 0.1);
          padding: 4px 8px;
          display: inline-block;
          margin-bottom: 10px;
        }
        
        .member-name {
          font-family: var(--font-display);
          font-size: 1.8rem;
          line-height: 1;
          color: white;
        }

        .member-year {
          color: #666;
          font-family: var(--font-code);
          font-size: 0.8rem;
          margin-top: 5px;
        }

        .domain-lead {
          border-top: 3px solid var(--neon);
        }

        /* AGENTICA */
        .agentica-card {
          flex-direction: row;
          align-items: center;
          border: 1px solid var(--neon) !important;
        }

        .agentica-label {
          font-family: var(--font-code);
          color: var(--neon);
          letter-spacing: 2px;
        }

        .agentica-title {
          font-size: 6rem !important;
          margin-top: 10px;
          color: white;
        }

        .agentica-desc {
          color: white !important;
          font-size: 1.2rem;
        }

        .agentica-stats {
          display: flex;
          gap: 50px;
          margin-top: 30px;
        }
        
        .stat h4 {
          font-family: var(--font-display);
          font-size: 3.5rem;
          color: var(--neon);
          line-height: 1;
        }
        
        .stat span {
          font-family: var(--font-code);
          font-size: 0.8rem;
          color: #fff;
          text-transform: uppercase;
        }

        /* PROJECTS */
        .project-status {
          font-family: var(--font-code);
          color: var(--neon);
        }

        .project-tags {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .tag {
          border: 1px solid #333;
          padding: 5px 10px;
          font-size: 0.8rem;
          font-family: var(--font-code);
        }

        /* FOOTER */
        footer {
          border-top: 1px solid #333;
          padding: 50px 5%;
          margin-top: 100px;
          text-align: center;
        }

        .footer-address {
          font-family: var(--font-code);
          color: #666;
        }

        .footer-email {
          font-family: var(--font-code);
          color: var(--neon);
          margin-top: 10px;
        }

        .footer-copyright {
          margin-top: 50px;
          font-size: 0.8rem;
          opacity: 0.5;
        }

        /* LOGIN PAGE */
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .login-box {
          background: rgba(10, 10, 10, 0.9);
          padding: 50px;
          border: 1px solid var(--neon);
          width: 400px;
          text-align: center;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 10;
        }

        .mono {
          font-family: var(--font-code);
          color: var(--neon);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.8rem;
        }

        .input-field {
          width: 100%;
          background: #000;
          border: 1px solid #333;
          color: white;
          padding: 10px;
          margin-bottom: 15px;
          font-family: var(--font-body);
        }

        .input-field:focus {
          border-color: var(--neon);
          outline: none;
        }

        .return-link {
          display: block;
          margin-top: 20px;
          color: #666;
          text-decoration: none;
          font-family: var(--font-code);
          background: none;
          border: none;
          cursor: pointer;
        }

        /* ADMIN PAGE */
        .sidebar {
          width: 250px;
          background: rgba(0, 0, 0, 0.8);
          border-right: 1px solid #333;
          padding: 30px;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .nav-item {
          padding: 15px 0;
          color: #888;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: Share Tech Mono, monospace;
          font-size: 0.9rem;
        }
        
        .nav-item:hover,
        .nav-item.active {
          color: var(--neon);
          text-shadow: 0 0 10px var(--neon);
        }

        .main {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          position: relative;
          z-index: 5;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          border-bottom: 1px solid #333;
          padding-bottom: 20px;
        }
        
        header h2 {
          font-family: Teko, sans-serif;
          font-size: 3rem;
          line-height: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background: var(--panel);
          border: 1px solid #333;
          padding: 25px;
          border-left: 3px solid var(--neon);
        }
        
        .stat-val {
          font-family: Teko, sans-serif;
          font-size: 3.5rem;
          color: var(--neon);
          line-height: 1;
        }
        
        .stat-label {
          font-family: Share Tech Mono, monospace;
          font-size: 0.8rem;
          color: #fff;
        }

        .table-container {
          background: var(--panel);
          border: 1px solid #333;
          padding: 20px;
        }

        .table-title {
          font-family: Teko, sans-serif;
          font-size: 2rem;
          margin-bottom: 20px;
          color: white;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          text-align: left;
          padding: 15px;
          color: var(--neon);
          font-family: Share Tech Mono, monospace;
          font-size: 0.8rem;
          border-bottom: 1px solid #333;
        }
        
        td {
          padding: 15px;
          border-bottom: 1px solid #222;
        }

        .status {
          padding: 2px 8px;
          font-size: 0.7rem;
          font-weight: bold;
          font-family: Share Tech Mono, monospace;
        }
        
        .pending {
          border: 1px solid orange;
          color: orange;
        }
        
        .approved {
          border: 1px solid var(--neon);
          color: var(--neon);
        }

        .btn-action {
          background: transparent;
          border: 1px solid #555;
          color: white;
          padding: 5px 15px;
          cursor: pointer;
          font-family: Share Tech Mono, monospace;
        }
        
        .btn-action:hover {
          border-color: var(--neon);
          color: var(--neon);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .cursor-dot, .cursor-circle {
            display: none;
          }
          * {
            cursor: auto !important;
          }
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-visual {
            order: -1;
            margin-bottom: 40px;
          }
          .car-img {
            width: 90%;
            margin-left: 0;
            transform: none;
          }
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .span-2, .span-4 {
            grid-column: span 1;
          }
          .nav-items {
            display: none;
          }
          .agentica-card {
            flex-direction: column;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'admin' && <AdminPage />}
    </div>
  );
};

export default NexSyncApp;