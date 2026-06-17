import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar, { BigBangMark } from "./components/Navbar";
import Footer from "./components/Footer";

import webDevImg from "./assets/services/web-dev.png";
import mobileDevImg from "./assets/services/mobile-dev.png";
import aiAutomationImg from "./assets/services/ai-automation.png";
import cloudSolutionsImg from "./assets/services/cloud-solutions.png";
import cybersecurityImg from "./assets/services/cybersecurity.png";
import bigDataImg from "./assets/services/big-data.png";
import rcmBillingImg from "./assets/services/rcm-billing.png";
import designMarketingImg from "./assets/services/design-marketing.png";
import blockchainImg from "./assets/services/blockchain.png";

/* -------------------------- Cosmic visual -------------------------- */
function CosmicSystem() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* radial sun */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 25%, transparent 60%)",
        }}
      />
      {/* orbital rings */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border border-[color:var(--gold)]/15"
          style={{
            width: `${30 + i * 14}vw`,
            height: `${30 + i * 14}vw`,
            x: "-50%",
            y: "-50%",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-[color:var(--gold)]"
            style={{ top: "-4px", left: "50%", boxShadow: "0 0 20px #D4AF37" }}
          />
        </motion.div>
      ))}
      {/* particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-[color:var(--gold)]"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            opacity: 0.3 + ((i % 5) * 0.12),
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

/* -------------------------- Reveal helpers -------------------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
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

/* -------------------------- Hero -------------------------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-24 md:pt-32 px-6 md:px-12 flex flex-col justify-center noise overflow-hidden">
      <CosmicSystem />
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side Content */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-eyebrow mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[color:var(--gold)]" />
            Big Bang Tech Solutions - Est. Cosmos
          </motion.div>

          <SplitHeadline text="Pioneering the tech cosmos." />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-champagne)] to-transparent origin-left max-w-md"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-8 text-[color:var(--muted-foreground)] text-lg leading-relaxed max-w-lg"
          >
            We are a technology consultancy that designs, builds and ships AI products, custom software, cloud platforms and automation systems for startups and enterprises - end to end, under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a href="#services" className="btn-gold">
              See what we build
              <span aria-hidden>→</span>
            </a>
            <Link to="/contact" className="btn-ghost">Start a project</Link>
          </motion.div>
        </div>

        {/* Right Side Logo */}
        <div className="relative h-full min-h-[200px] md:min-h-[300px] lg:min-h-[500px] flex items-center justify-center pointer-events-none mb-12 lg:mb-0 lg:mt-0 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            {/* Pulsing ring 1 */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0 bg-[color:var(--gold)] rounded-full blur-[80px] -z-10" 
            />
            {/* Orbiting element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              className="absolute -inset-[100px] border border-[color:var(--gold)]/10 rounded-full border-dashed -z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="absolute -inset-[150px] border border-[color:var(--gold)]/5 rounded-full -z-10"
            />
            <div className="hidden lg:block">
              <BigBangMark size={400} />
            </div>
            <div className="block lg:hidden">
              <BigBangMark size={240} />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

function FloatChip({ text, top, left, delay }: { text: string; top: string; left: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      style={{ top, left, animation: `float-y ${5 + Math.random() * 3}s ease-in-out infinite` }}
      className="absolute px-4 py-2 rounded-full text-[15px] border border-[color:var(--gold)]/30 bg-[color:var(--space-1)]/80 backdrop-blur-md text-[color:var(--gold-champagne)]"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] mr-2 align-middle" />
      {text}
    </motion.div>
  );
}

/* -------------------------- What We Do (clear value prop) -------------------------- */
function WhatWeDo() {
  const pillars = [
    { t: "AI & Automation", d: "LLM apps, agents, and workflow automation that replace repetitive operations.", icon: "✦", link: "/services#03" },
    { t: "Custom Software", d: "Web and mobile products engineered for scale, speed and reliability.", icon: "⌘", link: "/services#01" },
    { t: "Cloud & Data", d: "Resilient infrastructure, data pipelines and analytics on AWS, GCP and Azure.", icon: "⎈", link: "/services#04" },
    { t: "Security & DevOps", d: "Hardened systems, CI/CD, observability and continuous compliance.", icon: "⌖", link: "/services#05" },
  ];
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-1)] section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end mb-10 md:mb-16">
          <div className="md:col-span-7">
            <div className="text-eyebrow mb-6">What we do</div>
            <Reveal>
              <h2 className="text-section">
                Four practices. <span className="gold-text italic">One delivery team.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <p className="text-[color:var(--muted-foreground)] text-base leading-relaxed">
              Big Bang Tech Solutions is a full-stack technology partner. We help companies launch new digital products, modernise legacy systems, and ship AI into production - without juggling agencies.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <Link to={p.link} className="block h-full group">
                <div className="surface-card p-7 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[color:var(--gold)]/40 cursor-pointer">
                  <div className="text-3xl text-[color:var(--gold)] mb-6 font-display group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-[color:var(--gold)] transition-colors">{p.t}</h3>
                  <p className="mt-3 text-[15px] text-[color:var(--muted-foreground)] leading-relaxed group-hover:text-white/80 transition-colors">{p.d}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Section 2: Who -------------------------- */
