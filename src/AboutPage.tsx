import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar, { BigBangMark } from "./components/Navbar";

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
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] pt-[0.25em] pb-[0.25em] -mt-[0.25em] -mb-[0.25em]">
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
      <Navbar />
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
              <div className="bg-white/[0.01] border border-white/5 p-8 rounded-xl relative group hover:border-[color:var(--gold)]/20 transition-colors h-full">
                <div className="font-display text-sm text-[color:var(--gold)] font-bold mb-4 tracking-wider">{step.n}</div>
                <h4 className="font-display text-xl font-bold text-white mb-3">{step.t}</h4>
                <p className="text-sm md:text-base text-[color:var(--muted-foreground)] leading-relaxed">{step.d}</p>
              </div>
            </Reveal>
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
