/**
 * NEXSYNC PLATFORM v2.5 - PRODUCTION RELEASE
 * Architecture: Component-Based Monolith
 * Visualization: Three.js WebGL Renderer
 * Styling: CSS-in-JS with CSS Variables & GPU Acceleration
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as THREE from "three";

/* --- 1. UTILITY: CUSTOM HOOKS --- */

// Hook for Scroll Reveal Animations
const useScrollReveal = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);
  return isVisible;
};

/* --- 2. 3D COMPONENT: V2X CONNECTIVITY SPHERE --- 
   Procedurally generates a network of nodes representing Smart Mobility Infrastructure */
const NetworkGlobe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // A. Scene Setup
    const scene = new THREE.Scene();
    // Heavy fog to blend the 3D object into the dark background seamlessly
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Retain quality on high-DPI
    container.appendChild(renderer.domElement);

    // B. Object Groups
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. The Core Infrastructure (Wireframe Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphere = new THREE.Mesh(geometry, material);
    mainGroup.add(sphere);

    // 2. The Data Nodes (Particle System representing Sensors/Lidar points)
    const particlesGeom = new THREE.BufferGeometry();
    const particleCount = 700;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      // Spread particles in a chaotic spherical cloud
      posArray[i] = (Math.random() - 0.5) * 7;
    }

    particlesGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xd1ff00, // BRAND NEON
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particlesGeom, particlesMat);
    mainGroup.add(particleMesh);

    // 3. The Network Lines (Representing V2V Communication)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xd1ff00,
      transparent: true,
      opacity: 0.04,
    });
    const lineGeo = new THREE.WireframeGeometry(
      new THREE.IcosahedronGeometry(2.0, 2)
    );
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(lines);

    // C. Animation Loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Technical Rotation
      mainGroup.rotation.y += 0.002;
      mainGroup.rotation.x += 0.0005;

      // Breathing/Pulse Effect
      const time = Date.now() * 0.001;
      lines.scale.setScalar(1 + Math.sin(time) * 0.03);
      particleMesh.rotation.y = -time * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // D. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      if (container && renderer.domElement)
        container.removeChild(renderer.domElement);
      // Memory Cleanup
      geometry.dispose();
      material.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-canvas-wrapper" />;
};

<<<<<<< HEAD
/* --- 3. UI SUB-COMPONENTS (UPDATED) --- */
=======
/* --- 3. UI SUB-COMPONENTS --- */
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821

const Navbar = ({ scrolled, setPage }) => (
  <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
    <div className="nav-brand hover-trigger">
<<<<<<< HEAD
      {/* Removed the dot as requested previously */}
      NEX<span className="brand-accent">SYNC</span>
    </div>
    <div className="nav-menu">
      <a href="#home" className="nav-link hover-trigger">
        Home
      </a>
      <a href="#about" className="nav-link hover-trigger">
        About
=======
      NEX<span className="brand-accent">SYNC</span>.
    </div>
    <div className="nav-menu">
      <a href="#about" className="nav-link hover-trigger">
        Mission
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
      </a>
      <a href="#events" className="nav-link hover-trigger">
        Events
      </a>
<<<<<<< HEAD
      {/* Link to the "System Builds" section */}
      <a href="#projects" className="nav-link hover-trigger">
        Project
      </a>
      <a href="#team" className="nav-link hover-trigger">
        Team
      </a>
      {/* Link to the "Establish Connection" section */}
      <a href="#contact-nexus" className="nav-link hover-trigger">
        Contact
      </a>
    </div>
  </nav>
);
=======
      <a href="#projects" className="nav-link hover-trigger">
        Projects
      </a>
      <a href="#team" className="nav-link hover-trigger">
        Personnel
      </a>
    </div>
    <div className="nav-auth">
      <button
        className="btn-icon hover-trigger"
        onClick={() => setPage("login")}
      >
        <i className="fas fa-fingerprint"></i> LOGIN
      </button>
    </div>
  </nav>
);

>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
const Hero = () => (
  <section className="hero-section">
    <div className="hero-grid">
      <div className="hero-content">
        <div
          className="status-badge fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="led-indicator"></span> SYSTEM ONLINE /// V.2.0.26
        </div>

        <h1
          className="hero-title fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          NEXSYNC
          <span className="hero-subtitle">SMART MOBILITY LAB</span>
        </h1>

        <p className="hero-brief fade-in-up" style={{ animationDelay: "0.3s" }}>
          We are the R&D node for autonomous systems at IIIT Sri City.
          Integrating <strong>V2X Protocols</strong>,{" "}
          <strong>Sensor Fusion</strong>, and <strong>Deep Learning</strong> to
          architect the future of transport.
        </p>

        <div
          className="hero-cta-group fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a href="#projects" className="btn btn-primary hover-trigger">
<<<<<<< HEAD
            <span>Explore Projects</span>
          </a>
          <a href="#team" className="btn btn-secondary hover-trigger">
            <span>Meet the Team</span>
=======
            <span>ACCESS PROJECTS</span>
          </a>
          <a href="#contact" className="btn btn-secondary hover-trigger">
            <span>JOIN NETWORK</span>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
          </a>
        </div>

        <div
          className="hero-metrics fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="metric">
            <span className="metric-val">50+</span>
<<<<<<< HEAD
            <span className="metric-label">Active members</span>
          </div>
          <div className="metric">
            <span className="metric-val">5+</span>
            <span className="metric-label">Innovation projects</span>
=======
            <span className="metric-label">ACTIVE NODES</span>
          </div>
          <div className="metric">
            <span className="metric-val">12ms</span>
            <span className="metric-label">LATENCY</span>
          </div>
          <div className="metric">
            <span className="metric-val">L4</span>
            <span className="metric-label">AUTONOMY</span>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
          </div>
        </div>
      </div>

      <div className="hero-visual fade-in">
<<<<<<< HEAD
=======
        {/* 3D Component Mounted Here */}
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
        <NetworkGlobe />
        <div className="visual-overlay"></div>
      </div>
    </div>
  </section>
);

