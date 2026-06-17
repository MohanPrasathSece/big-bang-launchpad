import { Link } from "react-router-dom";
import { BigBangMark } from "./Navbar";

export default function Footer() {
  return (
    <footer className="relative mt-32 px-6 md:px-12 pt-24 pb-12 overflow-hidden bg-[color:var(--space-1)] border-t border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[color:var(--gold)]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[color:var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-16 lg:gap-24 mb-20">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-4 group mb-8">
              <BigBangMark size={56} />
              <span className="font-display font-bold text-3xl text-white group-hover:text-[color:var(--gold)] transition-colors">
                Big Bang<span className="text-[color:var(--gold)] group-hover:text-white transition-colors">.</span>
              </span>
            </Link>
            <p className="text-[color:var(--muted-foreground)] text-sm md:text-base leading-relaxed max-w-sm mb-10">
              A premium technology studio engineering intelligent systems, robust software, and autonomous agents for the boldest enterprises on earth.
            </p>
            
            <div className="flex gap-4">
              <Link to="/contact" className="btn-gold py-2 px-6 text-xs">Start a project</Link>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] mb-6 font-bold">Platform</div>
              <ul className="space-y-4 text-sm text-white/70">
                <li><Link to="/about" className="hover:text-[color:var(--gold)] transition-colors">About the Studio</Link></li>
                <li><Link to="/services" className="hover:text-[color:var(--gold)] transition-colors">Our Capabilities</Link></li>
                <li><Link to="/contact" className="hover:text-[color:var(--gold)] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] mb-6 font-bold">Services</div>
              <ul className="space-y-4 text-sm text-white/70">
                <li><Link to="/services" className="hover:text-[color:var(--gold)] transition-colors">AI & Automation</Link></li>
                <li><Link to="/services" className="hover:text-[color:var(--gold)] transition-colors">Cloud Architecture</Link></li>
                <li><Link to="/services" className="hover:text-[color:var(--gold)] transition-colors">Custom Software</Link></li>
                <li><Link to="/services" className="hover:text-[color:var(--gold)] transition-colors">RCM & Billing</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] mb-6 font-bold">Orbit</div>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="#" className="hover:text-[color:var(--gold)] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[color:var(--gold)] transition-colors">X / Twitter</a></li>
                <li><a href="#" className="hover:text-[color:var(--gold)] transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-[color:var(--muted-foreground)] uppercase tracking-[0.2em]">
          <span>© {new Date().getFullYear()} Big Bang Tech Solutions Pvt Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[color:var(--gold)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[color:var(--gold)] transition-colors">Terms of Service</a>
          </div>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Systems Online
          </span>
        </div>
      </div>
    </footer>
  );
}
