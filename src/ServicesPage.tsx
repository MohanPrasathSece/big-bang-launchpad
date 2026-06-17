import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar, { BigBangMark } from "./components/Navbar";

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
            "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.03) 25%, transparent 60%)",
        }}
      />
      {/* orbital rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border border-[color:var(--gold)]/10"
          style={{
            width: `${40 + i * 20}vw`,
            height: `${40 + i * 20}vw`,
            x: "-50%",
            y: "-50%",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 70 + i * 25, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]/60"
            style={{ top: "-3px", left: "50%" }}
          />
        </motion.div>
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

/* -------------------------- Services Content -------------------------- */
const SERVICES_DETAILS = [
  {
    id: "01",
    title: "Web Development",
    tagline: "High-performance, search-optimised web platforms.",
    desc: "We construct blisteringly fast, accessible web experiences engineered to scale gracefully. From complex enterprise portals to premium creative storefronts, we treat code as a craft, optimizing for core web vitals and organic visibility.",
    stack: ["React", "Vite", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "GraphQL"],
    features: [
      "Edge-rendered architectures for lightning-fast loads.",
      "Flawless responsive layouts adapted to all screen vectors.",
      "Strict semantic HTML structures matching WCAG AA accessibility.",
      "Obsessive SEO hygiene designed for crawling efficiency."
    ],
    img: webDevImg
  },
  {
    id: "02",
    title: "Mobile App Development",
    tagline: "Cinematic native interfaces in the palm of your hand.",
    desc: "We design and build iOS and Android applications that feel fluid and native. By implementing clean layout orchestration and responsive gesture states, we deliver mobile ecosystems with premium interactive fidelity.",
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Framer Motion"],
    features: [
      "Smooth 60fps animations and micro-gestures.",
      "Offline-first state synchronization models.",
      "Optimized native bridging for device hardware.",
      "Seamless App Store & Google Play distribution pipeline."
    ],
    img: mobileDevImg
  },
  {
    id: "03",
    title: "AI & Automation",
    tagline: "Wired intelligence running silently in your pipelines.",
    desc: "We orchestrate advanced language models and autonomous agents to convert expensive manual workflows into robust background automation. We build secure custom pipelines (RAG) that act as an operational multiplier.",
    stack: ["OpenAI API", "LangChain", "LlamaIndex", "Python", "Hugging Face", "Flowise"],
    features: [
      "Retrieval-Augmented Generation (RAG) over corporate knowledge bases.",
      "Intelligent classification, summary, and response agents.",
      "Custom vector databases with lightning-fast semantic search.",
      "Secure integrations respecting privacy boundaries."
    ],
    img: aiAutomationImg
  },
  {
    id: "04",
    title: "Cloud Solutions",
    tagline: "Resilient infrastructure, built for absolute scale.",
    desc: "We design and deploy modern cloud topologies that support seamless scaling, maximum availability, and cost-efficient execution. We implement infrastructure as code to ensure architectures are fully replicable.",
    stack: ["AWS", "Google Cloud", "Azure", "Terraform", "Docker", "Kubernetes", "CI/CD"],
    features: [
      "Immutable infrastructure designed via Terraform.",
      "Highly available multi-region deployments with low latencies.",
      "Containerized microservices using Kubernetes orchestration.",
      "Hardened CI/CD workflows for hands-free releases."
    ],
    img: cloudSolutionsImg
  },
  {
    id: "05",
    title: "Cybersecurity",
    tagline: "Enterprise-grade hardening. Threat defense by design.",
    desc: "We secure codebases, cloud networks, and databases before they expose your operations. By conducting detailed penetration testing and threat modeling, we establish multi-layered defense perimeters.",
    stack: ["OWASP", "Cloudflare WAF", "Vault", "IAM", "OAuth 2.0", "SSL/TLS"],
    features: [
      "Rigorous code auditing matching OWASP Top 10 vulnerabilities.",
      "Vault integration to eliminate credential leakage.",
      "Cloudflare WAF policies optimized for API shielding.",
      "Preparation for SOC2, HIPAA, and ISO 27001 validation."
    ],
    img: cybersecurityImg
  },
  {
    id: "06",
    title: "Big Data",
    tagline: "Streamlining raw data signals into strategic assets.",
    desc: "We construct enterprise data architectures that capture, process, and analyze massive information volumes in real-time. We help you transition from batch-processing backlogs to instant analytical response.",
    stack: ["Apache Spark", "Kafka", "Snowflake", "dbt", "PostgreSQL", "BigQuery"],
    features: [
      "High-throughput event streaming designed on Kafka.",
      "Optimized cloud warehousing setup (Snowflake, BigQuery).",
      "Robust ETL pipelines using dbt for reliable transformations.",
      "Data lakes structured for quick ML exploration."
    ],
    img: bigDataImg
  },
  {
    id: "07",
    title: "Revenue Cycle Management",
    tagline: "Domain billing software for healthcare operations.",
    desc: "We build HIPAA-compliant operational platforms that streamline clinical billing workflows, reduce claim rejections, and speed up reimbursement timelines. We wire EHR systems directly into modern accounting backends.",
    stack: ["HL7", "FHIR", "HIPAA Cloud", "Custom Billing APIs", "Zod Validation"],
    features: [
      "FHIR & HL7 compatibility layers for medical interoperability.",
      "Automated claims scrubbing protocols minimizing denials.",
      "Custom analytics dashboards outlining payer performances.",
      "Strict HIPAA compliance audits built by default."
    ],
    img: rcmBillingImg
  },
  {
    id: "08",
    title: "Design & Digital Marketing",
    tagline: "Cohesive brand systems and growth engineering.",
    desc: "We combine visual luxury with conversion engineering. We build cohesive brand manuals, gorgeous 3D/interactive animations, and optimized digital funnels that convert visitors into valuable client partnerships.",
    stack: ["Figma", "Adobe CC", "Framer Motion", "Spline", "Google Analytics 4"],
    features: [
      "Cinematic user interface prototypes that translate to pixel-perfect code.",
      "Unified design tokens shared across all web surfaces.",
      "High-converting landing pages built on data insights.",
      "SEO/SEM content campaigns focusing on buyer search intent."
    ],
    img: designMarketingImg
  },
  {
    id: "09",
    title: "Crypto · Blockchain · Web3",
    tagline: "Audited smart contracts and decentralised networks.",
    desc: "We construct secure smart contracts, custom Layer 2 integrations, and decentralized financial products. We engineer token economies with rigorous auditing and security controls built into the dev loop.",
    stack: ["Solidity", "Rust", "Hardhat", "Ethers.js", "Polygon", "Arbitrum"],
    features: [
      "Gas-optimised smart contracts conforming to ERC-20/721/1155.",
      "Secure integrations with DeFi liquidity pools.",
      "Custom decentralized voting and DAO coordination layers.",
      "Fully audited smart contract deployments."
    ],
    img: blockchainImg
  }
];

/* -------------------------- Page -------------------------- */
export default function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  return (
    <main className="bg-[color:var(--space-0)] text-[color:var(--foreground)] overflow-x-clip min-h-screen relative noise pb-20">
      <Progress />
      <LuxuryCursor />
      <Navbar />
      <CosmicSystem />

      {/* Services Hero */}
      <section className="relative pt-44 px-6 md:px-12 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-eyebrow mb-6 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-[color:var(--gold)]" />
            Big Bang Capabilities
            <span className="w-8 h-px bg-[color:var(--gold)]" />
          </motion.div>

          <Reveal>
            <h1 className="text-hero leading-tight">
              Engineering the <span className="gold-text italic">tech cosmos.</span>
            </h1>
          </Reveal>

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
            Explore our nine foundational engineering disciplines. We bring senior strategy, high-fidelity design, and high-scale software development under one operational roof.
          </motion.p>
        </div>
      </section>

      {/* Services Grid & Details */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28 space-y-24">
        {SERVICES_DETAILS.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="scroll-mt-32 border-b border-white/5 pb-20"
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Text Area */}
              <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-[color:var(--gold)] font-medium">
                    {service.id}
                  </span>
                  <div className="w-10 h-px bg-[color:var(--gold)]/40" />
                  <span className="text-xs uppercase tracking-widest text-white/40">Capability</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {service.title}
                </h2>
                <p className="text-[color:var(--gold-champagne)] font-medium text-lg italic">
                  {service.tagline}
                </p>
                <p className="text-[color:var(--muted-foreground)] text-sm md:text-base leading-relaxed">
                  {service.desc}
                </p>

                {/* Bullet Points */}
                <ul className="grid sm:grid-cols-2 gap-4 text-xs text-white/80">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex gap-2.5 items-start">
                      <span className="text-[color:var(--gold)] text-sm font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-[10px] font-mono border border-[color:var(--gold)]/20 bg-white/[0.02] text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Graphic/Mockup Area */}
              <div className={`lg:col-span-5 flex justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md surface-card overflow-hidden p-2 flex items-center justify-center bg-white/[0.01]"
                >
                  <img src={service.img} alt={service.title} className="w-full h-auto object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Services Footer CTA */}
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
            Select a custom stack, automate redundant structures, or launch a fresh digital product. We take it from diagram to deployment.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn-gold">Start your project →</Link>
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