function Who() {
  return (
    <section id="about" className="relative px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-2)]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="text-eyebrow sticky top-32">01 - Who we are</div>
        </div>
        <div className="md:col-span-9">
          <Reveal>
            <h2 className="text-section max-w-4xl">
              A tech-driven agency revolutionising business through{" "}
              <span className="gold-text italic">AI, automation</span> and custom software.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-12 text-[color:var(--muted-foreground)] text-lg max-w-2xl leading-relaxed">
              Big Bang Tech Solutions Pvt Ltd partners with founders and enterprises to design,
              engineer and ship products that move markets - quietly, precisely, at scale.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Section 3: Story (stacking cards) -------------------------- */
const STORY = [
  { n: "01", t: "Innovation", d: "Research-led prototyping for products that did not exist yesterday." },
  { n: "02", t: "Automation", d: "Replacing repetitive work with composable, observable systems." },
  { n: "03", t: "AI", d: "Foundation models and agents wired into the workflows that matter." },
  { n: "04", t: "Cloud", d: "Multi-region infrastructure designed for resilience and quiet scale." },
  { n: "05", t: "Transformation", d: "Re-architecting legacy estates into modern digital organisations." },
];

function Story() {
  return (
    <section className="relative px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-ink)] noise section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="text-eyebrow mb-6">02 - The Big Bang Story</div>
        <Reveal>
          <h2 className="text-section max-w-3xl">A universe of capability, expanding.</h2>
        </Reveal>

        <div className="mt-16 md:mt-24 relative">
          {STORY.map((s, i) => (
            <div
              key={s.n}
              className="sticky"
              style={{ top: `${120 + i * 18}px` }}
            >
              <motion.article
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="surface-card p-6 md:p-16 mb-8 grid md:grid-cols-12 gap-6 md:gap-8"
                style={{
                  background: `linear-gradient(180deg, #0c0c0c 0%, #050505 100%)`,
                }}
              >
                <div className="md:col-span-2 font-display text-2xl text-[color:var(--gold)]">{s.n}</div>
                <div className="md:col-span-7">
                  <h3 className="text-section !text-5xl md:!text-6xl">{s.t}</h3>
                  <p className="mt-6 text-[color:var(--muted-foreground)] max-w-lg text-lg">{s.d}</p>
                </div>
                <div className="md:col-span-3 flex items-end justify-end">
                  <div className="w-32 h-32 rounded-full border border-[color:var(--gold)]/30 flex items-center justify-center relative">
                    <div className="absolute inset-2 rounded-full border border-[color:var(--gold)]/15 animate-[orbit-spin_12s_linear_infinite]" />
                    <div className="w-3 h-3 rounded-full bg-[color:var(--gold)]" style={{ boxShadow: "0 0 30px #D4AF37" }}/>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* -------------------------- Mission -------------------------- */
function Mission() {
  const text = "Our mission is to drive innovation and create cutting-edge solutions that empower businesses to achieve their full potential.";
  const words = text.split(" ");
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-2)] section-divider">
      <div className="max-w-6xl mx-auto">
        <div className="text-eyebrow mb-10">03 - Mission</div>
        <h2 className="text-section">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              className="inline-block mr-[0.2em]"
            >
              {w === "innovation" || w === "cutting-edge" || w === "potential." ? (
                <span className="gold-text">{w}</span>
              ) : w}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
}

/* -------------------------- Skills -------------------------- */
function Skills() {
  const skills = [
    { name: "Web Development", v: 96 },
    { name: "AI & Machine Learning", v: 94 },
    { name: "Cloud Computing", v: 92 },
    { name: "Cybersecurity", v: 90 },
    { name: "Mobile App Development", v: 93 },
  ];
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-0)] section-divider">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="text-eyebrow mb-6">04 - Capability</div>
          <h2 className="text-section">Crafted disciplines.</h2>
        </div>
        <div className="md:col-span-8 space-y-8 md:mt-4">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div>
                <div className="flex justify-between text-[15px] mb-3">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-[color:var(--gold)] font-display">{s.v}%</span>
                </div>
                <div className="h-px bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: s.v / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 origin-left bg-gradient-to-r from-[color:var(--gold-soft)] via-[color:var(--gold)] to-[color:var(--gold-champagne)]"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Services -------------------------- */
const SERVICES = [
  { n: "01", t: "Web Development", d: "Performant, accessible web platforms engineered for scale and search.", img: webDevImg },
  { n: "02", t: "Mobile App Development", d: "Native and cross-platform applications with cinematic interaction quality.", img: mobileDevImg },
  { n: "03", t: "AI & Automation", d: "LLM systems, agents and orchestration that quietly run your business.", img: aiAutomationImg },
  { n: "04", t: "Cloud Solutions", d: "Multi-region, multi-cloud architecture with first-class observability.", img: cloudSolutionsImg },
  { n: "05", t: "Cybersecurity", d: "Threat modeling, hardening and continuous monitoring at enterprise grade.", img: cybersecurityImg },
  { n: "06", t: "Big Data", d: "Pipelines, lakehouses and analytics that turn signal into decisions.", img: bigDataImg },
  { n: "07", t: "Revenue Cycle Management", d: "Domain software for healthcare operations and reimbursement workflows.", img: rcmBillingImg },
  { n: "08", t: "Design & Digital Marketing", d: "Brand systems, motion identity and growth engineering, in one place.", img: designMarketingImg },
  { n: "09", t: "Crypto · Blockchain · Web3", d: "Smart contracts, L2 infrastructure and tokenised product surfaces.", img: blockchainImg },
];

function Services() {
  return (
    <section id="services" className="relative px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-1)] noise section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12 md:mb-20">
          <div>
            <div className="text-eyebrow mb-6">05 - Services</div>
            <h2 className="text-section max-w-2xl">Nine disciplines. One studio.</h2>
          </div>
          <p className="text-[color:var(--muted-foreground)] max-w-md">
            A vertically integrated team - strategy, design and engineering under one roof, shipping products end to end.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.05}>
              <Link to={`/services#${s.n}`}>
                <motion.div
                  whileHover={{ y: -8, rotate: -0.4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="surface-card p-6 md:p-8 h-full flex flex-col justify-between min-h-[380px] group cursor-pointer"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[15px] text-[color:var(--gold)]">{s.n}</span>
                      <div className="w-10 h-10 rounded-full border border-[color:var(--gold)]/20 flex items-center justify-center text-[color:var(--gold)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--space-0)] transition-all">→</div>
                    </div>
                    <div className="my-5 aspect-video w-full rounded-lg overflow-hidden border border-white/5 bg-[color:var(--space-ink)] relative flex items-center justify-center">
                      <img src={s.img} alt={s.t} className="object-cover w-full h-full opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-tight">{s.t}</h3>
                    <p className="mt-4 text-[15px] text-[color:var(--muted-foreground)] leading-relaxed">{s.d}</p>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Tech Universe -------------------------- */
function TechUniverse() {
  const nodes = [
    { l: "AI", x: 50, y: 50, r: 0 },
    { l: "Apps", x: 50, y: 18, r: 28 },
    { l: "Cloud", x: 78, y: 32, r: 56 },
    { l: "Blockchain", x: 86, y: 68, r: 84 },
    { l: "Cybersecurity", x: 50, y: 84, r: 112 },
    { l: "Automation", x: 14, y: 68, r: 140 },
    { l: "Data", x: 22, y: 32, r: 168 },
  ];
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-3)] section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="text-eyebrow mb-6">06 - Ecosystem</div>
        <Reveal>
          <h2 className="text-section max-w-3xl mb-20">An interconnected technology universe.</h2>
        </Reveal>

        <div className="relative aspect-square max-w-3xl mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {nodes.slice(1).map((n, i) => (
              <motion.line
                key={i}
                x1={50} y1={50} x2={n.x} y2={n.y}
                stroke="#D4AF37" strokeWidth="0.15" strokeDasharray="0.5 0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
              />
            ))}
          </svg>
          {nodes.map((n, i) => (
            <motion.div
              key={n.l}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className={`px-4 py-2 rounded-full border backdrop-blur-md text-[15px] whitespace-nowrap ${i === 0 ? "bg-[color:var(--gold)] text-[color:var(--space-0)] border-[color:var(--gold)] font-semibold" : "border-[color:var(--gold)]/30 bg-[color:var(--space-1)]/80 text-white"}`}>
                {n.l}
              </div>
              {i === 0 && (
                <div className="absolute inset-0 rounded-full animate-[pulse-gold_3s_ease-in-out_infinite]" style={{ boxShadow: "0 0 40px #D4AF37" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Why Choose Us -------------------------- */
function Why() {
  const items = [
    "Innovation", "Scalability", "Security",
    "Automation", "Expert Team", "Future-Ready Solutions",
  ];
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-4)] section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="text-eyebrow mb-6">07 - Why Big Bang</div>
        <Reveal>
          <h2 className="text-section mb-12 md:mb-20 max-w-3xl">Six reasons studios and CTOs choose us.</h2>
        </Reveal>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {items.map((t, i) => (
            <Reveal key={t} delay={i * 0.04}>
              <div className="py-10 grid md:grid-cols-12 gap-6 items-center group hover:bg-white/[0.02] transition-colors px-2">
                <div className="md:col-span-2 font-display text-[color:var(--gold)]">0{i + 1}</div>
                <div className="md:col-span-7 font-display text-3xl md:text-5xl font-bold group-hover:text-[color:var(--gold)] transition-colors">{t}</div>
                <div className="md:col-span-3 text-[15px] text-[color:var(--muted-foreground)]">
                  Engineered into every engagement, by default.
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Contact -------------------------- */
function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-32 bg-[color:var(--space-2)] section-divider">
      <div className="max-w-6xl mx-auto">
        <div className="text-eyebrow mb-6">08 - Contact</div>
        <Reveal>
          <h2 className="text-hero">
            Let's build the <span className="gold-text italic">future</span> together.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <form className="mt-12 md:mt-20 grid md:grid-cols-2 gap-8 md:gap-10 max-w-4xl">
            <Field label="Your name" type="text" />
            <Field label="Email" type="email" />
            <div className="md:col-span-2">
              <Field label="Mobile number" type="tel" />
            </div>
            <div className="md:col-span-2">
              <Field label="Tell us about your project" type="textarea" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-6">
              <p className="text-[15px] uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
                Reply within 24 hours.
              </p>
              <button type="button" className="btn-gold">
                Send transmission <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const active = focused || val.length > 0;
  return (
    <div className="relative pt-6">
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${active ? "top-0 text-[15px] text-[color:var(--gold)] tracking-[0.2em] uppercase" : "top-8 text-base text-[color:var(--muted-foreground)]"}`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-transparent border-b border-white/10 focus:border-[color:var(--gold)] outline-none py-3 text-lg resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-transparent border-b border-white/10 focus:border-[color:var(--gold)] outline-none py-3 text-lg transition-colors"
        />
      )}
    </div>
  );
}

/* -------------------------- Final CTA -------------------------- */
function FinalCTA() {
  return (
    <section className="relative px-6 md:px-12 py-24 md:py-48 overflow-hidden noise">
      {/* radial explosion */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.05) 18%, transparent 50%)",
        }}
      />
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border border-[color:var(--gold)]/20"
          style={{ width: `${20 + i * 12}vw`, height: `${20 + i * 12}vw`, x: "-50%", y: "-50%" }}
          animate={{ rotate: i % 2 ? 360 : -360 }}
          transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-hero">
            The next big bang<br />
            <span className="gold-text">starts here.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-[color:var(--muted-foreground)] text-lg max-w-xl mx-auto">
            A single conversation is enough to plot the trajectory. We will take it from there.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-14 flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn-gold">Start your project →</Link>
            <Link to="/contact" className="btn-ghost">Schedule consultation</Link>
          </div>
        </Reveal>
      </div>
    </section>
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

/* -------------------------- Page -------------------------- */
export default function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  return (
    <main className="bg-[color:var(--space-0)] text-[color:var(--foreground)] overflow-x-clip">
      <Progress />
      <LuxuryCursor />
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Who />
      <Services />
      <Story />
      <TechUniverse />
      <Why />
      <Mission />
      <Contact />
      <FinalCTA />
      <Footer />
    </main>
  );
}




