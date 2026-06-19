import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar, { BigBangMark } from "./components/Navbar";
import Footer from "./components/Footer";

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
    <h1 className="text-hero leading-tight">
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

/* -------------------------- Form Field -------------------------- */
interface FieldProps {
  label: string;
  type: string;
  name: string;
  required?: boolean;
}

function Field({ label, type, name, required = false }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const active = focused || val.length > 0;
  return (
    <div className="relative pt-6">
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          active
            ? "top-0 text-[15px] text-[color:var(--gold)] tracking-[0.2em] uppercase"
            : "top-8 text-base text-[color:var(--muted-foreground)]"
        }`}
      >
        {label} {required && <span className="text-[color:var(--gold)]">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-transparent border-b border-white/10 focus:border-[color:var(--gold)] outline-none py-3 text-lg resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-transparent border-b border-white/10 focus:border-[color:var(--gold)] outline-none py-3 text-lg transition-colors"
        />
      )}
    </div>
  );
}

/* -------------------------- Accordion Item -------------------------- */
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-display text-lg md:text-xl font-medium text-white group-hover:text-[color:var(--gold)] transition-colors">
          {question}
        </span>
        <span className="text-xl text-[color:var(--gold)] ml-4 font-mono select-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-[15px] md:text-[15px] text-[color:var(--muted-foreground)] leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

/* -------------------------- Main Component -------------------------- */
export default function ContactPage() {
  const { pathname } = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const err = await response.json();
        console.error("Failed to send message:", err);
        alert(err.message || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const FAQS = [
    {
      q: "What is your typical project engagement timeline?",
      a: "For MVPs and custom software launches, our sprint build cycles typically span 4 to 8 weeks. Larger cloud re-architectures or deep enterprise AI integrations can range from 3 to 6 months depending on requirements."
    },
    {
      q: "Do you sign Non-Disclosure Agreements (NDAs)?",
      a: "Yes, confidentiality is standard. We sign mutual NDAs before sharing telemetry plans, technical specifications, or code diagrams to protect your IP."
    },
    {
      q: "How does the pricing and billing model work?",
      a: "We work on fixed-scope project agreements based on our initial blueprints, split across milestone payments. For continuous optimization, SLA infrastructure support, or retainer sprints, we offer monthly advisory agreements."
    },
    {
      q: "Will we own the full source code and infrastructure assets?",
      a: "Absolutely. 100% of all code repositories, cloud topology credentials, and configuration files created during our partnership belong completely to you, delivered transparently."
    }
  ];

  return (
    <main className="bg-[color:var(--space-0)] text-[color:var(--foreground)] overflow-x-clip min-h-screen relative noise pb-20">
      <Progress />
      <LuxuryCursor />
      <Navbar />
      <CosmicSystem />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-44 px-6 md:px-12 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-eyebrow mb-6 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-[color:var(--gold)]" />
            Send a transmission
            <span className="w-8 h-px bg-[color:var(--gold)]" />
          </motion.div>

          <SplitHeadline text="Connect with the cosmos." />

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
            Have a project in mind or want to explore potential integrations? Send us a message and we'll route it directly to our directors.
          </motion.p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 surface-card p-6 md:p-12 relative overflow-hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <div className="w-20 h-20 rounded-full border border-[color:var(--gold)] flex items-center justify-center mx-auto relative">
                <div className="absolute inset-1 rounded-full border border-[color:var(--gold)]/20 animate-ping" />
                <span className="text-[color:var(--gold)] text-3xl">✓</span>
              </div>
              <h3 className="font-display text-3xl font-bold">Transmission Received</h3>
              <p className="text-[color:var(--muted-foreground)] max-w-md mx-auto text-[15px]">
                Your signal has successfully traversed the system. Our team will review the parameters and follow up within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-ghost mt-6 text-[15px] uppercase tracking-wider"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Your name" type="text" name="name" required />
                <Field label="Email address" type="email" name="email" required />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Mobile number" type="tel" name="phone" />
                <Field label="Company / Organisation" type="text" name="company" />
              </div>
              <Field label="Tell us about your project" type="textarea" name="details" required />
              
              <div className="flex items-center justify-between flex-wrap gap-4 pt-6">
                <p className="text-[15px] uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
                  Response within 24 hours
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-space-0 border-t-transparent rounded-full animate-spin" />
                      Routing...
                    </span>
                  ) : (
                    <>
                      Send transmission <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-12">
          {/* Coordinates */}
          <div className="space-y-6">
            <div className="text-eyebrow">Cosmic Coordinates</div>
            <h3 className="font-display text-3xl font-semibold">Where we orbit.</h3>
            <p className="text-[15px] md:text-[15px] text-[color:var(--muted-foreground)] leading-relaxed">
              While we operate with a distributed cloud-first team, our physical directors operate out of key commercial nodes.
            </p>
            
            <div className="space-y-6 pt-4">
              {[
                { city: "India" },
                { city: "Dubai" }
              ].map((loc) => (
                <div key={loc.city} className="flex gap-4 items-start border-l border-[color:var(--gold)]/30 pl-4 py-1">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white leading-tight">{loc.city}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Channels */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="text-[15px] uppercase tracking-widest text-white/40">Direct Signals</div>
            <div className="space-y-2 text-[15px]">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[color:var(--muted-foreground)]">General inquiries</span>
                <a href="mailto:info@thebigbangtech.com" className="text-white hover:text-[color:var(--gold)] transition">
                  info@thebigbangtech.com
                </a>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[color:var(--muted-foreground)]">Founder Desk</span>
                <a href="mailto:aveys@thebigbangtech.com" className="text-white hover:text-[color:var(--gold)] transition">
                  aveys@thebigbangtech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mt-20 md:mt-32 section-divider pt-20 md:pt-32">
        <div className="text-eyebrow text-center mb-6">FAQ</div>
        <h2 className="text-section text-center mb-10 md:mb-16">Clear parameters.</h2>
        
        <div className="space-y-2">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}


