import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* -------------------------- Logo -------------------------- */
function BigBangMark({ size = 36 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E6C76B" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8941F" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="32" cy="32" r="4" fill="url(#bg)"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="32" cy="32" r="14" stroke="#D4AF37" strokeWidth="0.7" fill="none"
        animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
      <motion.ellipse
        cx="32" cy="32" rx="26" ry="10" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.7"
        animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
      <motion.ellipse
        cx="32" cy="32" rx="10" ry="26" stroke="#B8941F" strokeWidth="0.5" fill="none" opacity="0.5"
        animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
    </motion.svg>
  );
}

/* -------------------------- Nav -------------------------- */
function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-8 md:px-12 py-6 flex items-center justify-between backdrop-blur-md bg-[color:var(--space-0)]/40 border-b border-[color:var(--border)]">
      <Link to="/" className="flex items-center gap-3">
        <BigBangMark size={32} />
        <span className="font-display font-semibold tracking-tight text-[15px]">
          Big Bang<span className="text-[color:var(--gold)]">.</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-10 text-sm text-[color:var(--muted-foreground)]">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/about" className="text-[color:var(--gold)] font-medium">About</Link>
        <Link to="/services" className="hover:text-white transition-colors">Services</Link>
        <a href="/#founders" className="hover:text-white transition-colors">Founders</a>
        <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
      </nav>
      <a href="/#contact" className="btn-gold !py-3 !px-5 text-sm">Start a project</a>
    </header>
  );
}

/* -------------------------- Cosmic visual -------------------------- */
function CosmicSystem() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* radial background light */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.02) 30%, transparent 60%)",
        }}
      />
      {/* particle matrix */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-[color:var(--gold)]/30"
          style={{
            left: `${(i * 41) % 100}%`,
            top: `${(i * 29) % 100}%`,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -15, 0] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* -------------------------- Reveal helpers -------------------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SplitHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="text-hero">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* -------------------------- Cursor + Progress -------------------------- */
function LuxuryCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 220, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 220, mass: 0.4 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] w-6 h-6 rounded-full border border-[color:var(--gold)] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
    />
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });
  return (
    <motion.div
      style={{ scaleX: sx }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[color:var(--gold)] origin-left"
    />
  );
}

/* -------------------------- About Content -------------------------- */
const VALUES = [
  {
    t: "Precision Engineering",
    d: "We reject bloated frameworks and quick shortcuts. Every line of code, database query, and CSS rule is crafted with long-term compile and scale resilience in mind.",
    icon: "◐"
  },
  {
    t: "Autonomous Leverage",
    d: "We map artificial intelligence directly into background tasks. By automating repeatable workflows, we provide companies with extreme operational throughput.",
    icon: "◇"
  },
  {
    t: "Hardened security",
    d: "Data boundaries are sacred. We build secure encryption structures, enforce vault protocols, and prepare your tech stack for SoC2 or HIPAA compliance out of the box.",
    icon: "◉"
  },
  {
    t: "Radical Transparency",
    d: "No intermediate project managers, sales fluff, or consulting jargon. You speak directly with engineers who write your software, with live pipeline updates daily.",
    icon: "◈"
  }
];

const TIMELINE = [
  {
    y: "2019",
    t: "Cosmic Spark",
    d: "Founded as a specialized local automation laboratory. We spent our early cycles writing custom scrapers, database pipelines, and scripts to replace repetitive manual administration tasks."
  },
  {
    y: "2021",
    t: "Expanding Orbit",
    d: "Grew into custom web and mobile systems. We partnered with top-tier startup studios to design, ship, and support custom software frameworks capable of serving millions of events daily."
  },
  {
    y: "2023",
    t: "Intelligence Ascent",
    d: "Wired foundation models into real operations. We deployed secure, fine-tuned RAG agents, autonomous document processing systems, and predictive data nodes into manufacturing and finance."
  },
  {
    y: "2026",
    t: "Integrated Studio",
    d: "Re-structured as a unified technology consultancy under directors Saalim Shaikh and Aveys Shaikh. Nine practices, one delivery team, shipping premium digital cosmos end-to-end."
  }
];

const METRICS = [
  { k: "100%", v: "Code Ownership" },
  { k: "45ms", v: "Avg Edge Latency" },
  { k: "SOC2", v: "Hardened Standard" },
  { k: "24/7", v: "Observability" }
];