const About = () => {
  const ref = useRef();
  const isVisible = useScrollReveal(ref);

  return (
    <section
      id="about"
      ref={ref}
      className={`content-section ${isVisible ? "visible" : ""}`}
    >
      <div className="section-header">
        <span className="section-label">01 /// DIRECTIVES</span>
        <h2 className="section-title">Mission Profile</h2>
      </div>

<<<<<<< HEAD
      <div className="events-grid">
        {/* Box 1: About NexSync (Featured) */}
        <div className="event-card featured hover-lift">
          <div className="scan-line"></div>
          <div className="event-status">
            <span className="blink-dot"></span> STATUS: ACTIVE
          </div>
          <div className="event-body">
            <h3 className="glitch-text-sm">ABOUT NEXSYNC</h3>
            <p className="event-desc">
              NexSync is the Smart Mobility Club at IIIT Sri City, focusing on integrating 
              transportation systems with V2V/V2I communication, IoT sensors for ADAS, 
              UAVs, and machine learning for autonomous systems.
            </p>
            <div className="event-meta">
              <div className="meta-item">
                <i className="fas fa-microchip"></i> SMART MOBILITY
              </div>
              <div className="meta-item highlight">
                <i className="fas fa-network-wired"></i> IIIT SRI CITY
              </div>
            </div>
            {/* Learn more button removed as requested */}
          </div>
        </div>

        {/* Box 2 & 3: Mission and Joining (Compact) */}
        <div className="event-group">
          {/* OUR MISSION */}
          <div className="event-card compact hover-lift">
            <div className="card-badge" style={{color: 'var(--neon)', borderColor: 'var(--neon)'}}>MISSION</div>
            <div className="event-body">
              <h3>OUR MISSION</h3>
              <p>Accelerating the adoption of intelligent mobility by empowering students to innovate in autonomous driving.</p>
              <div className="meta-item dim">FOCUS: INNOVATION & IMPACT</div>
            </div>
          </div>

          {/* WHY JOIN */}
          <div className="event-card compact hover-lift">
            <div className="card-badge">JOINING</div>
            <div className="event-body">
              <h3>WHY JOIN NEXSYNC?</h3>
              <p>Hands-on projects in AI and IoT, industry networking, and shaping the future of smart mobility.</p>
              <div className="meta-item dim">STATUS: OPEN FOR MEMBERS</div>
            </div>
=======
      <div className="bento-grid">
        <div className="bento-card span-4 hover-lift">
          <div className="card-bg-icon">
            <i className="fas fa-network-wired"></i>
          </div>
          <div className="card-content">
            <div className="icon-box">
              <i className="fas fa-satellite-dish"></i>
            </div>
            <h3>The Core Directive</h3>
            <p>
              NexSync bridges the gap between theoretical algorithms and asphalt
              reality. We don't just build code; we deploy systems that see,
              think, and drive. Our focus spans from{" "}
              <strong>Embedded IoT Clusters</strong> to{" "}
              <strong>Crowd Density Analytics</strong>.
            </p>
          </div>
        </div>
        <div className="bento-card span-2 hover-lift">
          <div className="card-content">
            <div className="icon-box">
              <i className="fas fa-microchip"></i>
            </div>
            <h3>Embedded Systems</h3>
            <p>
              Hardware deployment for ADAS using ESP32, Jetson Nano, and LiDAR
              integration.
            </p>
          </div>
        </div>
        <div className="bento-card span-2 hover-lift">
          <div className="card-content">
            <div className="icon-box">
              <i className="fas fa-eye"></i>
            </div>
            <h3>Computer Vision</h3>
            <p>
              Real-time path planning and object detection using YOLO v8 and
              OpenCV.
            </p>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
          </div>
        </div>
      </div>
    </section>
  );
};

