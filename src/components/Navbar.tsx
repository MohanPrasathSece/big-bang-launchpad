import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import bbtLogo from "../assets/bbt-logo.png";

/* -------------------------- Logo -------------------------- */
export function BigBangMark({ size = 36 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-[color:var(--gold)] mix-blend-screen"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.img
        src={bbtLogo}
        alt="Big Bang Tech Logo"
        width={size}
        height={size}
        className="object-contain relative z-10"
        initial={{ opacity: 0, scale: 0.2, filter: "brightness(2) blur(10px)" }}
        animate={{ opacity: 1, scale: [1.2, 0.95, 1], filter: "brightness(1) blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.7, 1] }}
      />
    </div>
  );
}

/* -------------------------- Navbar Component -------------------------- */
export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Monitor scroll for capsule adjustments
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  // Helper to determine active link
  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/" && !location.hash;
    }
    if (href.startsWith("/#")) {
      const hash = href.split("#")[1];
      return location.pathname === "/" && location.hash === `#${hash}`;
    }
    return location.pathname === href;
  };

  // Click handler to smooth scroll if we are on the target page
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href === "/") {
      const hash = href.includes("#") ? href.split("#")[1] : "top";
      if (location.pathname === "/") {
        e.preventDefault();
        const element = hash === "top" ? null : document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        } else if (hash === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-5xl w-[calc(100%-2rem)] rounded-full border transition-all duration-300 flex items-center justify-between shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.03)]
        ${isScrolled 
          ? "py-2.5 px-5 bg-black/80 border-gold/30 backdrop-blur-xl" 
          : "py-3.5 px-6 bg-black/50 border-white/10 backdrop-blur-lg"
        }`}
    >
      {/* Logo */}
      <Link to="/" onClick={(e) => handleLinkClick(e, "/")} className="flex items-center gap-3 group">
        <BigBangMark size={32} />
        <span className="font-display font-semibold tracking-tight text-[15px] text-white">
          Big Bang<span className="text-[color:var(--gold)] transition-transform duration-300 group-hover:scale-125 inline-block">.</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className={`transition-colors relative py-1 ${
              isActive(item.href)
                ? "text-[color:var(--gold)]"
                : "text-[color:var(--muted-foreground)] hover:text-white"
            }`}
          >
            {item.label}
            {isActive(item.href) && (
              <motion.span
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[color:var(--gold)] rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Action CTA Button */}
      <div className="hidden md:block">
        <Link
          to="/contact"
          className="btn-gold !py-2.5 !px-5 text-xs tracking-wide uppercase"
        >
          Start a project
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-[color:var(--muted-foreground)] hover:text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 mt-3 p-6 rounded-3xl border border-white/10 bg-black/95 backdrop-blur-xl flex flex-col gap-4 shadow-2xl z-40 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => {
                  setIsOpen(false);
                  handleLinkClick(e, item.href);
                }}
                className={`text-sm font-semibold uppercase tracking-widest py-2.5 border-b border-white/5 transition-colors ${
                  isActive(item.href)
                    ? "text-[color:var(--gold)]"
                    : "text-[color:var(--muted-foreground)] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-gold justify-center text-center w-full !py-3 text-xs tracking-wide uppercase mt-2"
            >
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
