"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ArrowUpRight, HelpCircle, X, Phone, ChevronRight, Home as HomeIcon, Building2, Factory } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProcessSection from "@/components/ui/ProcessSection";

// Premium Unsplash images matching the architecture theme
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  pergola: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
  slidingWindow: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
  servicesWin: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=600",
  servicesGlazing: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
  servicesArch: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600"
};

const testimonials = [
  {
    quote: "Shree Hari Alu understood that the view was the hero. The slimline system is visually quiet, beautifully made and performs exactly as promised.",
    author: "Project Architect · Luxury Residence, Ahmedabad"
  },
  {
    quote: "Their coordination during facade execution was excellent. Every interface was reviewed early, which protected both our design intent and project schedule.",
    author: "Development Director · Commercial Campus, Surat"
  },
  {
    quote: "From sample selection to final handover, communication remained clear. The installation team treated the finished villa with real care.",
    author: "Homeowner · Private Villa, Vadodara"
  }
];

const faqs = [
  {
    q: "Do you work directly with architects and facade consultants?",
    a: "Yes. We support design development, system selection, performance reviews, sample approvals, shop drawings and interface coordination from early design through installation."
  },
  {
    q: "Can you customise window and door systems?",
    a: "Yes. Panel sizes, configurations, finishes, glass specifications, hardware and automation can be tailored within tested engineering limits and the needs of your project."
  },
  {
    q: "Which cities do you serve?",
    a: "We execute projects across India, with scope and mobilisation planned around project size, programme and technical requirements."
  },
  {
    q: "How early should we involve your team?",
    a: "Ideally during design development. Early involvement helps optimise openings, interfaces, glass build-ups and budgets before structural and finishing decisions are locked."
  }
];