const Events = () => {
  const ref = useRef();
  const isVisible = useScrollReveal(ref);

  return (
    <section
      id="events"
      ref={ref}
      className={`content-section ${isVisible ? "visible" : ""}`}
    >
      <div className="section-header">
        <span className="section-label">02 /// OPERATIONS</span>
        <h2 className="section-title">Event Logs</h2>
      </div>

      <div className="events-grid">
<<<<<<< HEAD
        {/* Event 1: INNO VENTURES */}
        <div className="event-card hover-lift">
          <div className="event-status">
            Hackathon
          </div>
          <div className="event-body">
            <h3>INNO VENTURES</h3>
            <p className="event-desc">
              Innovation challenge focused on AIML in Transportation. Design, Innovation and 
              Entrepreneurship theme with Rs.10000 prize pool.
            </p>
            <div className="event-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i> November 9-15, 2024
              </div>
              <div className="meta-item">
                <i className="fas fa-hourglass-half"></i> 7 Days
              </div>
              <div className="meta-item highlight">
                <i className="fas fa-map-marker-alt"></i> IIIT Sri City
              </div>
              <div className="meta-item">
                <i className="fas fa-users"></i> 24 registered
              </div>
            </div>
          </div>
        </div>

        {/* Event 2: LOGO VENTURES */}
        <div className="event-card hover-lift">
          <div className="event-status">
            Event
          </div>
          <div className="event-body">
            <h3>LOGO VENTURES</h3>
            <p className="event-desc">Design competition with Rs. 1000 prize pool</p>
            <div className="event-meta">
              <div className="meta-item"><i className="fas fa-calendar"></i> November 9-15, 2024</div>
              <div className="meta-item"><i className="fas fa-hourglass-half"></i> 7 Days</div>
              <div className="meta-item highlight"><i className="fas fa-map-marker-alt"></i> IIIT Sri City</div>
              <div className="meta-item"><i className="fas fa-users"></i> 13 registered</div>
            </div>
          </div>
        </div>

        {/* Event 3: AGETICA */}
        <div className="event-card hover-lift">
          <div className="event-status">
            Hackathon
          </div>
          <div className="event-body">
            <h3>AGETICA</h3>
            <p className="event-desc">Part of ABHISARGA '26. Free registration with Rs. 2.25 Lakh prize pool and internship opportunities for winners.</p>
            <div className="event-meta">
              <div className="meta-item"><i className="fas fa-calendar"></i> February 27 - March 2, 2025</div>
              <div className="meta-item"><i className="fas fa-clock"></i> 5:00 PM - 8:00 AM</div>
              <div className="meta-item highlight"><i className="fas fa-map-marker-alt"></i> IIIT Sri City</div>
              <div className="meta-item"><i className="fas fa-users"></i> 867 registered</div>
=======
        {/* Featured Event */}
        <div className="event-card featured hover-lift">
          <div className="scan-line"></div>
          <div className="event-status">
            <span className="blink-dot"></span> REGISTRATION ACTIVE
          </div>
          <div className="event-body">
            <h3 className="glitch-text-sm">AGENTICA</h3>
            <p className="event-desc">
              The Ultimate AI Agent Mobility Challenge. Part of Abhisarga '26.
            </p>
            <div className="event-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i> FEB 27 - MAR 2
              </div>
              <div className="meta-item highlight">
                <i className="fas fa-trophy"></i> ₹2.25 LAKH POOL
              </div>
            </div>
            <button className="btn-text hover-trigger">
              INITIALIZE REGISTRATION <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Past Events */}
        <div className="event-group">
          <div className="event-card compact hover-lift">
            <div className="card-badge">COMPLETED</div>
            <div className="event-body">
              <h3>Inno Ventures</h3>
              <p>AIML in Transportation Design Challenge.</p>
              <div className="meta-item dim">Winner Prize: ₹10k</div>
            </div>
          </div>
          <div className="event-card compact hover-lift">
            <div className="card-badge">COMPLETED</div>
            <div className="event-body">
              <h3>Logo Ventures</h3>
              <p>Identity Design for Future Mobility Systems.</p>
              <div className="meta-item dim">Winner Prize: ₹1k</div>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const ref = useRef();
  const isVisible = useScrollReveal(ref);

  return (
    <section
      id="projects"
      ref={ref}
      className={`content-section ${isVisible ? "visible" : ""}`}
    >
      <div className="section-header">
        <span className="section-label">03 /// R&D LOGS</span>
        <h2 className="section-title">System Builds</h2>
      </div>

      <div className="projects-table">
        <div className="table-header">
          <span>ID</span>
          <span>PROJECT NAME</span>
          <span>TECH STACK</span>
          <span>STATUS</span>
        </div>

        <div className="table-row hover-bg hover-trigger">
          <span className="p-id">SYS-01</span>
          <div className="p-info">
            <h4>GeoGuide</h4>
            <span>Routing & Discovery Assistant</span>
          </div>
          <div className="p-stack">
            <span className="pill">FLASK</span>
            <span className="pill">SQL</span>
            <span className="pill">REACT</span>
          </div>
          <div className="p-status done">COMPLETED</div>
        </div>

        <div className="table-row hover-bg hover-trigger">
          <span className="p-id">SYS-02</span>
          <div className="p-info">
            <h4>Crowd Density AI</h4>
            <span>CV-based Safety Analytics</span>
          </div>
          <div className="p-stack">
            <span className="pill">YOLO</span>
            <span className="pill">OPENCV</span>
            <span className="pill">PYTHON</span>
          </div>
          <div className="p-status wip">IN PROGRESS</div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const ref = useRef();
  const isVisible = useScrollReveal(ref);

  // --- DATA CONFIGURATION ---
  // Replace 'imgUrl' with your actual file paths (e.g., "/images/prathiba.jpg")
  const coreCommittee = [
<<<<<<< HEAD
    { name: "PRATHIBA RAVI", role: "UG3 // CORE", imgUrl: null, linkedIn: "https://www.linkedin.com/in/prathiba-ravi-b85497295/" },
    { name: "CEFAN S S", role: "UG2 // CORE", imgUrl: null, linkedIn: "https://www.linkedin.com/in/cefan-s-s-a4b591324/" },
    { name: "MOHAMMAD SHAZIL", role: "UG2 // CORE", imgUrl: null, linkedIn: "https://www.linkedin.com/in/mohammad-shazil-a96123325/" },
    { name: "DHARUN PRASAD", role: "UG2 // CORE", imgUrl: null, linkedIn: "https://www.linkedin.com/in/dharun-prasad-620943310/" },
    { name: "K NIKIL PRASANNAA", role: "UG2 // CORE", imgUrl: null, linkedIn: "https://www.linkedin.com/in/k-nikil-prasannaa/" },
  ];

  const domainLeads = [
    { name: "SRIMAN SOMA", role: "AI/ML LEAD", imgUrl: null, linkedIn: "https://www.linkedin.com/in/sriman-soma-91b19b306/" },
    { name: "GOUTAM BOPPANA", role: "DATA LEAD", imgUrl: null, linkedIn: "https://www.linkedin.com/in/goutam-boppana-3b2ab8285/" },
=======
    { name: "PRATHIBA RAVI", role: "UG3 // CORE", imgUrl: null },
    { name: "CEFAN S S", role: "UG2 // CORE", imgUrl: null },
    { name: "MOHAMMAD SHAZIL", role: "UG2 // CORE", imgUrl: null },
    { name: "DHARUN PRASAD", role: "UG2 // CORE", imgUrl: null },
    { name: "K NIKIL PRASANNAA", role: "UG2 // CORE", imgUrl: null },
  ];

  const domainLeads = [
    { name: "SRIMAN SOMA", role: "AI/ML LEAD", imgUrl: null },
    { name: "GOUTAM BOPPANA", role: "DATA LEAD", imgUrl: null },
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
    { name: "MANO RANJAN E", role: "ELEC LEAD", imgUrl: null },
    { name: "MUTHURAJA S", role: "UI/UX LEAD", imgUrl: null },
    { name: "STALIN V", role: "PR LEAD", imgUrl: null },
  ];

  return (
    <section
      id="team"
      ref={ref}
      className={`content-section ${isVisible ? "visible" : ""}`}
    >
      <div className="section-header">
        <span className="section-label">04 /// PERSONNEL</span>
        <h2 className="section-title">Command Structure</h2>
      </div>

      {/* 1. CLUB LEADS (Highlight Cards) */}
      <div className="leads-wrapper" style={{ marginBottom: "80px" }}>
<<<<<<< HEAD
        <a href="https://www.linkedin.com/in/adithya-ram-s-514a6528a/" target="_blank" rel="noopener noreferrer" className="lead-card hover-lift hover-trigger" aria-label="ADITHYA RAM S LinkedIn">
          <div className="lead-visual">
             {/* Put Club Lead Photo Here */}
            <img src="https://placehold.co/400x500/111/333?text=LEAD" alt="ADITHYA RAM S" style={{width:'100%', height:'100%', objectFit:'cover'}} />
=======
        <div className="lead-card hover-lift hover-trigger">
          <div className="lead-visual">
             {/* Put Club Lead Photo Here */}
            <img src="https://placehold.co/400x500/111/333?text=LEAD" alt="Lead" style={{width:'100%', height:'100%', objectFit:'cover'}} />
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
            <div className="lead-overlay"></div>
          </div>
          <div className="lead-data">
            <h5>ADITHYA RAM S</h5>
            <span className="role">CLUB LEAD // UG3</span>
          </div>
<<<<<<< HEAD
        </a>
        <a href="https://www.linkedin.com/in/dhyaneshvar-k/" target="_blank" rel="noopener noreferrer" className="lead-card hover-lift hover-trigg er" aria-label="DHYANESH LinkedIn">
          <div className="lead-visual">
            {/* Put Co-Lead Photo Here */}
            <img src="https://placehold.co/400x500/111/333?text=CO-LEAD" alt="DHYANESH" style={{width:'100%', height:'100%', objectFit:'cover'}} />
=======
        </div>
        <div className="lead-card hover-lift hover-trigger">
          <div className="lead-visual">
            {/* Put Co-Lead Photo Here */}
            <img src="https://placehold.co/400x500/111/333?text=CO-LEAD" alt="Co-Lead" style={{width:'100%', height:'100%', objectFit:'cover'}} />
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
            <div className="lead-overlay"></div>
          </div>
          <div className="lead-data">
            <h5>DHYANESH</h5>
            <span className="role">CO-LEAD // UG3</span>
          </div>
<<<<<<< HEAD
        </a>
=======
        </div>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
      </div>

      {/* 2. CORE COMMITTEE GRID */}
      <div className="roster-section" style={{ marginBottom: "60px" }}>
        <h3 className="subsection-header">
          <i className="fas fa-shield-alt"></i> CORE COMMITTEE
        </h3>
        <div className="members-grid">
          {coreCommittee.map((member, index) => (
<<<<<<< HEAD
            member.linkedIn ? (
              <a
                key={index}
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="member-card hover-lift hover-trigger"
                aria-label={`${member.name} LinkedIn`}
              >
                <div className="member-visual">
                  {/* Image Logic: Uses placeholder if imgUrl is null */}
                  <img 
                    src={member.imgUrl || `https://placehold.co/300x350/0a0a0a/333?text=${member.name.split(' ')[0]}`} 
                    alt={member.name} 
                  />
                  <div className="visual-scanline"></div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span className="member-role">{member.role}</span>
                </div>
              </a>
            ) : (
              <div key={index} className="member-card hover-lift hover-trigger">
                <div className="member-visual">
                  {/* Image Logic: Uses placeholder if imgUrl is null */}
                  <img 
                    src={member.imgUrl || `https://placehold.co/300x350/0a0a0a/333?text=${member.name.split(' ')[0]}`} 
                    alt={member.name} 
                  />
                  <div className="visual-scanline"></div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span className="member-role">{member.role}</span>
                </div>
              </div>
            )
=======
            <div key={index} className="member-card hover-lift hover-trigger">
              <div className="member-visual">
                {/* Image Logic: Uses placeholder if imgUrl is null */}
                <img 
                  src={member.imgUrl || `https://placehold.co/300x350/0a0a0a/333?text=${member.name.split(' ')[0]}`} 
                  alt={member.name} 
                />
                <div className="visual-scanline"></div>
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <span className="member-role">{member.role}</span>
              </div>
            </div>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
          ))}
        </div>
      </div>

      {/* 3. DOMAIN LEADS GRID */}
      <div className="roster-section">
        <h3 className="subsection-header">
          <i className="fas fa-code-branch"></i> DOMAIN LEADS
        </h3>
        <div className="members-grid">
          {domainLeads.map((member, index) => (
<<<<<<< HEAD
            member.linkedIn ? (
              <a
                key={index}
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="member-card hover-lift hover-trigger"
                aria-label={`${member.name} LinkedIn`}
              >
                <div className="member-visual">
                   {/* Image Logic */}
                  <img 
                    src={member.imgUrl || `https://placehold.co/300x350/0a0a0a/333?text=${member.name.split(' ')[0]}`} 
                    alt={member.name} 
                  />
                  <div className="visual-scanline"></div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span className="member-role">{member.role}</span>
                </div>
              </a>
            ) : (
              <div key={index} className="member-card hover-lift hover-trigger">
                <div className="member-visual">
                   {/* Image Logic */}
                  <img 
                    src={member.imgUrl || `https://placehold.co/300x350/0a0a0a/333?text=${member.name.split(' ')[0]}`} 
                    alt={member.name} 
                  />
                  <div className="visual-scanline"></div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span className="member-role">{member.role}</span>
                </div>
              </div>
            )
=======
            <div key={index} className="member-card hover-lift hover-trigger">
              <div className="member-visual">
                 {/* Image Logic */}
                <img 
                  src={member.imgUrl || `https://placehold.co/300x350/0a0a0a/333?text=${member.name.split(' ')[0]}`} 
                  alt={member.name} 
                />
                <div className="visual-scanline"></div>
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <span className="member-role">{member.role}</span>
              </div>
            </div>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
          ))}
        </div>
      </div>

    </section>
  );
};
const Footer = () => (
  <footer id="contact" style={{ marginTop: "100px", position: "relative" }}>
    {/* 1. Decorative Top Border with "System End" Badge */}
    <div
      style={{
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "center",
        transform: "translateY(-50%)",
      }}
    >
      <span
        style={{
          background: "var(--bg)",
          padding: "0 20px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-secondary)",
          letterSpacing: "2px",
        }}
      >
        /// END OF LINE
      </span>
    </div>

    <div
      className="footer-content"
      style={{
        padding: "80px 5% 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* 2. Main Identity Block */}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "6rem",
          lineHeight: "0.8",
          marginBottom: "10px",
          textTransform: "uppercase",
          letterSpacing: "-2px",
          background: "linear-gradient(180deg, #fff, #666)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        NexSync
      </h2>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--neon)",
          fontSize: "1rem",
          letterSpacing: "2px",
          marginBottom: "50px",
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        Smart Mobility Club at IIIT Sri City
      </p>

      {/* 3. The Tagline - Styled as a "Mission Statement" Box */}
      <div
        className="hover-lift"
        style={{
          border: "1px solid var(--border)",
          borderLeft: "4px solid var(--neon)",
          background: "rgba(255,255,255,0.02)",
          padding: "30px 40px",
          maxWidth: "700px",
          marginBottom: "60px",
          position: "relative",
          backdropFilter: "blur(5px)",
        }}
      >
        <i
          className="fas fa-quote-left"
          style={{
            position: "absolute",
            top: "-15px",
            left: "20px",
            background: "var(--bg)",
            padding: "0 10px",
            color: "var(--neon)",
          }}
        ></i>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            color: "#fff",
            fontSize: "1.4rem",
            fontWeight: "300",
            letterSpacing: "0.5px",
          }}
        >
          Driving Innovation Forward: Empowering the Future of Smart Mobility
        </h3>
      </div>

      {/* 4. Navigation - Styled as Terminal Links */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "50px",
          fontFamily: "var(--font-mono)",
        }}
      >
        {["Home", "About", "Events", "Team", "Contact"].map((item, index) => (
          <React.Fragment key={item}>
            {index > 0 && (
              <span style={{ color: "var(--border)", padding: "0 15px" }}>
                //
              </span>
            )}
            <a
              href={`#${
                item.toLowerCase() === "home" ? "" : item.toLowerCase()
              }`}
              className="hover-trigger"
              style={{
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--text-secondary)",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--neon)")}
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--text-secondary)")
              }
            >
              {item}
            </a>
          </React.Fragment>
        ))}
      </div>

      {/* 5. Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          width: "100%",
          paddingTop: "30px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            background: "var(--neon)",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
        © 2024 NexSync. All rights reserved.
      </div>
    </div>
  </footer>
);



const ContactSection = () => {
  const ref = useRef();
  const isVisible = useScrollReveal(ref);

  return (
    <section
      id="contact-nexus"
      ref={ref}
      className={`content-section ${isVisible ? "visible" : ""}`}
      style={{ paddingBottom: 0 }}
    >
      <div className="section-header">
        <span className="section-label">05 /// COMM-LINK</span>
        <h2 className="section-title">Establish Connection</h2>
      </div>

      <div className="contact-hud-grid">
        {/* LEFT: MAIN VISUAL & INTRO */}
        <div className="hud-panel main hover-lift">
            <div className="panel-decor-corner top-left"></div>
            <div className="panel-decor-corner bottom-right"></div>
            
            <div className="hud-status">
                <span className="blink-dot" style={{background: 'var(--neon)'}}></span> 
                CHANNEL_OPEN // ENCRYPTED
            </div>
            
            <h3 className="hud-title">
                READY TO <br />
                <span style={{color: 'var(--neon)'}}>COLLABORATE?</span>
            </h3>
            
            <p className="hud-text">
                Join the network. Whether for research collaboration, membership inquiries, or industrial partnership, our communication lines are active.
            </p>

            <div className="hud-action">
                <a href="mailto:nexsyncmotors.club@iiits.in" className="btn btn-primary hover-trigger">
                    <span>INITIATE PROTOCOL <i className="fas fa-paper-plane" style={{marginLeft:'10px'}}></i></span>
                </a>
            </div>
        </div>

        {/* RIGHT: DATA CARDS */}
        <div className="hud-right-col">
            
