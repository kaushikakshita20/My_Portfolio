import { profile, skills, projects, education, internships, leadership } from "./data.js";
import { useTheme, useReveal, useActiveSection, useSpotlight } from "./hooks.js";

const SECTIONS = ["home", "about", "skills", "projects", "experience", "contact"];

function Navbar({ theme, toggleTheme, active }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#home" className="logo" aria-label="Akshita Kaushik, home">ak<span>.</span></a>
        <nav className="nav-links" aria-label="Primary">
          {SECTIONS.slice(1).map((id) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{id === "experience" ? "Journey" : id}</a>)}
        </nav>
        <a className="nav-contact" href="#contact">Let’s talk <span>↗</span></a>
        <button className="theme-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title="Toggle theme">
          {theme === "dark" ? "☼" : "◐"}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Computer science student at Chitkara University</p>
          <p className="hero-intro">Hello, I’m</p>
          <h1>Akshita<br />Kaushik<span className="period">.</span></h1>
          <p className="hero-tagline">A CSE student.<br /><em>Building for the web.</em></p>
          <p className="hero-description">{profile.tagline}</p>
          <div className="cta-row">
            <a className="btn primary" href="#projects">See what I’m making <span>↘</span></a>
            <a className="text-link" href="#about">A little about me <span>↓</span></a>
          </div>
          <div className="hero-meta"><span>{profile.location}</span><i /> <span>B.E. CSE · 2025—2029</span></div>
        </div>
        <figure className="portrait-scene">
          <div className="portrait-mat">
            <img src="/akshita-kaushik.jpeg" alt="Akshita Kaushik" className="portrait" />
            <span className="photo-shutter shutter-left" aria-hidden="true" />
            <span className="photo-shutter shutter-right" aria-hidden="true" />
          </div>
          <figcaption><span>AK · 01</span><span>MAKING, LEARNING, REPEATING</span></figcaption>
          <span className="portrait-sticker">hello<br /><b>there!</b></span>
          <span className="portrait-sparkle" aria-hidden="true">✳</span>
        </figure>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span /> SCROLL TO EXPLORE</a>
      </div>
      <div className="hero-wash" aria-hidden="true" />
    </section>
  );
}

function SectionTitle({ index, kicker, children }) {
  return <div className="section-heading reveal"><span className="section-kicker">{index} / {kicker}</span><h2>{children}</h2></div>;
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-layout">
        <SectionTitle index="01" kicker="THE SHORT STORY">A little about me</SectionTitle>
        <div className="about-copy reveal">
          {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="inline-link" href={`mailto:${profile.email}`}>A note in my inbox <span>↗</span></a>
        </div>
        <div className="about-aside reveal">
          <span className="aside-sun">✳</span>
          <p>Currently studying, exploring, and turning ideas into things you can click.</p>
          <span className="aside-caption">BASED IN {profile.location.toUpperCase()}</span>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionTitle index="02" kicker="MY TOOLKIT">Things I’m learning</SectionTitle>
        <div className="skill-cards">
          {skills.map((group, index) => <article className={`skill-card skill-tone-${index + 1} reveal`} key={group.group}>
            <span className="skill-card-index">0{index + 1} / TOOLKIT</span>
            <h3>{group.group}</h3>
            <p>Things in my learning mix</p>
            <div className="skill-card-items">{group.items.map((skill) => <span className="skill-item" key={skill}>{skill}</span>)}</div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionTitle index="03" kicker="A FEW THINGS I’VE MADE">Small ideas, real projects</SectionTitle>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card reveal project-${index + 1}`} key={project.title}>
              <div className={`project-art ${index === 0 ? "cryo-art" : "secure-art"}`} aria-hidden="true">
                {index === 0 ? <><span className="cryo-orb">✳</span><span className="art-label">CRYOGUARD<br />AI</span><span className="art-satellite" /></> : <><span className="secure-window"><i /><i /><i /><b>secure<span>.</span></b><small>your digital world</small></span><span className="secure-lock">⌑</span></>}
                <span className="art-number">0{index + 1}</span>
              </div>
              <div className="project-info"><div><span className="project-type">{index === 0 ? "ARTIFICIAL INTELLIGENCE" : "WEB · CYBERSECURITY"}</span><h3>{project.title}</h3></div><span className="project-mark">↗</span></div>
              <p>{project.description}</p>
              <div className="chips small">{project.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section journey-section">
      <div className="container journey-inner">
        <SectionTitle index="04" kicker="THE JOURNEY">Where I’ve been learning</SectionTitle>
        <div className="journey-columns">
          <div className="journey-timeline">
            <h3 className="timeline-label">Education</h3>
            {education.map((item) => <article className="journey-event reveal" key={item.title}>
              <span className="journey-dot" aria-hidden="true" />
              <span className="journey-date">{item.period}</span>
              <h4>{item.title}</h4><p className="journey-place">{item.place}</p><p className="journey-detail">{item.details}</p>
            </article>)}
          </div>
          <div className="journey-timeline journey-roles">
            <h3 className="timeline-label">Experience &amp; involvement</h3>
            {internships.map((item) => <article className="journey-event reveal" key={item.title}>
              <span className="journey-dot" aria-hidden="true" /><span className="journey-date">{item.period}</span><h4>{item.title}</h4><p className="journey-place">{item.place}</p><p className="journey-detail">{item.details}</p>
            </article>)}
            {leadership.map((item) => <article className="journey-event reveal" key={item.title}>
              <span className="journey-dot" aria-hidden="true" /><span className="journey-date">{item.period}</span><h4>{item.title}</h4><p className="journey-place">{item.place}</p>
            </article>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <span className="section-kicker">05 / YOUR TURN</span>
        <h2>Got a project?<br /><em>Let’s work together.</em></h2>
        <p>I’m always happy to meet kind people making interesting things.</p>
        <div className="contact-flashcards">
          <a className="contact-card contact-email" href={`mailto:${profile.email}`}><span className="contact-card-label">DROP A NOTE</span><strong>{profile.email}</strong><span className="contact-card-action">OPEN EMAIL <b>↗</b></span></a>
          <div className="contact-card contact-location"><span className="contact-card-label">CURRENTLY BASED</span><strong>{profile.location}</strong><span className="contact-card-action">PUNJAB · INDIA <b>✳</b></span></div>
          {profile.socials.filter((item) => item.label !== "Email").map((item) => <a className="contact-card contact-social" href={item.url} key={item.label} target="_blank" rel="noreferrer"><span className="contact-card-label">FIND ME ON</span><strong>{item.label}</strong><span className="contact-card-action">VISIT PROFILE <b>↗</b></span></a>)}
        </div>
        <div className="contact-bottom"><span>DESIGNED &amp; BUILT BY AKSHITA · © {new Date().getFullYear()}</span><a href="#home">BACK TO TOP ↑</a></div>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(SECTIONS);
  useReveal();
  useSpotlight();
  return <>
    <Navbar theme={theme} toggleTheme={toggleTheme} active={active} />
    <main><Hero /><About /><Skills /><Projects /><Experience /><Contact /></main>
    <footer className="footer"><div className="container"><span>ak.</span><span>Designed &amp; built by Akshita Kaushik · © {new Date().getFullYear()}</span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </>;
}
