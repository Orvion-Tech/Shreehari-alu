"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ArrowUpRight, HelpCircle, X, Phone, ChevronRight, Home as HomeIcon, Building2, Factory } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProcessSection from "@/components/ui/ProcessSection";

// Premium custom generated images matching the brand theme
const IMAGES = {
  hero: "/hero_courtyard_villa.png",
  commercial: "/commercial_glass_facade.png",
  pergola: "/louvered_pergola_villa.png",
  villa: "/villa_modern_glazing.png",
  slidingWindow: "/minimal_sliding_window.png",
  servicesWin: "/services_windows_doors.png",
  servicesGlazing: "/service_structural_glazing.png",
  servicesArch: "/service_architectural_systems.png"
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
    image: IMAGES.hero,
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
    image: IMAGES.commercial,
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
    image: IMAGES.pergola,
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
        const next = prev + 0.4 * direction;
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
      {/* Panoramic Fullscreen Visual Hero Section (Minimalist Image-First Edition) */}
      <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#FCFBFA] text-body">

        {/* Fullscreen Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
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

          {/* Light horizontal vignette gradient for text readability */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-[#FCFBFA] via-[#FCFBFA]/90 to-transparent z-10 pointer-events-none" />
          {/* Fallback bottom vignette for mobile devices where screen width is narrow */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#FCFBFA] via-[#FCFBFA]/40 to-transparent lg:hidden z-10 pointer-events-none" />

          {/* Very subtle grid lines to keep the architectural draftsman texture */}
          <div className="absolute inset-0 z-10 cad-grid opacity-[0.04] pointer-events-none" />
        </div>

        {/* Content Container (Overlay) */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 pt-28 pb-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-10 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Tagline */}
                <div className="flex items-center space-x-3 text-accent font-heading font-extrabold text-[10px] md:text-xs uppercase tracking-[0.25em]">
                  <span className="w-8 h-[1.5px] bg-accent" />
                  <span>{HERO_SLIDES[activeSlide].tagline}</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7.5xl font-heading font-extrabold text-heading tracking-tight leading-[1.08]">
                  {HERO_SLIDES[activeSlide].titlePart1}{" "}
                  <span className="text-gradient-gold">{HERO_SLIDES[activeSlide].titlePart2}</span>{" "}
                  {HERO_SLIDES[activeSlide].titlePart3}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-body font-sans font-light max-w-xl leading-relaxed">
                  {HERO_SLIDES[activeSlide].description}
                </p>

                {/* Subtle spec details list */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-gray-200/60 max-w-lg">
                  <div>
                    <span className="text-[7px] font-mono text-gray-400 uppercase tracking-widest block">Project scope</span>
                    <span className="text-[10px] font-extrabold text-heading uppercase tracking-wide">{HERO_SLIDES[activeSlide].project}</span>
                  </div>
                  {HERO_SLIDES[activeSlide].specs.slice(0, 2).map((spec, sIdx) => (
                    <div key={sIdx}>
                      <span className="text-[7px] font-mono text-gray-400 uppercase tracking-widest block">{spec.label}</span>
                      <span className="text-[10px] font-extrabold text-accent uppercase tracking-wider">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button href="/request-quote" variant="accent" size="md" className="gold-glow hover:scale-[1.03] transition-transform duration-300" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Free Consultation
              </Button>
              <Button href="/projects" variant="outline" size="md" className="hover:scale-[1.03] transition-transform duration-300 border-gray-300 hover:border-primary/50 text-primary bg-transparent">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Navigation Pill (Bottom Right Corner) */}
        <div className="absolute bottom-8 right-8 md:right-12 z-30 flex items-center space-x-4 bg-white/80 backdrop-blur-md py-3 px-6 rounded-full border border-gray-200/50 shadow-2xl">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className="flex items-center space-x-2 group focus:outline-none cursor-pointer"
              >
                <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? "text-accent font-extrabold" : "text-gray-400 group-hover:text-gray-600"}`}>
                  0{idx + 1}
                </span>
                <span className={`text-[9px] font-heading font-extrabold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-heading scale-102" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {idx === 0 ? "Sliding" : idx === 1 ? "Facades" : "Louvers"}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Cue Line */}
        <div className="absolute bottom-8 left-8 md:left-12 z-20 flex items-center gap-3 cursor-pointer">
          <div className="w-[1px] h-10 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce"></div>
          </div>
          <span className="text-[9px] text-gray-400 font-heading font-bold uppercase tracking-widest">Scroll</span>
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
                src="/about_intro_villa.png"
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
            { category: "Windows", title: "Slimline Sliding", desc: "Expansive views with discreet interlocks and smooth multi-track movement.", img: IMAGES.slidingWindow },
            { category: "Doors", title: "Statement Pivot", desc: "Generous proportions, concealed hardware and an exceptional arrival experience.", img: "/product_statement_pivot.png" },
            { category: "Facades", title: "Curtain Wall", desc: "Integrated pressure equalisation, crisp grids and dependable water management.", img: IMAGES.servicesGlazing },
            { category: "Outdoor", title: "Louvered Pergola", desc: "Motorised light, shade and rain control in one elegant aluminium structure.", img: "/product_louvered_pergola.png" }
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

      <Section id="process" background="section" className="border-t border-[#C28B45]/15">
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
      </Section>

      {/* Why Shree Hari Alu (Split Feature, Dark background) */}
      <section className="relative flex flex-col lg:flex-row bg-primary text-white min-h-[580px] border-t border-accent/15">
        <div className="w-full lg:w-1/2 relative h-[380px] lg:h-auto">
          <Image
            src="/why_shreehari_details.png"
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
      <Section id="testimonials" background="section" className="relative overflow-hidden py-24">
        {/* Decorative background details */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute inset-0 cad-grid opacity-[0.03] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column (7 cols): Editorial Quote & Navigation */}
            <div className="lg:col-span-7 space-y-10 text-left relative">
              <div className="space-y-4">
                <span className="text-accent font-heading font-extrabold uppercase tracking-widest text-[10px] md:text-xs block">Client Perspectives</span>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-heading tracking-tight leading-[1.1]">
                  Voices of <span className="text-gradient">Partnership</span>.
                </h2>
              </div>

              {/* Large quotation mark watermark */}
              <div className="absolute -top-10 -left-6 text-accent/8 pointer-events-none select-none">
                <span className="text-[12rem] font-heading font-light leading-none">“</span>
              </div>

              {/* Animated Testimonial Text */}
              <div className="relative z-10 min-h-[180px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <blockquote className="text-xl sm:text-2xl lg:text-3.5xl font-heading font-light text-heading leading-relaxed italic text-left">
                      “{testimonials[activeTestimonial].quote}”
                    </blockquote>

                    <div>
                      <cite className="block text-accent font-heading font-extrabold text-xs tracking-widest uppercase not-italic">
                        {testimonials[activeTestimonial].author.split(" · ")[0]}
                      </cite>
                      <span className="block text-[10px] text-body font-sans font-light mt-0.5">
                        {testimonials[activeTestimonial].author.split(" · ")[1] || ""}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Location tabs switcher at bottom of left column */}
              <div className="pt-6 border-t border-gray-200/80 flex flex-wrap gap-x-6 gap-y-3">
                {testimonials.map((testimonial, idx) => {
                  const locationFull = testimonial.author.split(" · ")[1] || "India";
                  const cityName = locationFull.split(", ").pop()?.toUpperCase() || "PROJECT";
                  const isActive = activeTestimonial === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className="flex items-center space-x-2 focus:outline-none group cursor-pointer"
                    >
                      <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? "text-accent font-extrabold" : "text-gray-400 group-hover:text-gray-600"}`}>
                        [ {cityName} ]
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column (5 cols): Framed Visual Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-[2rem] bg-white p-3 border border-accent/25 shadow-2xl overflow-hidden group">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-50 border border-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={
                          activeTestimonial === 0 ? IMAGES.hero :
                            activeTestimonial === 1 ? IMAGES.commercial :
                              IMAGES.villa
                        }
                        alt="Project showcase"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 400px"
                      />
                      {/* Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Specification Sheet */}
              <div className="w-full mt-6 bg-white/70 border border-gray-100 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 cad-grid opacity-[0.02] pointer-events-none" />
                <div className="relative z-10 flex justify-between items-center text-left">
                  <div>
                    <span className="text-[7px] font-mono text-accent uppercase tracking-widest block">System Installed</span>
                    <h5 className="text-[10px] font-heading font-extrabold uppercase text-heading tracking-wider mt-0.5">
                      {activeTestimonial === 0 ? "Minimal Sliding System" :
                        activeTestimonial === 1 ? "Unitized Curtain Wall" :
                          "Slim Gliding Door"}
                    </h5>
                  </div>
                  <div className="border-l border-gray-200 pl-4 text-left">
                    <span className="text-[7px] font-mono text-gray-400 uppercase tracking-widest block">Performance</span>
                    <span className="text-[9px] font-heading font-extrabold text-accent uppercase tracking-wider block mt-0.5">
                      {activeTestimonial === 0 ? "Class A4 Sealing" :
                        activeTestimonial === 1 ? "3.5 kPa Windload" :
                          "Silent Roller Tech"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
              img: "/blog_slim_window.png",
              link: "/products#windows"
            },
            {
              category: "Facade guide · 8 min",
              title: "Curtain wall vs structural glazing",
              desc: "Understand the visual, technical and maintenance differences before specifying.",
              img: "/blog_facade_compare.png",
              link: "/products#facades"
            },
            {
              category: "Outdoor living · 5 min",
              title: "Planning a pergola for Indian weather",
              desc: "Drainage, shade, wind and automation considerations for a better outdoor room.",
              img: "/blog_pergola_weather.png",
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

      <Section id="faqs" background="section" className="">
        <div className="max-w-5xl mx-auto">
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
        <div className="luxury-glass-light rounded-[32px] p-8 md:p-16 shadow-xl relative overflow-hidden text-center w-full border border-accent/30">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 cad-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Plan with confidence</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight max-w-2xl mx-auto">
              Bring engineering precision to your design.
            </h2>
            <p className="text-body/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              Share your drawings, elevations or early concept. Our specialists will help define the most effective aluminium architectural solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button href="/request-quote" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
                Get Free Consultation
              </Button>
              <button
                onClick={() => openInquiryModal("General project consultation")}
                className="px-6 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-widest bg-primary hover:bg-primary-hover text-white border border-primary transition-all shadow-md hover:scale-105 duration-350"
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