<<<<<<< HEAD
            {/* REPLACED: Single Smart Mobility Lab card (replaces LAB LOCATION + ACCESS HOURS) */}
            <div className="hud-card hover-lift hover-trigger">
              <div className="icon-badge">
                <i className="fas fa-flask"></i>
              </div>
              <div className="card-info">
                <h4 style={{letterSpacing: '0.18em', fontSize: '0.75rem', color: 'var(--muted)'}}>SMART MOBILITY LAB</h4>
                <p className="highlight" style={{fontSize: '1.5rem', marginTop: '0.25rem'}}>Academic Block - 1, Room No. 248</p>
                <p className="sub" style={{marginTop: '0.25rem'}}>Open 24/7 (Members only)</p>
                <p className="sub" style={{marginTop: '0.5rem', fontWeight: 600}}>Smart Mobility Lab access restricted to members</p>
              </div>
              <div className="status-pill warning">Members Only</div>
=======
            {/* CARD 1: LAB LOCATION */}
            <div className="hud-card hover-lift hover-trigger">
                <div className="icon-badge">
                    <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="card-info">
                    <h4>BASE_OF_OPS</h4>
                    <p className="highlight">Academic Block - 1, Room 248</p>
                    <p className="sub">IIIT Sri City, Andhra Pradesh</p>
                </div>
                <div className="status-pill">Active</div>
            </div>

            {/* CARD 2: ACCESS HOURS */}
            <div className="hud-card hover-lift hover-trigger">
                <div className="icon-badge">
                    <i className="fas fa-clock"></i>
                </div>
                <div className="card-info">
                    <h4>OPERATIONAL_HOURS</h4>
                    <p className="highlight">24/7 Access</p>
                    <p className="sub">Restricted to Members</p>
                </div>
                <div className="status-pill warning">Restricted</div>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
            </div>

            {/* CARD 3: CONTACT SPECS */}
            <div className="hud-card hover-lift hover-trigger">
                <div className="icon-badge">
                    <i className="fas fa-satellite"></i>
                </div>
                <div className="card-info">
                    <h4>DIRECT_LINE</h4>
                    <p className="highlight">+91 8825506227</p>
                    <p className="sub">nexsyncmotors.club@iiits.in</p>
                </div>
                <div className="status-pill">Online</div>
            </div>
        </div>
      </div>

      {/* --- NEW: SOCIAL TRANSMISSION BAR --- */}
      <div className="social-nexus-bar hover-lift">
          <div className="social-text">
              <h3>Follow Our Journey</h3>
              <p>Stay updated with our latest smart mobility innovations and events</p>
          </div>
          <div className="social-nodes">
<<<<<<< HEAD
                <a href="https://www.instagram.com/nexsync_iiits/?utm_source=ig_web_button_share_sheet#" className="social-node instagram hover-trigger" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/nexsync-iiits-6b698032b/" className="social-node linkedin hover-trigger" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