/* -------------------------- Component -------------------------- */
export default function AboutPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="bg-[color:var(--space-0)] text-[color:var(--foreground)] overflow-x-clip min-h-screen relative noise pb-20">
      <Progress />
      <LuxuryCursor />
      <Nav />
      <CosmicSystem />

      {/* Hero Section */}
      <section className="relative pt-44 px-6 md:px-12 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-eyebrow mb-6 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-[color:var(--gold)]" />
            Our Philosophy
            <span className="w-8 h-px bg-[color:var(--gold)]" />
          </motion.div>

          <SplitHeadline text="Pioneering the future of technology." />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent max-w-xl mx-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 max-w-2xl mx-auto text-[color:var(--muted-foreground)] text-base md:text-lg leading-relaxed"
          >
            Big Bang Tech Solutions Pvt Ltd is a premium consultancy built for founders who value speed, precision, and code quality. We do not just build prototypes; we ship robust, production-grade systems engineered for quiet scale.
          </motion.p>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mt-32 section-divider pt-32">
        <div className="text-eyebrow mb-6 text-center">Our Journey</div>
        <h2 className="text-section text-center mb-20">Tracing the cosmic trajectory.</h2>

        <div className="relative border-l border-[color:var(--gold)]/20 ml-4 md:ml-1/2 space-y-16 py-8">
          {TIMELINE.map((item, index) => (
            <div key={item.y} className="relative pl-8 md:pl-0 md:w-1/2 md:odd:ml-0 md:even:ml-auto md:odd:text-right md:odd:-translate-x-8 md:even:translate-x-8">
              {/* Dot indicator */}
              <div className="absolute w-3 h-3 rounded-full bg-[color:var(--gold)] top-1.5 -left-1.5 md:left-auto md:right-0 md:odd:-right-[1.5px] md:even:-left-[1.5px]" style={{ boxShadow: "0 0 12px #D4AF37" }} />
              
              <Reveal delay={index * 0.1}>
                <div className="space-y-3">
                  <span className="font-display text-4xl font-bold gold-text leading-none">{item.y}</span>
                  <h3 className="font-display text-xl font-bold text-white">{item.t}</h3>
                  <p className="text-xs md:text-sm text-[color:var(--muted-foreground)] leading-relaxed max-w-md md:odd:ml-auto">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32 section-divider pt-32">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
          <div className="md:col-span-7">
            <div className="text-eyebrow mb-6">Core Values</div>
            <Reveal>
              <h2 className="text-section">
                Four practices. <span className="gold-text italic">Zero compromises.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <p className="text-[color:var(--muted-foreground)] text-sm md:text-base leading-relaxed">
              We anchor our consultancy in transparent communication, strict architectural discipline, and high-fidelity product output.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {VALUES.map((val, i) => (
            <Reveal key={val.t} delay={i * 0.08}>
              <div className="surface-card p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-3xl text-[color:var(--gold)] mb-6 font-display">{val.icon}</div>
                  <h3 className="font-display text-2xl font-semibold text-white">{val.t}</h3>
                  <p className="mt-4 text-xs md:text-sm text-[color:var(--muted-foreground)] leading-relaxed">{val.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Methodology / Workflow Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mt-32 section-divider pt-32">
        <div className="text-eyebrow mb-6 text-center">Operational Loop</div>
        <h2 className="text-section text-center mb-16">How we ship.</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "01", t: "Blueprint", d: "Deep architecture mapping, API signatures, cloud diagrams, and tech selection." },
            { n: "02", t: "Cinematic design", d: "High-fidelity user interface prototyping, design tokens, and interactions." },
            { n: "03", t: "Sprint build", d: "Production-ready coding with automated CI/CD deployments and daily updates." },
            { n: "04", t: "Quiet scale", d: "Observed launches with strict telemetry and absolute runtime uptime." }
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="bg-white/[0.01] border border-white/5 p-6 rounded-xl relative group hover:border-[color:var(--gold)]/20 transition-colors">
                <div className="font-display text-xs text-[color:var(--gold)] font-bold mb-3">{step.n}</div>
                <h4 className="font-display text-lg font-bold text-white mb-2">{step.t}</h4>
                <p className="text-[11px] text-[color:var(--muted-foreground)] leading-relaxed">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Big Bang Metrics */}
        <div className="mt-20 gold-divider" />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {METRICS.map((s) => (
            <div key={s.v}>
              <div className="font-display text-4xl md:text-5xl gold-text font-bold">{s.k}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative mt-24 px-6 md:px-12 text-center py-20 overflow-hidden">
        {/* radial light */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full -z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.02) 20%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-section mb-6">
              Let's chart your <span className="gold-text italic">trajectory.</span>
            </h2>
          </Reveal>
          <p className="mt-4 text-[color:var(--muted-foreground)] max-w-xl mx-auto text-sm md:text-base">
            Partner with us to architect your custom cloud infrastructure, fine-tune models, or launch software designed to last.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a href="/#contact" className="btn-gold">Start your project →</a>
            <Link to="/" className="btn-ghost">Back to home</Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 border-t border-white/5 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[color:var(--muted-foreground)] uppercase tracking-[0.25em]">
          <div className="flex items-center gap-3">
            <BigBangMark size={28} />
            <span className="font-semibold text-white/90">Big Bang.</span>
          </div>
          <span>© {new Date().getFullYear()} Big Bang Tech Solutions Pvt Ltd</span>
          <span>Engineered in the cosmos</span>
        </div>
      </footer>
    </main>
  );
}
