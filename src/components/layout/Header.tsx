"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Aluminium Sliding Windows", href: "/services#sliding-windows" },
  { name: "Aluminium Casement Windows", href: "/services#casement-windows" },
  { name: "Aluminium Doors", href: "/services#aluminium-doors" },
  { name: "Bi-Fold Doors", href: "/services#bi-fold-doors" },
  { name: "Slimline Sliding Systems", href: "/services#slimline" },
  { name: "Structural Glazing", href: "/services#structural-glazing" },
  { name: "Curtain Wall Systems", href: "/services#curtain-wall" },
  { name: "Glass Facades", href: "/services#glass-facades" },
];

const companyLinks = [
  { name: "Why Choose Us", href: "/why-choose-us" },
  { name: "Gallery", href: "/gallery" },
  { name: "Industries", href: "/industries" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = "text-xs lg:text-[13px] xl:text-[14px] uppercase tracking-wider font-heading font-bold text-heading hover:text-accent transition-colors luxury-underline";

  const iconClass = "text-heading w-6 h-6";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#FCFBFA]/95 backdrop-blur-md shadow-lg py-3 border-b border-accent/25" 
          : "bg-[#FCFBFA]/60 backdrop-blur-md py-5 border-b border-accent/15"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image 
              src="/shreehari-alu-corporation-logo.svg" 
              alt="Shree Hari Alu Corporation Logo" 
              width={180} 
              height={55} 
              className={`w-auto transition-all duration-500 ${
                isScrolled ? "h-9 lg:h-10" : "h-10 lg:h-12"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className={linkClass}>Home</Link>
            <Link href="/about" className={linkClass}>About</Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`flex items-center cursor-pointer ${linkClass}`}>
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[580px] bg-white/98 backdrop-blur-lg rounded-2xl shadow-2xl border border-accent/20 p-5 grid grid-cols-2 gap-3"
                  >
                    {services.map((service, index) => (
                      <Link 
                        key={index} 
                        href={service.href}
                        className="text-body hover:text-accent hover:bg-accent-light p-2.5 rounded-lg transition-colors text-[13px] lg:text-sm font-semibold uppercase tracking-wider"
                      >
                        {service.name}
                      </Link>
                    ))}
                    <div className="col-span-2 pt-3 mt-1 border-t border-border flex justify-center">
                      <Link href="/services" className="text-primary font-heading font-bold text-xs lg:text-sm uppercase tracking-widest hover:text-accent flex items-center">
                        View All Services &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/products" className={linkClass}>Products</Link>
            <Link href="/projects" className={linkClass}>Projects</Link>
            
            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button className={`flex items-center cursor-pointer ${linkClass}`}>
                Company <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isCompanyOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-white/98 backdrop-blur-lg rounded-xl shadow-2xl border border-accent/20 p-3 flex flex-col space-y-1.5"
                  >
                    {companyLinks.map((link, index) => (
                      <Link 
                        key={index} 
                        href={link.href}
                        className="text-body hover:text-accent hover:bg-accent-light p-2 rounded-lg transition-colors text-[13px] lg:text-sm font-semibold uppercase tracking-wider"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className={linkClass}>Contact</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            <a href="tel:+919876543210" className={`flex items-center transition-colors ${linkClass}`}>
              <Phone className="w-4 h-4 mr-2" />
              Inquiry
            </a>
            <Link 
              href="/request-quote" 
              className={`px-6 py-2.5 lg:px-7 lg:py-3 rounded-full font-heading font-bold text-xs lg:text-[13px] xl:text-[14px] uppercase tracking-wider transition-all duration-300 border ${
                isScrolled 
                  ? "bg-accent hover:bg-[#b59556] text-white border-accent shadow-md shadow-accent/15" 
                  : "bg-primary hover:bg-primary-hover text-white border-primary shadow-md"
              }`}
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-heading"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={iconClass} />
            ) : (
              <Menu className={iconClass} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-border overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link href="/" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/about" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link href="/services" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link href="/products" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
              <Link href="/projects" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link href="/why-choose-us" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Why Choose Us</Link>
              <Link href="/gallery" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link href="/industries" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Industries</Link>
              <Link href="/contact" className="text-heading font-heading font-bold text-sm uppercase tracking-wider hover:text-accent py-1.5 border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link 
                href="/request-quote" 
                className="bg-primary hover:bg-primary-hover text-white text-center px-6 py-3.5 rounded-full font-heading font-bold text-sm uppercase tracking-wider transition-colors shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