=======
              <a href="#" className="social-node instagram hover-trigger">
                  <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-node linkedin hover-trigger">
                  <i className="fab fa-linkedin-in"></i>
              </a>
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
              <a href="#" className="social-node twitter hover-trigger">
                  <i className="fab fa-twitter"></i>
              </a>
          </div>
          {/* Decorative background scanline */}
          <div className="scan-line-horizontal"></div>
      </div>

    </section>
  );
};
/* --- 4. AUTH & ADMIN PAGES --- */

const LoginPage = ({
  setPage,
  email,
  setEmail,
  pass,
  setPass,
  handleLogin,
}) => (
  <div className="login-wrapper fade-in">
    <div className="login-interface">
      <div className="login-header">
        <h2>SYSTEM ACCESS</h2>
        <p>/// IDENTITY VERIFICATION REQUIRED</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="email"
            placeholder="USER ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-key"></i>
          <input
            type="password"
            placeholder="ACCESS KEY"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login hover-trigger">
          AUTHENTICATE
        </button>
      </form>
      <button
        className="btn-back hover-trigger"
        onClick={() => setPage("home")}
      >
        ABORT SEQUENCE
      </button>
    </div>
  </div>
);

const AdminPage = ({ setPage }) => (
  <div className="admin-container fade-in">
    <div className="admin-sidebar">
      <div className="logo-text">NX_ADMIN</div>
      <div className="menu-list">
        <div className="menu-item active hover-trigger">
          <i className="fas fa-chart-pie"></i> DASHBOARD
        </div>
        <div className="menu-item hover-trigger">
          <i className="fas fa-users"></i> REQUESTS{" "}
          <span className="notif">3</span>
        </div>
        <div className="menu-item hover-trigger">
          <i className="fas fa-database"></i> LOGS
        </div>
      </div>
      <div
        className="menu-item logout hover-trigger"
        onClick={() => setPage("home")}
      >
        <i className="fas fa-power-off"></i> TERMINATE
      </div>
    </div>
    <div className="admin-content">
      <header className="admin-header">
        <h2>SYSTEM COMMAND</h2>
        <div className="user-profile">ADITHYA RAM [ADMIN]</div>
      </header>

      <div className="stats-deck">
        <div className="stat-card hover-trigger">
          <h3>867</h3>
          <p>AGENTICA REGISTRATIONS</p>
        </div>
        <div className="stat-card hover-trigger">
          <h3>24</h3>
          <p>ACTIVE PERSONNEL</p>
        </div>
        <div className="stat-card hover-trigger">
          <h3>98%</h3>
          <p>SERVER UPTIME</p>
        </div>
      </div>

      <div className="data-panel">
        <h3>PENDING APPROVALS</h3>
        <div className="data-table-admin">
          <div className="row header">
            <span>NAME</span>
            <span>PROJECT</span>
            <span>SKILLSET</span>
            <span>ACTION</span>
          </div>
          <div className="row hover-trigger">
            <span>Rohan Kumar</span>
            <span>Density AI</span>
            <span>Python, OpenCV</span>
            <button className="btn-xs">REVIEW</button>
          </div>
          <div className="row hover-trigger">
            <span>Sneha P.</span>
            <span>GeoGuide</span>
            <span>React, Node</span>
            <button className="btn-xs">REVIEW</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- 5. MAIN CONTROLLER --- */

const NexSyncApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Cursor Physics Refs
  const cursorDotRef = useRef(null);
  const cursorCircleRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // A. Scroll Listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // B. Physics-Based Cursor Logic (LERP)
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    // Track mouse position
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot moves instantly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Animation Loop for Circle (Lag Effect)
    const animateCursor = () => {
      // LERP: Move circle 15% of the way to the mouse position every frame
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;

      if (cursorCircleRef.current) {
        cursorCircleRef.current.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
      }
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    // Attach hover listeners dynamically
    const addListeners = () => {
      const triggers = document.querySelectorAll(
        "a, button, .hover-trigger, .hover-lift"
      );
      triggers.forEach((t) => {
        t.addEventListener("mouseenter", onMouseEnter);
        t.addEventListener("mouseleave", onMouseLeave);
      });
      return triggers;
    };

    window.addEventListener("mousemove", onMouseMove);
    const triggers = addListeners();

    // Re-bind if DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      triggers.forEach((t) => {
        t.removeEventListener("mouseenter", onMouseEnter);
        t.removeEventListener("mouseleave", onMouseLeave);
      });
      observer.disconnect();
    };
  }, [currentPage]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.toLowerCase().includes("admin")) {
      setCurrentPage("admin");
    } else {
      alert("ACCESS DENIED. INVALID CREDENTIALS.");
    }
  };

  return (
    <div className="app-root">
      {/* GLOBAL LAYERS */}
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div
        ref={cursorCircleRef}
        className={`cursor-circle ${isHovering ? "expanded" : ""}`}
      ></div>
      <div className="noise-texture"></div>

      {currentPage === "home" && (
        <div className="main-layout">
          <Navbar scrolled={scrolled} setPage={setCurrentPage} />
          <Hero />
          <About />
          <Events />
          <Projects />
          <Team />
          <ContactSection />
          <Footer />
        </div>
      )}

      {currentPage === "login" && (
        <LoginPage
          setPage={setCurrentPage}
          email={loginEmail}
          setEmail={setLoginEmail}
          pass={loginPassword}
          setPass={setLoginPassword}
          handleLogin={handleLogin}
        />
      )}

      {currentPage === "admin" && <AdminPage setPage={setCurrentPage} />}

      {/* --- STYLES --- */}
      <style>{`
            /* IMPORTS */
            @import url('https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

            /* TOKENS */
            :root {
                --neon: #d1ff00;
                --neon-dim: rgba(209, 255, 0, 0.15);
                --bg: #050505;
                --surface: #0a0a0a;
                --surface-highlight: #111111;
                --border: rgba(255, 255, 255, 0.1);
                --text: #ffffff;
                --text-secondary: #888888;
                --font-display: 'Teko', sans-serif;
                --font-body: 'Space Grotesk', sans-serif;
                --font-mono: 'JetBrains Mono', monospace;
                --ease: cubic-bezier(0.23, 1, 0.32, 1);
            }

            /* RESET */
            * { box-sizing: border-box; cursor: none; margin: 0; padding: 0; }
            html { scroll-behavior: smooth; }
            body { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; line-height: 1.6; }
            a { text-decoration: none; color: inherit; }
            button { cursor: none; font-family: inherit; }
            ul { list-style: none; }

            /* UTILS */
            .app-root { position: relative; min-height: 100vh; }
            .fade-in { animation: fadeIn 1s var(--ease) forwards; opacity: 0; }
            .fade-in-up { animation: fadeInUp 1s var(--ease) forwards; opacity: 0; transform: translateY(30px); }
            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

            .noise-texture {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9000;
                opacity: 0.03;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            }

            /* CURSOR */
            .cursor-dot { position: fixed; width: 6px; height: 6px; background: var(--neon); border-radius: 50%; pointer-events: none; z-index: 10000; top: 0; left: 0; margin: -3px 0 0 -3px; }
            .cursor-circle { 
                position: fixed; width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.5); border-radius: 50%; 
                pointer-events: none; z-index: 9999; top: 0; left: 0; margin: -20px 0 0 -20px;
                transition: width 0.3s var(--ease), height 0.3s var(--ease), background 0.3s;
                mix-blend-mode: difference;
            }
            .cursor-circle.expanded { width: 80px; height: 80px; margin: -40px 0 0 -40px; background: rgba(255,255,255,0.1); border-color: transparent; }

            /* NAVBAR */
            .navbar { position: fixed; top: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 30px 5%; z-index: 1000; transition: all 0.4s var(--ease); }
            .navbar.scrolled { background: rgba(5, 5, 5, 0.8); backdrop-filter: blur(12px); padding: 15px 5%; border-bottom: 1px solid var(--border); }
            .nav-brand { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; letter-spacing: 1px; }
            .brand-accent { color: var(--neon); }
            .nav-menu { display: flex; gap: 40px; background: rgba(255,255,255,0.03); padding: 12px 40px; border-radius: 100px; border: 1px solid var(--border); backdrop-filter: blur(10px); }
            .nav-link { font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); transition: color 0.3s; position: relative; }
            .nav-link:hover { color: var(--text); }
            .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0%; height: 1px; background: var(--neon); transition: width 0.3s var(--ease); }
            .nav-link:hover::after { width: 100%; }
            .btn-icon { background: transparent; border: 1px solid var(--border); color: var(--text-secondary); padding: 10px 20px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.8rem; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
            .btn-icon:hover { border-color: var(--neon); color: var(--neon); }

            /* HERO */
            .hero-section { height: 100vh; min-height: 700px; padding: 0 5%; display: flex; align-items: center; position: relative; overflow: hidden; }
            .hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; width: 100%; max-width: 1400px; margin: 0 auto; align-items: center; z-index: 10; }
            .status-badge { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon); border: 1px solid var(--neon-dim); padding: 6px 12px; background: rgba(209,255,0,0.05); margin-bottom: 25px; }
            .led-indicator { width: 6px; height: 6px; background: var(--neon); border-radius: 50%; box-shadow: 0 0 8px var(--neon); animation: pulse 2s infinite; }
            @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
            
            .hero-title { font-family: var(--font-display); font-size: 6.5rem; line-height: 0.9; margin-bottom: 20px; }
            .hero-subtitle { display: block; font-family: var(--font-body); font-weight: 300; font-size: 2rem; color: var(--text-secondary); letter-spacing: 4px; margin-top: 5px; }
            .hero-brief { font-size: 1.1rem; color: #ccc; max-width: 500px; margin-bottom: 40px; }
            .hero-cta-group { display: flex; gap: 20px; margin-bottom: 60px; }
            .btn { padding: 15px 35px; font-family: var(--font-mono); font-weight: 700; font-size: 0.9rem; letter-spacing: 1px; position: relative; overflow: hidden; border: none; transition: transform 0.2s; }
            .btn-primary { background: var(--neon); color: black; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
            .btn-primary:hover { box-shadow: 0 0 30px var(--neon-dim); transform: translateY(-2px); }
            .btn-secondary { background: transparent; color: white; border: 1px solid var(--border); }
            .btn-secondary:hover { background: rgba(255,255,255,0.05); border-color: white; }
            
            .hero-metrics { display: flex; gap: 50px; border-top: 1px solid var(--border); padding-top: 30px; }
            .metric { display: flex; flex-direction: column; }
            .metric-val { font-family: var(--font-display); font-size: 2.5rem; line-height: 1; }
            .metric-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-secondary); }
            
            .hero-visual { position: relative; height: 80vh; width: 100%; display: flex; align-items: center; justify-content: center; }
            .three-canvas-wrapper { width: 100%; height: 100%; }
            .visual-overlay { position: absolute; bottom: 0; left: 0; width: 100%; height: 30%; background: linear-gradient(to top, var(--bg), transparent); pointer-events: none; }

            /* SECTIONS */
            .content-section { padding: 140px 5%; max-width: 1400px; margin: 0 auto; opacity: 0; transform: translateY(50px); transition: all 1s var(--ease); }
            .content-section.visible { opacity: 1; transform: translateY(0); }
            .section-header { margin-bottom: 70px; border-left: 3px solid var(--neon); padding-left: 30px; }
            .section-label { font-family: var(--font-mono); color: var(--neon); font-size: 0.8rem; letter-spacing: 2px; display: block; margin-bottom: 10px; }
            .section-title { font-family: var(--font-display); font-size: 4rem; line-height: 1; text-transform: uppercase; }

            /* BENTO */
            .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
            .bento-card { background: var(--surface); border: 1px solid var(--border); padding: 40px; position: relative; overflow: hidden; transition: 0.4s var(--ease); display: flex; flex-direction: column; justify-content: flex-end; min-height: 320px; }
            .bento-card:hover { transform: translateY(-10px); border-color: var(--neon); }
            .span-4 { grid-column: span 4; } .span-2 { grid-column: span 2; }
            .card-bg-icon { position: absolute; top: -20px; right: -20px; font-size: 15rem; color: rgba(255,255,255,0.02); pointer-events: none; }
            .icon-box { width: 60px; height: 60px; background: rgba(255,255,255,0.05); display: grid; place-items: center; font-size: 1.5rem; color: var(--neon); margin-bottom: 25px; border-radius: 50%; }
            .bento-card h3 { font-family: var(--font-display); font-size: 2.2rem; margin-bottom: 15px; }
            .bento-card p { color: var(--text-secondary); font-size: 1.1rem; max-width: 600px; }

            /* EVENTS */
<<<<<<< HEAD
            .events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
            .event-card { background: var(--surface); border: 1px solid var(--border); padding: 40px; position: relative; overflow: hidden; transition: 0.4s; min-height: 450px; display: flex; flex-direction: column; }
            .event-card.featured { background: linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%); border: 1px solid var(--neon); }
            .event-card:hover { background: var(--surface-highlight); transform: translateY(-5px); border-color: var(--neon); }
            .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--neon); opacity: 0.5; animation: scan 3s linear infinite; }
            @keyframes scan { 0% { top: 0; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
            .event-status { font-family: var(--font-mono); color: #888; font-size: 0.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; text-transform: uppercase; letter-spacing: 1px; }
            .event-card.featured .event-status { color: #ff4444; }
            .blink-dot { width: 8px; height: 8px; background: #666; border-radius: 50%; animation: none; }
            .event-card.featured .blink-dot { background: #ff4444; animation: blink 1s infinite; }
            @keyframes blink { 50% { opacity: 0; } }
            .glitch-text-sm { font-family: var(--font-display); font-size: 2.5rem; line-height: 1.1; margin-bottom: 15px; }
            .event-desc { font-size: 1rem; color: #ccc; margin-bottom: 30px; line-height: 1.5; flex-grow: 1; }
            .event-meta { display: flex; flex-direction: column; gap: 12px; margin-top: auto; margin-bottom: 0; font-family: var(--font-mono); font-size: 0.85rem; }
            .event-body h3 { font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 12px; }
            .meta-item.highlight { color: var(--neon); } .meta-item.dim { color: var(--text-secondary); margin-top: 0; }
            .btn-text { background: none; border: none; border-bottom: 1px solid var(--text); color: var(--text); padding-bottom: 5px; font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 1px; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
            .btn-text:hover { color: var(--neon); border-color: var(--neon); gap: 15px; }
            .event-group { display: contents; }
            .compact { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; }
            .card-badge { font-family: var(--font-mono); font-size: 0.7rem; padding: 5px 10px; border: 1px solid var(--border); display: inline-block; margin-bottom: 15px; color: var(--text-secondary); width: fit-content; }
=======
            .events-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; }
            .event-card { background: var(--surface); border: 1px solid var(--border); padding: 40px; position: relative; overflow: hidden; transition: 0.4s; }
            .event-card.featured { background: linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%); border: 1px solid var(--neon); }
            .event-card:hover { background: var(--surface-highlight); }
            .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--neon); opacity: 0.5; animation: scan 3s linear infinite; }
            @keyframes scan { 0% { top: 0; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
            .event-status { font-family: var(--font-mono); color: #ff4444; font-size: 0.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
            .blink-dot { width: 8px; height: 8px; background: #ff4444; border-radius: 50%; animation: blink 1s infinite; }
            @keyframes blink { 50% { opacity: 0; } }
            .glitch-text-sm { font-family: var(--font-display); font-size: 4.5rem; line-height: 0.9; margin-bottom: 15px; }
            .event-desc { font-size: 1.2rem; color: #ccc; margin-bottom: 30px; }
            .event-meta { display: flex; gap: 30px; margin-bottom: 30px; font-family: var(--font-mono); font-size: 0.9rem; }
            .meta-item.highlight { color: var(--neon); } .meta-item.dim { color: var(--text-secondary); margin-top: 10px; }
            .btn-text { background: none; border: none; border-bottom: 1px solid var(--text); color: var(--text); padding-bottom: 5px; font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 1px; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
            .btn-text:hover { color: var(--neon); border-color: var(--neon); gap: 15px; }
            .event-group { display: flex; flex-direction: column; gap: 30px; }
            .compact { flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .card-badge { font-family: var(--font-mono); font-size: 0.7rem; padding: 4px 8px; border: 1px solid var(--border); display: inline-block; margin-bottom: 15px; color: var(--text-secondary); }
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821

            /* PROJECTS */
            .projects-table { border-top: 1px solid var(--border); }
            .table-header { display: grid; grid-template-columns: 0.5fr 2fr 2fr 1fr; padding: 20px 0; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); }
            .table-row { display: grid; grid-template-columns: 0.5fr 2fr 2fr 1fr; padding: 30px 0; border-bottom: 1px solid var(--border); align-items: center; transition: 0.3s; }
            .table-row:hover { background: rgba(255,255,255,0.02); padding-left: 10px; }
            .p-id { font-family: var(--font-mono); color: var(--text-secondary); }
            .p-info h4 { font-size: 1.4rem; font-weight: 500; }
            .p-info span { font-size: 0.9rem; color: var(--text-secondary); }
            .p-stack { display: flex; gap: 10px; }
            .pill { font-family: var(--font-mono); font-size: 0.7rem; padding: 4px 10px; border: 1px solid var(--border); border-radius: 20px; }
            .p-status { font-family: var(--font-mono); font-size: 0.8rem; font-weight: bold; text-align: right; }
            .p-status.done { color: var(--neon); } .p-status.wip { color: orange; }

            /* TEAM */
            .leads-wrapper { display: flex; justify-content: center; gap: 50px; margin-bottom: 80px; }
            .lead-card { position: relative; width: 300px; text-align: center; }
            .lead-visual { width: 280px; height: 320px; background: var(--surface); border: 1px solid var(--border); margin: 0 auto 20px; position: relative; overflow: hidden; }
            .img-placeholder { width: 100%; height: 100%; background: #1a1a1a; }
            .lead-overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg), transparent); opacity: 0.6; }
            .lead-data h5 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 5px; }
            .lead-data .role { font-family: var(--font-mono); color: var(--neon); font-size: 0.8rem; }
            .roster-container { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; border-top: 1px solid var(--border); padding-top: 60px; }
            .roster-header { font-family: var(--font-display); font-size: 2rem; color: var(--text-secondary); margin-bottom: 30px; }
            .roster-list li { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.3s; font-family: var(--font-mono); font-size: 0.9rem; }
            .roster-list li:hover { padding-left: 10px; border-color: var(--border); }
            .roster-list .lead { color: var(--neon); } .roster-list .year { color: var(--text-secondary); }

            /* FOOTER */
            footer { background: #080808; padding: 100px 5% 30px; margin-top: 100px; border-top: 1px solid var(--border); }
            .footer-top { display: flex; justify-content: space-between; margin-bottom: 80px; max-width: 1400px; margin: 0 auto 80px; }
            .brand-block h2 { font-family: var(--font-display); font-size: 4rem; margin-bottom: 10px; }
            .brand-block p { color: var(--text-secondary); font-size: 1.2rem; }
            .contact-block { display: flex; gap: 60px; }
            .c-item { display: flex; flex-direction: column; gap: 10px; font-family: var(--font-mono); font-size: 0.9rem; }
            .c-item i { color: var(--neon); font-size: 1.2rem; }
            .c-item a:hover { color: var(--neon); }
            .footer-bottom { text-align: center; border-top: 1px solid var(--border); padding-top: 30px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary); }

            /* ADMIN & LOGIN */
            .login-wrapper, .admin-container { min-height: 100vh; display: flex; background: var(--bg); }
            .login-wrapper { align-items: center; justify-content: center; background: radial-gradient(circle at center, #111 0%, #000 70%); }
            .login-interface { width: 400px; padding: 50px; background: rgba(10,10,10,0.8); backdrop-filter: blur(20px); border: 1px solid var(--border); border-left: 4px solid var(--neon); }
            .login-header h2 { font-family: var(--font-display); font-size: 3rem; margin-bottom: 5px; }
            .login-header p { font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon); margin-bottom: 40px; }
            .input-group { display: flex; align-items: center; background: #000; border: 1px solid var(--border); margin-bottom: 20px; padding: 0 15px; }
            .input-group i { color: var(--text-secondary); font-size: 0.8rem; }
            .input-group input { width: 100%; padding: 15px; background: transparent; border: none; color: white; font-family: var(--font-mono); outline: none; }
            .btn-login { width: 100%; padding: 15px; background: var(--neon); border: none; font-weight: bold; margin-top: 10px; }
            .btn-back { width: 100%; padding: 15px; background: transparent; border: none; color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.75rem; margin-top: 10px; transition: 0.3s; }
            .btn-back:hover { color: white; }

            .admin-sidebar { width: 280px; background: #080808; border-right: 1px solid var(--border); padding: 40px 30px; display: flex; flex-direction: column; }
            .logo-text { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 60px; }
            .menu-list { display: flex; flex-direction: column; gap: 5px; }
            .menu-item { padding: 15px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 15px; border-radius: 4px; transition: 0.3s; }
            .menu-item.active, .menu-item:hover { background: rgba(255,255,255,0.03); color: white; }
            .menu-item.active { border-left: 2px solid var(--neon); }
            .notif { background: var(--neon); color: black; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; margin-left: auto; font-weight: bold; }
            .logout { margin-top: auto; color: #ff4444; }
            .admin-content { flex: 1; padding: 60px; overflow-y: auto; }
            .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
            .admin-header h2 { font-family: var(--font-display); font-size: 3rem; }
            .user-profile { font-family: var(--font-mono); font-size: 0.9rem; color: var(--neon); border: 1px solid var(--neon); padding: 5px 15px; }
            .stats-deck { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 60px; }
            .stat-card { background: var(--surface); padding: 30px; border: 1px solid var(--border); border-top: 3px solid var(--neon); }
            .stat-card h3 { font-family: var(--font-display); font-size: 4rem; margin: 0; line-height: 1; color: white; }
            .stat-card p { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); margin-top: 10px; }
            .data-panel h3 { font-family: var(--font-mono); color: var(--neon); font-size: 1rem; margin-bottom: 20px; }
            .data-table-admin { border: 1px solid var(--border); background: var(--surface); }
            .data-table-admin .row { display: grid; grid-template-columns: 1.5fr 1.5fr 1.5fr 1fr; padding: 20px; border-bottom: 1px solid var(--border); font-family: var(--font-mono); font-size: 0.9rem; align-items: center; }
            .data-table-admin .header { color: var(--text-secondary); font-size: 0.8rem; }
            .btn-xs { background: transparent; border: 1px solid var(--border); color: white; padding: 5px 15px; font-size: 0.7rem; transition: 0.3s; }
            .btn-xs:hover { border-color: var(--neon); color: var(--neon); }

            @media (max-width: 1024px) {
                .hero-grid { grid-template-columns: 1fr; text-align: center; }
                .hero-visual { height: 50vh; order: -1; }
                .hero-title { font-size: 4rem; }
                .hero-cta-group, .hero-metrics { justify-content: center; }
                .bento-grid, .events-grid, .projects-table .table-row, .roster-container, .footer-top { grid-template-columns: 1fr; }
                .span-4, .span-2 { grid-column: span 1; }
                .nav-menu { display: none; }
                .admin-container { flex-direction: column; }
                .admin-sidebar { width: 100%; height: auto; }
            }
/* --- CONTACT HUD STYLES --- */
.contact-hud-grid {
<<<<<<< HEAD
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  margin-bottom: 30px; /* Reduced margin to connect with social bar */
  align-items: stretch;
=======
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 30px;
    margin-bottom: 30px; /* Reduced margin to connect with social bar */
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
}

.hud-panel {
    background: linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.9) 100%);
    border: 1px solid var(--border);
    padding: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    backdrop-filter: blur(10px);
<<<<<<< HEAD
    min-height: 450px;
=======
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
}

.panel-decor-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--neon);
    transition: 0.3s;
}
.panel-decor-corner.top-left { top: -1px; left: -1px; border-right: none; border-bottom: none; }
.panel-decor-corner.bottom-right { bottom: -1px; right: -1px; border-left: none; border-top: none; }
.hud-panel:hover .panel-decor-corner { width: 100%; height: 100%; opacity: 0.1; }

.hud-status {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--neon);
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: 2px;
}

.hud-title {
    font-family: var(--font-display);
    font-size: 3.5rem;
    line-height: 0.9;
    margin-bottom: 25px;
    color: white;
}

.hud-text {
    font-family: var(--font-body);
    color: var(--text-secondary);
    font-size: 1.1rem;
    max-width: 90%;
    margin-bottom: 40px;
}

.hud-right-col {
<<<<<<< HEAD
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: flex-start;
}

.hud-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-left: 2px solid transparent;
  padding: 48px 52px;
  display: flex;
  align-items: center;
  gap: 32px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
=======
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.hud-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-left: 2px solid transparent;
    padding: 25px 30px;
    display: flex;
    align-items: center;
    gap: 25px;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
}

.hud-card:hover {
    background: rgba(209, 255, 0, 0.05);
    border-color: var(--neon);
    border-left-width: 6px;
    transform: translateX(10px);
}

.icon-badge {
<<<<<<< HEAD
  width: 80px;
  height: 80px;
  background: #000;
  border: 1px solid var(--border);
  color: var(--neon);
  display: grid;
  place-items: center;
  font-size: 2rem;
  border-radius: 6px;
  flex-shrink: 0;
=======
    width: 50px;
    height: 50px;
    background: #000;
    border: 1px solid var(--border);
    color: var(--neon);
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    border-radius: 4px;
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
}

.card-info { flex: 1; }
.card-info h4 {
    font-family: var(--font-mono);
<<<<<<< HEAD
    font-size: 0.85rem;
    color: var(--text-secondary);
    letter-spacing: 1px;
    margin-bottom: 8px;
}
.card-info .highlight {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: white;
  line-height: 1;
}
.card-info .sub {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #888;
    margin-top: 4px;
}
.status-pill {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 6px 12px;
=======
    font-size: 0.75rem;
    color: var(--text-secondary);
    letter-spacing: 1px;
    margin-bottom: 5px;
}
.card-info .highlight {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: white;
    line-height: 1;
}
.card-info .sub {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #666;
    margin-top: 2px;
}
.status-pill {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    padding: 4px 8px;
>>>>>>> 8d5cda0b27898ceff5ce8c0d3e12cffdc891a821
    border: 1px solid var(--neon);
    color: var(--neon);
    text-transform: uppercase;
    letter-spacing: 1px;
}
.status-pill.warning { border-color: orange; color: orange; }

/* --- SOCIAL TRANSMISSION BAR --- */
.social-nexus-bar {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.social-text h3 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: white;
    line-height: 1;
    margin-bottom: 5px;
}

.social-text p {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.social-nodes {
    display: flex;
    gap: 20px;
    z-index: 2;
}

.social-node {
    width: 60px;
    height: 60px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    color: var(--text-secondary);
    border-radius: 50%; /* Circular as per screenshot */
    transition: 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
}

.social-node:hover {
    color: #000;
    border-color: var(--neon);
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 0 20px var(--neon-dim);
}

/* Specific Brand Colors on Hover */
.social-node:hover { background: var(--neon); }
.social-node.instagram:hover { background: #E1306C; color: white; border-color: #E1306C; box-shadow: 0 0 20px rgba(225, 48, 108, 0.5); }
.social-node.linkedin:hover { background: #0077b5; color: white; border-color: #0077b5; box-shadow: 0 0 20px rgba(0, 119, 181, 0.5); }
.social-node.twitter:hover { background: #1DA1F2; color: white; border-color: #1DA1F2; box-shadow: 0 0 20px rgba(29, 161, 242, 0.5); }

.scan-line-horizontal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, rgba(209,255,0,0.05) 50%, transparent 100%);
    transform: translateX(-100%);
    animation: scanHorizontal 4s linear infinite;
    pointer-events: none;
}
@keyframes scanHorizontal {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@media (max-width: 1024px) {
    .contact-hud-grid { grid-template-columns: 1fr; }
    .hud-panel { text-align: center; align-items: center; padding: 40px 20px; }
    .hud-title { font-size: 2.5rem; }
    .hud-card { flex-direction: column; text-align: center; }
    .social-nexus-bar { flex-direction: column; text-align: center; gap: 30px; }
}
    /* --- UPDATED: HOLOGRAPHIC TEAM CARDS --- */

.subsection-header {
    font-family: var(--font-display);
    font-size: 2rem;
    color: white;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
}
.subsection-header i { color: var(--neon); }

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* Slightly wider cards */
    gap: 30px;
}

.member-card {
    background: #050505;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Hover: Card Glow & Lift */
.member-card:hover {
    border-color: var(--neon);
    transform: translateY(-8px);
    box-shadow: 0 0 20px rgba(209, 255, 0, 0.15); /* Soft neon glow */
}

/* IMAGE CONTAINER */
.member-visual {
    height: 280px;
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #000;
}

/* THE IMAGE ITSELF */
.member-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    /* IDLE STATE: "Blueprint Mode" (Cyan/Green Tint) */
    filter: grayscale(100%) sepia(100%) hue-rotate(80deg) brightness(0.8) contrast(1.2);
    opacity: 0.8;
    
    transition: all 0.5s ease-out;
    transform: scale(1.0);
}

/* HOVER STATE: "System Online" (Full Color) */
.member-card:hover .member-visual img {
    filter: grayscale(0%) sepia(0%) hue-rotate(0deg) brightness(1.1) contrast(1);
    opacity: 1;
    transform: scale(1.1); /* Smooth Zoom */
}

/* SCANLINE OVERLAY (Always moving faintly) */
.visual-scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 51%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.3;
}

/* NEW: GLARE EFFECT ON HOVER */
.member-visual::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-25deg);
    transition: 0s;
    pointer-events: none;
    z-index: 3;
}

.member-card:hover .member-visual::after {
    left: 200%;
    transition: 0.6s ease-in-out; /* Flash effect on hover */
}

/* INFO BOX */
.member-info {
    padding: 20px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    position: relative;
    z-index: 5;
    transition: background 0.3s;
}

/* Hover: Darken Info Box slightly to pop text */
.member-card:hover .member-info {
    background: #000;
    border-top-color: var(--neon);
}

.member-info h4 {
    font-family: var(--font-display);
    font-size: 1.3rem;
    color: #fff;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: color 0.3s;
}

.member-card:hover .member-info h4 {
    color: var(--neon); /* Name turns neon on hover */
}

.member-role {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-secondary);
    letter-spacing: 1px;
    display: block;
}

/* Role Label Decoration (Little colored square) */
.member-role::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--text-secondary);
    margin-right: 8px;
    transition: background 0.3s;
}

.member-card:hover .member-role::before {
    background: var(--neon); /* Dot turns neon */
}
        `}</style>
    </div>
  );
};

export default NexSyncApp;