const HERO_SLIDES = [
  {
    project: "The Courtyard Villa, Ahmedabad",
    scope: "Minimal Slim Sliding Windows",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    tagline: "01 // MINIMAL GLIDING",
    titlePart1: "Engineering",
    titlePart2: "Elegance",
    titlePart3: "in Every Opening.",
    description: "Elevate your spaces with world-class aluminium windows, doors, and facade systems designed for uncompromised luxury and performance.",
    specs: [
      { label: "Sightline", value: "28mm Slim Profile" },
      { label: "Water Sealing", value: "Class A4 (450 Pa)" },
      { label: "Glass Tech", value: "Acoustic Double Glazed" }
    ],
    blueprintPath: (
      <svg className="w-full h-full text-accent/60 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.85">
        <rect x="10" y="10" width="80" height="80" rx="3" />
        <rect x="14" y="14" width="72" height="72" rx="2" strokeDasharray="2,2" />
        <line x1="50" y1="10" x2="50" y2="90" />
        <circle cx="50" cy="50" r="1.5" fill="currentColor" />
        <rect x="20" y="20" width="24" height="60" />
        <rect x="56" y="20" width="24" height="60" />
        <line x1="10" y1="5" x2="90" y2="5" stroke="currentColor" strokeWidth="0.5" />
        <text x="50" y="4" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" className="font-heading tracking-widest font-bold">W: 3200mm</text>
        <text x="7" y="50" textAnchor="middle" fontSize="3.5" transform="rotate(-90 7 50)" fill="currentColor" stroke="none" className="font-heading tracking-widest font-bold">H: 2400mm</text>
      </svg>
    )
  },
  {
    project: "Meridian Business House, Surat",
    scope: "Structural Glazing & Curtain Walls",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tagline: "02 // FACADE ENGINEERING",
    titlePart1: "Sculpting",
    titlePart2: "Light & Space",
    titlePart3: "with Facades.",
    description: "State-of-the-art curtain walls and structural glazing systems that create iconic, energy-efficient commercial landmarks.",
    specs: [
      { label: "U-Value", value: "Thermal < 1.4 W/m²K" },
      { label: "Wind Load", value: "A4 Max (3.5 kPa)" },
      { label: "Concealed Sash", value: "Fully Integrated" }
    ],
    blueprintPath: (
      <svg className="w-full h-full text-accent/60 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.85">
        <rect x="15" y="15" width="70" height="70" />
        <line x1="15" y1="50" x2="85" y2="50" />
        <line x1="50" y1="15" x2="50" y2="85" />
        <line x1="15" y1="15" x2="85" y2="85" strokeDasharray="2,2" />
        <line x1="85" y1="15" x2="15" y2="85" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="10" />
        <text x="50" y="9" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" className="font-heading tracking-widest font-bold">GRID TYPE: UNITIZED</text>
      </svg>
    )
  },
  {
    project: "Private Villa Shading, Vadodara",
    scope: "Motorized Louvered Pergolas",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    tagline: "03 // CLIMATE CONTROL",
    titlePart1: "Redefining",
    titlePart2: "Outdoor Living",
    titlePart3: "Seamlessly.",
    description: "Motorized louver rotation and automated climate shielding systems that transform terraces into high-luxury outdoor living areas.",
    specs: [
      { label: "Louver Range", value: "0° - 135° Motorized" },
      { label: "Drainage", value: "100% Concealed Gutter" },
      { label: "System Smart", value: "Somfy Automation" }
    ],
    blueprintPath: (
      <svg className="w-full h-full text-accent/60 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.85">
        <rect x="10" y="30" width="80" height="40" rx="3" />
        <line x1="20" y1="35" x2="30" y2="65" />
        <line x1="35" y1="35" x2="45" y2="65" />
        <line x1="50" y1="35" x2="60" y2="65" />
        <line x1="65" y1="35" x2="75" y2="65" />
        <rect x="15" y="32" width="70" height="36" strokeDasharray="2,2" />
        <text x="50" y="24" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" className="font-heading tracking-widest font-bold">SPAN LIMIT: 6500mm</text>
      </svg>
    )
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScannerHovered, setIsScannerHovered] = useState(false);

  // Auto slider for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Auto slider for hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Auto scanning sweep when not hovered
  useEffect(() => {
    if (isScannerHovered) return;
    
    let direction = 1;
    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        let next = prev + 0.4 * direction;
        if (next >= 92) {
          direction = -1;
          return 92;
        }
        if (next <= 8) {
          direction = 1;
          return 8;
        }
        return next;
      });
    }, 20); // ~50fps
    
    return () => clearInterval(interval);
  }, [isScannerHovered]);

  const openInquiryModal = (product: string) => {
    setInquiryProduct(product);
    setIsInquiryModalOpen(true);
    setInquirySubmitted(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setIsInquiryModalOpen(false);
      setInquirySubmitted(false);
    }, 3000);
  };

  return (
    <>
      {/* Cinematic Fullscreen Widescreen Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02181B] text-white">
        
        {/* Fullscreen Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_SLIDES[activeSlide].image}
                alt={HERO_SLIDES[activeSlide].project}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(2,24,27,0.4)_0%,#02181B_100%)]" />
          <div className="absolute inset-0 z-10 cad-grid opacity-[0.12] pointer-events-none" />
        </div>

        {/* Ambient Moving Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-10 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl z-10 pointer-events-none animate-pulse-slow"></div>

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    {/* Slide Tagline */}
                    <div className="flex items-center space-x-3 text-accent font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                      <span className="w-8 h-[1px] bg-accent" />
                      <span>{HERO_SLIDES[activeSlide].tagline}</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight leading-[1.05]">
                      {HERO_SLIDES[activeSlide].titlePart1}{" "}
                      <span className="text-gradient-gold">{HERO_SLIDES[activeSlide].titlePart2}</span>{" "}
                      {HERO_SLIDES[activeSlide].titlePart3}
                    </h1>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-300 font-sans font-light max-w-xl leading-relaxed">
                      {HERO_SLIDES[activeSlide].description}
                    </p>
                  </div>

                  {/* Specifications Panel */}
                  <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl max-w-xl relative overflow-hidden">
                    <div className="absolute inset-0 cad-grid opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div>
                        <span className="text-[8px] font-mono text-accent uppercase tracking-widest block mb-0.5">Project Scope</span>
                        <h4 className="text-xs font-heading font-bold uppercase text-white tracking-wider">{HERO_SLIDES[activeSlide].project}</h4>
                        <p className="text-[10px] text-gray-400 font-light mt-0.5">{HERO_SLIDES[activeSlide].scope}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 md:gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                        {HERO_SLIDES[activeSlide].specs.map((spec, sIdx) => (
                          <div key={sIdx} className="min-w-[90px]">
                            <span className="text-[7px] font-mono text-gray-500 uppercase tracking-widest block">{spec.label}</span>
                            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons & Slide Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <div className="flex gap-4">
                  <Button href="/request-quote" variant="accent" size="md" className="gold-glow hover:scale-[1.03] transition-transform duration-300" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Free Consultation
                  </Button>
                  <Button href="/projects" variant="outline" size="md" className="hover:scale-[1.03] transition-transform duration-300 border-white/20 hover:border-white/50 text-white bg-transparent">
                    View Our Portfolio
                  </Button>
                </div>
                
                {/* Slideshow Controls */}
                <div className="flex items-center space-x-4 border-l border-white/10 pl-6 h-10 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center space-x-2">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-accent w-6" : "bg-white/20 hover:bg-white/40 w-1.5"}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 tracking-wider">
                    0{activeSlide + 1} // 0{HERO_SLIDES.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Blueprints Glass Panel */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full max-w-[380px] aspect-square rounded-3xl overflow-hidden luxury-ticks border border-accent/30 bg-[#02181B] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-accent/60 cursor-ew-resize select-none group"
                onMouseEnter={() => setIsScannerHovered(true)}
                onMouseLeave={() => setIsScannerHovered(false)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                  setSliderPosition(percentage);
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.touches[0].clientX - rect.left;
                    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                    setSliderPosition(percentage);
                  }
                }}
              >
                {/* CAD Coordinates */}
                <div className="absolute top-4 left-4 z-30 flex items-center space-x-1.5 text-[8px] font-heading font-bold text-accent/80 tracking-wider">
                  <span>23.03° N, 72.54° E</span>
                  <span>/</span>
                  <span className="animate-pulse">AUTO SCANNER</span>
                </div>
                <div className="absolute top-4 right-4 z-30 text-[8px] font-heading font-bold text-accent/80">
                  <span>SEC.01</span>
                </div>

                {/* Base Layer: Blueprint (Shows when slider pulls back) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#011214] z-0">
                  {/* Grid overlay for Blueprint feel */}
                  <div className="absolute inset-0 cad-grid opacity-[0.15]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#011214_90%)]" />

                  {/* Dynamic SVG Blueprint from Slide Data */}
                  <div className="w-44 h-44 mb-2 flex items-center justify-center">
                    {HERO_SLIDES[activeSlide].blueprintPath}
                  </div>
                  
                  <h4 className="text-xs font-heading font-bold text-accent uppercase tracking-wider mb-1">Slimline Frame Section</h4>
                  <p className="text-[10px] text-gray-400 font-light max-w-[200px]">Sweep cursor or touch to slide-reveal architectural finish.</p>
                </div>

                {/* Top Slide Layer: Completed Photo */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden z-10 transition-all duration-75 pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-y-0 left-0 w-[380px] h-[380px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={HERO_SLIDES[activeSlide].image}
                          alt="Architectural execution"
                          fill
                          className="object-cover"
                          sizes="380px"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                    {/* Dark gradient overlay at the bottom of the photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#011214]/90 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 w-[320px] text-left">
                      <span className="text-accent text-[9px] font-heading font-bold uppercase tracking-widest block mb-1">Reality Realized</span>
                      <h4 className="text-xs font-heading font-bold text-white tracking-tight leading-snug">{HERO_SLIDES[activeSlide].project}</h4>
                      <p className="text-[9px] text-gray-300 font-light mt-0.5">{HERO_SLIDES[activeSlide].scope}</p>
                    </div>
                  </div>
                </div>

                {/* Drag Handle Divider */}
                <div
                  className="absolute inset-y-0 z-20 w-[1.5px] bg-accent pointer-events-none flex items-center justify-center shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-[10px] border border-white/20 font-bold shadow-2xl hover:scale-110 transition-transform">
                    ↔
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll Cue Line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer">
          <span className="text-[10px] text-accent font-heading font-bold uppercase tracking-widest mb-3">Scroll</span>
          <div className="w-[1.5px] h-16 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Asymmetrical Who We Are / Intro Section */}
      <Section id="about-intro" background="section" className="relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Asymmetrical visual framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[300px] sm:h-[400px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl premium-border gold-glow">
              <Image
                src={IMAGES.commercial}
                alt="Modern corporate building facade"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Embedded glass overlay badge */}
            <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md text-heading p-8 rounded-2xl shadow-2xl border border-accent/25 max-w-sm hidden md:block">
              <span className="text-accent text-xs font-heading font-bold uppercase tracking-widest block mb-2">End-to-End Excellence</span>
              <p className="text-xs text-body leading-relaxed font-light">
                Our in-house advisory, fabrication, site coordination, and installation teams maintain 100% execution ownership.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Who We Are</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-heading leading-[1.15]">
                Crafting the <span className="text-gradient-dark">Future</span> of Architecture.
              </h2>
            </div>
            <p className="text-body text-base leading-relaxed font-light">
              At Shree Hari Alu, we specialize in delivering world-class aluminium architectural systems that combine exceptional quality, cutting-edge innovation, and breathtaking aesthetics.
            </p>
            <p className="text-body/80 leading-relaxed text-sm">
              Whether you are an architect designing a modern skyscraper, a developer building luxury villas, or a homeowner looking for premium window and door solutions, we have the expertise to bring your vision to life.
            </p>

            {/* Luxury checklist with custom grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              {[
                { title: "Premium Materials", desc: "Sourced from global leaders" },
                { title: "Advanced Engineering", desc: "Tolerances up to 0.5mm" },
                { title: "Bespoke Customization", desc: "To preserve your design intent" },
                { title: "Certified Installation", desc: "By trained in-house experts" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs md:text-sm font-heading font-bold text-heading">{item.title}</h4>
                    <span className="text-[10px] text-body/75">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/about" variant="primary" className="hover:scale-105 transition-transform duration-300">
              Discover Our Story
            </Button>
          </div>
        </div>
      </Section>

      {/* Services summary with custom premium overlay cards */}
      <Section id="services" background="main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Our Capability</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight">What We Do</h2>
          </div>
          <p className="text-body max-w-md text-sm md:text-base leading-relaxed font-light">
            We offer a comprehensive range of aluminium architectural systems designed to meet the highest standards of performance and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Windows & Doors",
              desc: "Premium sliding, casement, and bi-fold systems for residential and commercial spaces.",
              img: IMAGES.servicesWin,
              href: "/services",
              specs: ["28mm - 45mm Interlock", "Up to 48dB Sound Reduction", "Class A4 Water Sealing"],
              blueprint: (
                <svg className="absolute inset-0 w-full h-full p-8 text-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[#FCFBFA]/95 backdrop-blur-[2px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                  <rect x="20" y="20" width="60" height="60" />
                  <line x1="50" y1="20" x2="50" y2="80" />
                  <rect x="25" y="25" width="20" height="50" strokeDasharray="2,2" />
                  <rect x="55" y="25" width="20" height="50" strokeDasharray="2,2" />
                  <text x="50" y="15" textAnchor="middle" fontSize="4" fill="currentColor" stroke="none" className="font-heading font-bold uppercase tracking-wider">Elevation A</text>
                </svg>
              )
            },
            {
              title: "Structural Glazing",
              desc: "State-of-the-art structural glazing and glass facades for modern architectural masterpieces.",
              img: IMAGES.servicesGlazing,
              href: "/services#structural-glazing",
              specs: ["Pressure Equalized Drainage", "Concealed Sash Integration", "Wind Load Class A4 Max"],
              blueprint: (
                <svg className="absolute inset-0 w-full h-full p-8 text-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[#FCFBFA]/95 backdrop-blur-[2px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                  <rect x="15" y="15" width="70" height="70" />
                  <line x1="15" y1="50" x2="85" y2="50" />
                  <line x1="50" y1="15" x2="50" y2="85" />
                  <circle cx="50" cy="50" r="10" />
                  <text x="50" y="10" textAnchor="middle" fontSize="4" fill="currentColor" stroke="none" className="font-heading font-bold uppercase tracking-wider">Facade Section</text>
                </svg>
              )
            },
            {
              title: "Architectural Systems",
              desc: "Skylights, pergolas, glass railings, and office partitions customized to your needs.",
              img: IMAGES.servicesArch,
              href: "/services#pergolas",
              specs: ["Motorized Louver Rotation", "Concealed Perimeter Guttering", "Stainless Steel Anchor Fixings"],
              blueprint: (
                <svg className="absolute inset-0 w-full h-full p-8 text-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[#FCFBFA]/95 backdrop-blur-[2px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                  <rect x="10" y="30" width="80" height="40" rx="3" />
                  <line x1="20" y1="35" x2="30" y2="65" />
                  <line x1="35" y1="35" x2="45" y2="65" />
                  <line x1="50" y1="35" x2="60" y2="65" />
                  <line x1="65" y1="35" x2="75" y2="65" />
                  <text x="50" y="22" textAnchor="middle" fontSize="4" fill="currentColor" stroke="none" className="font-heading font-bold uppercase tracking-wider">Roof Section</text>
                </svg>
              )
            }
          ].map((service, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-accent/40 border border-border transition-all duration-500 group flex flex-col justify-between luxury-ticks">
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-section">
                  {/* Subtle mask gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-70" />
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:opacity-20 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Interactive CAD drawing on hover */}
                  {service.blueprint}
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-heading tracking-tight group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                    <p className="text-body text-xs sm:text-sm leading-relaxed font-light">{service.desc}</p>
                  </div>

                  {/* Specification tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {service.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="text-[9px] uppercase tracking-wider font-heading font-bold bg-section px-2.5 py-1 rounded text-body border border-border/50">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link href={service.href} className="text-primary font-heading font-bold text-xs uppercase tracking-widest flex items-center hover:text-accent transition-colors group/link">
                  Explore Systems <ChevronRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/services" variant="outline" className="hover:scale-105 transition-transform duration-300">View All Services</Button>
        </div>
      </Section>

      {/* Featured Products Section - styled like an luxury product catalogue */}
      <Section id="featured-products" background="primary" className="text-white relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6 relative z-10">
          <div className="max-w-xl space-y-3">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Featured Products</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Quietly sophisticated. Technically exact.
            </h2>
          </div>
          <p className="text-gray-300 max-w-md text-sm md:text-base leading-relaxed font-light">
            Our signature product families balance slender profiles with structural strength, thermal efficiency and daily ease.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            { category: "Windows", title: "Slimline Sliding", desc: "Expansive views with discreet interlocks and smooth multi-track movement.", img: IMAGES.hero },
            { category: "Doors", title: "Statement Pivot", desc: "Generous proportions, concealed hardware and an exceptional arrival experience.", img: IMAGES.villa },
            { category: "Facades", title: "Curtain Wall", desc: "Integrated pressure equalisation, crisp grids and dependable water management.", img: IMAGES.commercial },
            { category: "Outdoor", title: "Louvered Pergola", desc: "Motorised light, shade and rain control in one elegant aluminium structure.", img: IMAGES.pergola }
          ].map((prod, i) => (
            <div key={i} className="bg-[#0a2327] rounded-2xl overflow-hidden border border-accent/15 hover:border-accent/40 transition-all duration-500 group flex flex-col justify-between shadow-2xl">
              <div className="relative h-60 w-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 z-10" />
                <Image
                  src={prod.img}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <button
                  onClick={() => openInquiryModal(prod.title)}
                  className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white hover:bg-accent hover:text-white w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-accent/30 z-20"
                  aria-label={`Inquire about ${prod.title}`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-3 flex-grow">
                <span className="text-accent text-[10px] uppercase tracking-widest font-heading font-bold block">{prod.category}</span>
                <h3 className="text-xl font-heading font-bold text-white tracking-tight">{prod.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed font-light">{prod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="process" background="section" className="border-t border-[#C28B45]/15 !py-8 md:!py-16">
        <div className="container mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10 space-y-3">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading">
              Our Facade Engineering Process
            </h2>
            <p className="text-body max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-2.5 font-light">
              From initial blueprints to after-sales maintenance support, we check every millimeter of your custom glazing.
            </p>
          </div>

          <ProcessSection />

        </div>
      </Section>

      {/* Why Shree Hari Alu (Split Feature, Dark background) */}
      <section className="relative flex flex-col lg:flex-row bg-primary text-white min-h-[580px] border-t border-accent/15">
        <div className="w-full lg:w-1/2 relative h-[380px] lg:h-auto">
          <Image
            src={IMAGES.commercial}
            alt="Precision building facade details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-primary/20" />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center space-y-6">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Why Shree Hari Alu</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
            Performance lives in the details.
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
            Premium materials matter. So do correct drainage paths, tolerances, anchors, sealants, interfaces and installation discipline. We take ownership of all of it.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Application-led system selection",
              "Precision fabrication and checks",
              "Trained project installation teams",
              "Clear documentation & after-care"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-sm font-medium text-white/90">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <Button href="/why-choose-us" variant="accent" className="hover:scale-105 transition-transform">
              Explore Our Standards
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Band Section - Glowing gold counts */}
      <section className="bg-section py-20 border-t border-border border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-heading">
            {[
              { count: "650+", label: "Projects delivered" },
              { count: "18+", label: "Years combined expertise" },
              { count: "42+", label: "Cities served" },
              { count: "96%", label: "Referral-led enquiries" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{stat.count}</div>
                <div className="text-xs text-body font-heading font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section (Cream Background) */}
      <Section id="portfolio-featured" background="section" className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading leading-tight">
              Architecture, beautifully resolved.
            </h2>
          </div>
          <Link href="/projects" className="text-accent font-heading font-bold text-xs uppercase tracking-widest flex items-center hover:text-primary transition-colors group">
            Explore All Projects <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: "The Courtyard Villa",
              meta: "Ahmedabad · Private residence",
              scope: "Slimline sliding · Railings",
              tag: "Residential",
              img: IMAGES.hero
            },
            {
              title: "Meridian Business House",
              meta: "Surat · Corporate campus",
              scope: "Curtain wall · Canopy",
              tag: "Commercial",
              img: IMAGES.commercial
            }
          ].map((project, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden group shadow-2xl hover:shadow-3xl hover:border-accent/40 border border-border transition-all duration-500 flex flex-col justify-between luxury-ticks">
              <div>
                <div className="relative h-[480px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10 opacity-70" />
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-6 left-6 bg-primary text-white text-xs font-heading font-bold tracking-widest uppercase px-4 py-1.5 rounded-full z-20 border border-white/10">
                    {project.tag}
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <span className="text-accent text-[10px] uppercase tracking-widest font-heading font-bold block">{project.meta}</span>
                  <h3 className="text-3xl font-heading font-bold text-heading tracking-tight">{project.title}</h3>
                  <div className="text-sm text-body/80 font-medium">Scope: {project.scope}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Perspectives Testimonial Section */}
      <Section id="testimonials" background="main" className="">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-12">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Client Perspectives</span>

          <div className="relative h-[250px] md:h-[200px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.55 }}
                className="space-y-6"
              >
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading italic font-light text-heading leading-relaxed">
                  “{testimonials[activeTestimonial].quote}”
                </blockquote>
                <cite className="block text-accent font-bold text-xs md:text-sm font-sans uppercase tracking-widest not-italic">
                  {testimonials[activeTestimonial].author}
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === idx ? "bg-accent w-6" : "bg-primary/20 hover:bg-primary/45"
                  }`}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Trusted System Ecosystem Strip */}
      <section className="bg-section py-16 border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs">Trusted system ecosystem</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              "Premium Profiles",
              "Architectural Glass",
              "German Hardware",
              "Performance Sealants",
              "Quality Coatings",
              "Smart Automation"
            ].map((chip, idx) => (
              <div key={idx} className="bg-card text-heading font-heading font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-full border border-border shadow-md">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights / Blog Section */}
      <Section id="insights" background="main" className="">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Insights</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading">
            Better decisions begin with better detail.
          </h2>
          <p className="text-body max-w-xl mx-auto text-sm leading-relaxed mt-4 font-light">
            Practical guidance for architects, developers and homeowners planning high-performance aluminium systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              category: "Design guide · 6 min",
              title: "How slim can a sliding window really be?",
              desc: "A clear guide to sightlines, glass loads, wind pressure and panel sizes.",
              img: IMAGES.hero,
              link: "/products#windows"
            },
            {
              category: "Facade guide · 8 min",
              title: "Curtain wall vs structural glazing",
              desc: "Understand the visual, technical and maintenance differences before specifying.",
              img: IMAGES.commercial,
              link: "/products#facades"
            },
            {
              category: "Outdoor living · 5 min",
              title: "Planning a pergola for Indian weather",
              desc: "Drainage, shade, wind and automation considerations for a better outdoor room.",
              img: IMAGES.pergola,
              link: "/products#architectural"
            }
          ].map((blog, idx) => (
            <div key={idx} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border flex flex-col justify-between group">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-8 space-y-3 flex-grow">
                <span className="text-accent text-[10px] font-bold tracking-widest uppercase font-heading block">{blog.category}</span>
                <h3 className="text-xl font-heading font-bold text-heading leading-snug tracking-tight">{blog.title}</h3>
                <p className="text-body text-xs leading-relaxed font-light">{blog.desc}</p>
              </div>
              <div className="p-8 pt-0 border-t border-border mt-4">
                <Link href={blog.link} className="text-primary hover:text-accent font-bold text-xs uppercase tracking-widest font-heading pt-4 inline-block">
                  Read Insight &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Frequently Asked Questions */}
      <Section id="faqs" background="section" className="">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Frequently asked</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading">
              Useful answers before we begin.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card rounded-2xl border border-border overflow-hidden shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-6 md:p-8 font-heading font-bold text-heading flex justify-between items-center hover:text-accent transition-colors"
                >
                  <span className="text-base md:text-lg">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-accent transform transition-transform duration-300 ${openFaq === idx ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-8 pt-0 border-t border-border text-sm leading-relaxed bg-[#FAF9F5]/40 text-body/90 font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Banner Section */}
      <Section id="cta" background="main" className="">
        <div className="bg-primary text-white rounded-[32px] p-8 md:p-20 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto border border-accent/25">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="relative z-10 space-y-8">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Plan with confidence</span>
            <h2 className="text-3xl md:text-6xl font-heading font-bold text-white leading-tight max-w-4xl mx-auto">
              Bring engineering precision to your design.
            </h2>
            <p className="text-gray-300 text-sm md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Share your drawings, elevations or early concept. Our specialists will help define the most effective aluminium architectural solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button href="/request-quote" variant="accent" size="lg" className="gold-glow hover:scale-105 transition-transform duration-300">
                Get Free Consultation
              </Button>
              <button
                onClick={() => openInquiryModal("General project consultation")}
                className="px-8 py-4 rounded-full font-heading font-bold text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/50 transition-all shadow-lg hover:scale-105 duration-350"
              >
                Quick Inquiry
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Inquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
              onClick={() => setIsInquiryModalOpen(false)}
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-card w-full max-w-lg rounded-2xl p-8 relative z-10 shadow-2xl border border-border"
            >
              <button
                onClick={() => setIsInquiryModalOpen(false)}
                className="absolute top-4 right-4 text-body hover:text-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-heading font-bold text-heading">Quick Inquiry</h3>
                <p className="text-sm text-body/80 mt-1">Product: <span className="text-accent font-semibold">{inquiryProduct}</span></p>
              </div>

              {inquirySubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto animate-bounce" />
                  <h4 className="text-xl font-heading font-bold text-heading">Inquiry Received</h4>
                  <p className="text-body text-sm">Thank you! We will get in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="modal-name" className="text-xs font-semibold text-heading">Name *</label>
                    <input type="text" id="modal-name" required className="w-full px-4 py-2.5 rounded-lg border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="modal-phone" className="text-xs font-semibold text-heading">Phone *</label>
                    <input type="tel" id="modal-phone" required className="w-full px-4 py-2.5 rounded-lg border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="modal-notes" className="text-xs font-semibold text-heading">Message *</label>
                    <textarea id="modal-notes" required rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none" placeholder="Project stage or requirements..."></textarea>
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-heading font-bold text-sm transition-colors">
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
