"use client";

import { useState, useEffect } from "react";
import LinkNext from "next/link";
import Image from "next/image";
import { 
  ChevronDown, 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  LayoutGrid, 
  Sparkles, 
  Building2, 
  Compass, 
  FileText, 
  ChevronUp,
  MapPin,
  Mail,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceDivisions = [
  { 
    name: "Glazing & Facades", 
    href: "/services/glazing-facades", 
    desc: "Curtain walls, unitized facades, and custom structural glazing.",
    icon: LayoutGrid
  },
  { 
    name: "Doors & Windows", 
    href: "/services/doors-windows", 
    desc: "Minimal slim systems, sliding profiles, and thermal doors.",
    icon: Sparkles
  },
  { 
    name: "Interior Partitions", 
    href: "/services/interior-partitions", 
    desc: "Minimalist glass office walls and acoustic partition systems.",
    icon: Building2
  },
  { 
    name: "Outdoor & Shading", 
    href: "/services/outdoor-shading", 
    desc: "Motorized pergolas, automated louvers, and glass canopy roofs.",
    icon: Compass
  },
];

const companyLinks = [
  { 
    name: "Why Choose Us", 
    href: "/why-choose-us", 
    desc: "Our structural engineering focus and precision tolerances." 
  },
  { 
    name: "Gallery", 
    href: "/gallery", 
    desc: "Explore completed private villas and commercial campuses." 
  },
  { 
    name: "Industries", 
    href: "/industries", 
    desc: "Tailored glazing for corporate, residential, and factories." 
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [rawIsMobileMenuOpen, _setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [mobileMenuView, setMobileMenuView] = useState<"main" | "services" | "company">("main");

  const isMobileMenuOpen = rawIsMobileMenuOpen;
  const setIsMobileMenuOpen = (open: boolean | ((prev: boolean) => boolean)) => {
    _setIsMobileMenuOpen((prev) => {
      const nextVal = typeof open === "function" ? open(prev) : open;
      if (!nextVal) {
        setMobileMenuView("main");
      }
      return nextVal;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const linkClass = "text-[10px] xl:text-[11px] 2xl:text-[12px] uppercase tracking-[0.08em] xl:tracking-[0.12em] 2xl:tracking-[0.15em] font-heading font-extrabold text-heading hover:text-accent transition-colors luxury-underline py-2";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#FCFBFA]/95 backdrop-blur-md shadow-lg py-3 border-b border-accent/20" 
            : "bg-[#FCFBFA]/60 backdrop-blur-md py-3 border-b border-accent/10"
        }`}
      >
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LinkNext href="/" className="flex-shrink-0 flex items-center">
            <Image 
              src="/shreehari-alu-corporation-logo.svg" 
              alt="Shree Hari Alu Corporation Logo" 
              width={240} 
              height={75} 
              className="w-auto h-11 xl:h-13 2xl:h-15 transition-all duration-500"
              priority
              loading="eager"
            />
          </LinkNext>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2.5 xl:space-x-5 2xl:space-x-7">
            <LinkNext href="/" className={linkClass}>Home</LinkNext>
            <LinkNext href="/about" className={linkClass}>About</LinkNext>
            
            <div 
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <LinkNext 
                href="/services" 
                className={`flex items-center cursor-pointer gap-1 ${linkClass}`}
                onClick={() => setIsServicesOpen(false)}
              >
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
              </LinkNext>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 right-0 mx-auto pt-3.5 w-full max-w-[880px] z-50 text-left"
                  >
                    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,37,42,0.15)] border border-accent/25 p-5 grid grid-cols-12 gap-6 overflow-hidden relative">
                      {/* Background soft grid */}
                      <div className="absolute inset-0 cad-grid opacity-10 pointer-events-none" />

                      {/* Columns 1 & 2: Divisions Grid */}
                      <div className="col-span-8 grid grid-cols-2 gap-4 relative z-10">
                        <div className="col-span-2 pb-2 border-b border-primary/5">
                          <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold">
                            Core Divisions
                          </span>
                        </div>

                        {serviceDivisions.map((service, index) => {
                          const IconComponent = service.icon;
                          return (
                            <LinkNext 
                              key={index} 
                              href={service.href}
                              className="group p-3 rounded-xl hover:bg-accent-light/30 border border-transparent hover:border-accent/15 transition-all duration-300 flex gap-3"
                            >
                              <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center border border-accent/10 group-hover:bg-accent/10 transition-colors flex-shrink-0">
                                <IconComponent className="w-4 h-4 text-accent" />
                              </div>
                              <div className="space-y-0.5">
                                <h4 className="text-[12px] font-heading font-extrabold text-primary uppercase tracking-wider group-hover:text-accent transition-colors">
                                  {service.name}
                                </h4>
                                <p className="text-[10px] text-body/80 leading-relaxed font-light line-clamp-2">
                                  {service.desc}
                                </p>
                              </div>
                            </LinkNext>
                          );
                        })}
                      </div>

                      {/* Column 3: Featured visual card */}
                      <div className="col-span-4 bg-[#032326] rounded-xl p-4 border border-accent/20 relative overflow-hidden flex flex-col justify-between text-white text-left z-10 shadow-inner">
                        <div className="absolute inset-0 cad-grid opacity-20 pointer-events-none" />
                        
                        <div className="space-y-2">
                          <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-[7px] font-mono text-accent uppercase tracking-wider inline-block">
                            Architectural Spec
                          </span>
                          <h4 className="text-[13px] font-heading font-extrabold tracking-wider uppercase text-white leading-snug">
                            Corporate Brochure
                          </h4>
                          <p className="text-[10px] text-white/70 font-light leading-relaxed">
                            Download our complete profile details and sizing catalog guide.
                          </p>
                        </div>

                        <a 
                          href="/Shreehari-Alu-Brochure.pdf" 
                          target="_blank"
                          className="mt-4 w-full bg-accent hover:bg-accent/90 text-white py-2 px-3 rounded-lg text-[9px] font-mono tracking-wider uppercase font-bold text-center flex items-center justify-center gap-1.5 transition-colors border border-accent/20"
                        >
                          <FileText className="w-3.5 h-3.5" /> Download catalog
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <LinkNext href="/products" className={linkClass}>Products</LinkNext>
            <LinkNext href="/projects" className={linkClass}>Projects</LinkNext>
            
            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button className={`flex items-center cursor-pointer gap-1 ${linkClass}`}>
                Company <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCompanyOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isCompanyOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3.5 w-64 z-50 text-left"
                  >
                    <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,37,42,0.15)] border border-accent/25 p-3 flex flex-col space-y-1.5">
                      <div className="px-2 py-1.5 border-b border-primary/5">
                        <span className="text-[8px] font-mono tracking-widest text-accent uppercase font-bold">
                          Corporate Links
                        </span>
                      </div>

                      {companyLinks.map((link, index) => (
                        <LinkNext 
                          key={index} 
                          href={link.href}
                          className="group p-2 rounded-lg hover:bg-accent-light/35 transition-all text-left block"
                        >
                          <span className="block text-[11px] font-heading font-extrabold uppercase tracking-wider text-primary group-hover:text-accent transition-colors">
                            {link.name}
                          </span>
                          <span className="block text-[9px] text-body/70 font-light mt-0.5 leading-snug">
                            {link.desc}
                          </span>
                        </LinkNext>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <LinkNext href="/contact" className={linkClass}>Contact</LinkNext>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
            <a href="tel:+919876543210" className={`flex items-center transition-colors ${linkClass}`}>
              <Phone className="w-3 h-3 xl:w-3.5 xl:h-3.5 mr-1 xl:mr-1.5 text-accent" />
              <span className="hidden xl:inline">Inquiry</span>
            </a>
            <LinkNext 
              href="/request-quote" 
              className={`px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full font-heading font-extrabold text-[10px] xl:text-[11px] uppercase tracking-wider transition-all duration-300 border ${
                isScrolled 
                  ? "bg-accent hover:bg-[#b59556] text-white border-accent shadow-md shadow-accent/15 hover:scale-[1.01]" 
                  : "bg-primary hover:bg-primary-hover text-white border-primary shadow-md hover:scale-[1.01]"
              }`}
            >
              Request Quote
            </LinkNext>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary cursor-pointer z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-primary w-6 h-6" />
            ) : (
              <Menu className="text-primary w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>

    {/* ================= MOBILE DRAWER MENU ================= */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          key="mobile-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#032326]/40 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {isMobileMenuOpen && (
        <motion.div
          key="mobile-drawer-panel"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
          className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-[#FCFBFA] shadow-2xl z-[100] lg:hidden p-6 pt-20 flex flex-col justify-between border-l border-accent/20"
        >
          {/* Close Button inside Drawer */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2 text-primary cursor-pointer hover:text-accent transition-colors z-[110]"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
              {/* CAD blueprint grid background */}
              <div className="absolute inset-0 cad-grid opacity-[0.04] pointer-events-none" />

              <div className="space-y-6 overflow-y-auto pr-1 flex-grow">
                <AnimatePresence mode="wait">
                  {mobileMenuView === "main" && (
                    <motion.div
                      key="main"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col space-y-1 font-heading"
                    >
                      <LinkNext href="/" className="text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 border-b border-primary/5 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>Home</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary/30" />
                      </LinkNext>
                      
                      <LinkNext href="/about" className="text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 border-b border-primary/5 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>About Us</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary/30" />
                      </LinkNext>

                      <button 
                        onClick={() => setMobileMenuView("services")}
                        className="w-full flex items-center justify-between text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 border-b border-primary/5 cursor-pointer text-left"
                      >
                        <span>Services</span>
                        <ChevronRight className="w-4 h-4 text-accent" />
                      </button>

                      <LinkNext href="/products" className="text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 border-b border-primary/5 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>Products</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary/30" />
                      </LinkNext>

                      <LinkNext href="/projects" className="text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 border-b border-primary/5 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>Projects</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary/30" />
                      </LinkNext>

                      <button 
                        onClick={() => setMobileMenuView("company")}
                        className="w-full flex items-center justify-between text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 border-b border-primary/5 cursor-pointer text-left"
                      >
                        <span>Company</span>
                        <ChevronRight className="w-4 h-4 text-accent" />
                      </button>

                      <LinkNext href="/contact" className="text-primary hover:text-accent font-extrabold text-[14px] uppercase tracking-wider py-3 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>Contact</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary/30" />
                      </LinkNext>
                    </motion.div>
                  )}

                  {mobileMenuView === "services" && (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <button 
                        onClick={() => setMobileMenuView("main")}
                        className="flex items-center gap-1.5 text-accent font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-80 py-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to menu
                      </button>

                      <h3 className="text-lg font-heading font-bold text-primary uppercase tracking-wider border-b border-primary/5 pb-2">
                        Services
                      </h3>

                      <div className="flex flex-col space-y-3">
                        {serviceDivisions.map((service, index) => {
                          const IconComponent = service.icon;
                          return (
                            <LinkNext 
                              key={index}
                              href={service.href} 
                              className="group flex gap-3.5 p-3 rounded-xl bg-primary/[0.02] hover:bg-accent-light/20 border border-primary/5 hover:border-accent/15 transition-all text-left"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center border border-accent/10 flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                                <IconComponent className="w-4 h-4 text-accent" />
                              </div>
                              <div className="space-y-0.5">
                                <span className="block text-primary group-hover:text-accent font-extrabold text-[12px] uppercase tracking-wider transition-colors">
                                  {service.name}
                                </span>
                                <span className="block text-[10px] text-body leading-relaxed font-light line-clamp-2">
                                  {service.desc}
                                </span>
                              </div>
                            </LinkNext>
                          );
                        })}
                      </div>

                      {/* brochure catalog spec */}
                      <div className="p-4 bg-[#032326] rounded-xl text-white relative overflow-hidden shadow-inner mt-4 border border-accent/15">
                        <div className="absolute inset-0 cad-grid opacity-10 pointer-events-none" />
                        <div className="relative z-10 space-y-2">
                          <span className="px-2 py-0.5 rounded bg-accent/15 border border-accent/25 text-[7px] font-mono text-accent uppercase tracking-wider inline-block">
                            Architectural Spec
                          </span>
                          <h4 className="text-[12px] font-heading font-extrabold tracking-wider uppercase text-white leading-snug">
                            Corporate Brochure
                          </h4>
                          <p className="text-[10px] text-white/70 font-light leading-relaxed">
                            Download complete profile specs and size guide details.
                          </p>
                          <a 
                            href="/Shreehari-Alu-Brochure.pdf" 
                            target="_blank"
                            className="mt-3 w-full bg-accent hover:bg-accent/90 text-white py-2 px-3 rounded-lg text-[9px] font-mono tracking-wider uppercase font-bold text-center flex items-center justify-center gap-1.5 transition-colors border border-accent/20"
                          >
                            <FileText className="w-3.5 h-3.5" /> Download brochure
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {mobileMenuView === "company" && (
                    <motion.div
                      key="company"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <button 
                        onClick={() => setMobileMenuView("main")}
                        className="flex items-center gap-1.5 text-accent font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-80 py-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to menu
                      </button>

                      <h3 className="text-lg font-heading font-bold text-primary uppercase tracking-wider border-b border-primary/5 pb-2">
                        Company
                      </h3>

                      <div className="flex flex-col space-y-2">
                        {companyLinks.map((link, index) => (
                          <LinkNext 
                            key={index}
                            href={link.href} 
                            className="group p-3 rounded-xl bg-primary/[0.02] hover:bg-accent-light/20 border border-primary/5 hover:border-accent/15 transition-all text-left block"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="block text-[12px] font-heading font-extrabold uppercase tracking-wider text-primary group-hover:text-accent transition-colors">
                              {link.name}
                            </span>
                            <span className="block text-[10px] text-body font-light leading-relaxed mt-1">
                              {link.desc}
                            </span>
                          </LinkNext>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Drawer Footer info & Call-to-actions */}
              <div className="mt-8 pt-4 border-t border-primary/5 space-y-4 relative z-10">
                <div className="space-y-2 text-[10px] text-body/70 font-light">
                  <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>+91 98765 43210</span>
                  </a>
                  <a href="mailto:info@shreeharialu.com" className="flex items-center gap-2 hover:text-accent">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>info@shreeharialu.com</span>
                  </a>
                </div>

                <LinkNext 
                  href="/request-quote" 
                  className="bg-accent hover:bg-[#b59556] text-white text-center py-3 rounded-full font-heading font-extrabold text-[11px] uppercase tracking-wider transition-colors shadow-lg shadow-accent/15 block w-full border border-accent/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Quote
                </LinkNext>

                <div className="text-[7px] font-mono text-body/30 text-center uppercase tracking-widest">
                  SHREE HARI ALU // SYSTEMS
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}
