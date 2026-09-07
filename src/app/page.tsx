"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProcessSection from "@/components/ui/ProcessSection";
import { SERVICE_CATEGORIES, serviceHref } from "@/data/services";

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
    quote: "Shreehari Alu understood that the view was the hero. The slimline system is visually quiet, beautifully made and performs exactly as promised.",
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
  // homepage
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

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
      {/* ===================== HERO (heading on top · image below · mirrored stats) ===================== */}
      <section className="relative w-full overflow-hidden bg-background">
        {/* Top — heading + tagline + actions */}
        <div className="relative container mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-6 md:pb-8 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Fixed h1: the strongest on-page ranking signal, so it names what the
                company actually sells and where. The rotating brand line below keeps
                the hero's motion. */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.12] tracking-tight text-balance">
              Aluminium Windows, Doors &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent whitespace-nowrap">
                Facade Systems
              </span>{" "}
              in Ahmedabad.
            </h1>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-lg md:text-xl text-body font-light leading-snug"
              >
                {HERO_SLIDES[activeSlide].titlePart1}{" "}
                <span className="text-accent font-medium">
                  {HERO_SLIDES[activeSlide].titlePart2}
                </span>{" "}
                {HERO_SLIDES[activeSlide].titlePart3}
              </motion.p>
            </AnimatePresence>

            {/* Full-width on a phone — narrow centred buttons are harder to hit */}
            <div className="mt-8 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
              <Button href="/projects" variant="outline" size="lg" className="w-full sm:w-auto">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Middle — full-width image band */}
        <div className="relative w-full h-[58vh] min-h-[400px] md:h-[68vh]">
          {/* No entrance animation on first load: this is the LCP image, and a
              zoom-in on arrival made the hero feel unstable. `initial={false}`
              means it is simply there on load and only animates between slides.
              Dropping `mode="wait"` is the important part — with it, the old image
              finished fading out before the new one began, exposing the pale page
              background through the gap. That flash was the "white cloud". The two
              now cross-fade over one another instead. */}
          <AnimatePresence initial={false}>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Full-bleed LCP image: sizes lets the browser pick a viewport-width
                  candidate from the srcset instead of the largest one. */}
              <Image
                src={HERO_SLIDES[activeSlide].image}
                alt={HERO_SLIDES[activeSlide].project}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          {/* top of the image melts into the light heading area — seamless blend */}
          <div className="absolute inset-x-0 top-0 h-20 md:h-24 bg-gradient-to-b from-background via-background/45 to-transparent pointer-events-none" />

          {/* slide indicators — kept clear of the centered glass card */}
          <div className="absolute bottom-28 md:bottom-32 right-6 md:right-10 flex items-center gap-3 z-20">
            {HERO_SLIDES.map((_, idx) => (
              <button key={idx} onClick={() => setActiveSlide(idx)} aria-label={`Slide ${idx + 1}`} className="group flex items-center justify-center min-h-11 min-w-11 cursor-pointer">
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    activeSlide === idx ? "w-10 bg-accent" : "w-5 bg-white/70 group-hover:bg-white"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom — stats on a frosted glass panel overlapping the image */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 -mt-20 md:-mt-24 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto rounded-2xl border border-accent/30 bg-card/80 backdrop-blur-2xl ring-1 ring-inset ring-white/50 shadow-[0_30px_80px_-30px_rgba(0,55,62,0.4)] overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/70">
              {[
                { count: "650+", label: "Projects delivered" },
                { count: "30+", label: "Years expertise" },
                { count: "42+", label: "Cities served" },
                { count: "96%", label: "Referral-led" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="group relative px-4 md:px-6 py-8 md:py-11 text-center transition-colors duration-300 hover:bg-accent/[0.06]"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-accent leading-none">
                    {s.count}
                  </div>
                  <span className="block mx-auto mt-4 h-px w-8 bg-accent/70 transition-all duration-300 group-hover:w-12" />
                  <div className="mt-4 text-[11px] md:text-xs text-heading font-heading font-semibold uppercase tracking-[0.16em] leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetrical Who We Are / Intro Section */}
      <Section id="about-intro" background="section" className="relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
          {/* Asymmetrical visual framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[300px] sm:h-[400px] md:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl premium-border gold-glow">
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-[1.15]">
                Crafting the Future of Architecture.
              </h2>
            </div>
            <p className="text-body/90 text-sm sm:text-base leading-relaxed font-light">
              At Shreehari Alu, we specialize in delivering world-class aluminium architectural systems that combine exceptional quality, cutting-edge innovation, and breathtaking aesthetics.
            </p>
            <p className="text-body/90 text-sm sm:text-base leading-relaxed font-light">
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
                <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-heading font-bold text-heading">{item.title}</h4>
                    <span className="text-xs text-body/75 mt-0.5 block">{item.desc}</span>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Our Capability</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">What We Do</h2>
          </div>
          <p className="text-body max-w-md text-sm md:text-base leading-relaxed font-light">
            We offer a comprehensive range of aluminium architectural systems designed to meet the highest standards of performance and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICE_CATEGORIES.map((cat) => ({
            title: cat.label,
            desc: cat.description,
            img: cat.heroImage,
            href: serviceHref(cat.slug),
            specs: cat.systems.slice(0, 3).map((s) => s.title)
          })).map((service, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-accent/40 border border-border transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-section">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 md:p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-heading tracking-tight group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                    <p className="text-body text-xs sm:text-sm leading-relaxed font-light">{service.desc}</p>
                  </div>

                  {/* Specification tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                    {service.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="text-[12px] tracking-wide font-heading font-semibold bg-section px-2.5 py-1 rounded-full text-body border border-border/60">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <Link href={service.href} className="text-primary font-heading font-bold text-xs uppercase tracking-widest inline-flex items-center min-h-11 -my-2 hover:text-accent transition-colors group/link">
                  Explore Systems <ChevronRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-10 text-center">
          <Button href="/services" variant="outline" className="hover:scale-105 transition-transform duration-300">View All Services</Button>
        </div>
      </Section>

      <Section id="process" background="section" className="relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">How We Work</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">
            Our Facade Engineering Process
          </h2>
          <p className="text-body max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            From initial blueprints to after-sales maintenance support, we check every millimeter of your custom glazing.
          </p>
        </div>

        <ProcessSection />
      </Section>

      {/* Why Shreehari Alu (Split Feature, light) */}
      <section className="relative flex flex-col lg:flex-row bg-section min-h-[580px] border-t border-border">
        <div className="w-full lg:w-1/2 relative h-[380px] lg:h-auto">
          <Image
            src="/why_shreehari_details.png"
            alt="Precision building facade details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center space-y-6">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Why Shreehari Alu</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">
            Performance lives in the details.
          </h2>
          <p className="text-body leading-relaxed text-sm md:text-base font-light">
            Premium materials matter. So do correct drainage paths, tolerances, anchors, sealants, interfaces and installation discipline. We take ownership of all of it.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Application-led system selection",
              "Precision fabrication and checks",
              "Trained project installation teams",
              "Clear documentation & after-care"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-sm font-medium text-heading">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <Button href="/about#why-choose-us" variant="primary" className="hover:scale-105 transition-transform">
              Explore Our Standards
            </Button>
          </div>
        </div>
      </section>

      {/* Selected Work Section (Cream Background) */}
      <Section id="portfolio-featured" background="section" className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Selected Work</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">
              Architecture, beautifully resolved.
            </h2>
          </div>
          <Link href="/projects" className="text-accent font-heading font-bold text-xs uppercase tracking-widest inline-flex items-center min-h-11 hover:text-primary transition-colors group">
            Explore All Projects <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
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
            <div key={i} className="bg-card rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl hover:border-accent/40 border border-border transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-96 md:h-[480px] w-full overflow-hidden">
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
                <div className="p-5 md:p-8 space-y-3">
                  <span className="text-accent text-[12px] uppercase tracking-widest font-heading font-bold block">{project.meta}</span>
                  <h3 className="text-3xl font-heading font-bold text-heading tracking-tight">{project.title}</h3>
                  <div className="text-sm text-body/80 font-medium">Scope: {project.scope}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Perspectives Testimonial Section */}
      <Section id="testimonials" background="section" className="relative overflow-hidden py-8 md:py-14">
        {/* Decorative background details */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Left Column (7 cols): Editorial Quote & Navigation */}
            <div className="lg:col-span-7 space-y-6 md:space-y-10 text-left relative">
              <div className="space-y-4">
                <span className="text-accent font-heading font-extrabold uppercase tracking-widest text-[12px] md:text-xs block">Client Perspectives</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-gradient tracking-tight leading-[1.1]">
                  Voices of Partnership.
                </h2>
              </div>

              {/* Large quotation mark watermark */}
              <div className="absolute -top-10 -left-6 text-accent/8 pointer-events-none select-none">
                <span className="text-[12rem] font-heading font-light leading-none">“</span>
              </div>

              {/* Animated Testimonial Text */}
              <div className="relative z-10 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] flex flex-col justify-center">
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
                      <span className="block text-[12px] text-body font-sans font-light mt-0.5">
                        {testimonials[activeTestimonial].author.split(" · ")[1] || ""}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Location tabs switcher at bottom of left column */}
              <div className="pt-4 md:pt-6 border-t border-border flex flex-wrap gap-x-7 gap-y-3">
                {testimonials.map((testimonial, idx) => {
                  const locationFull = testimonial.author.split(" · ")[1] || "India";
                  const cityName = locationFull.split(", ").pop() || "Project";
                  const isActive = activeTestimonial === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className="inline-flex items-center gap-2 min-h-11 focus:outline-none group cursor-pointer"
                    >
                      <span className={`text-xs font-heading font-semibold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-accent" : "text-body/60 group-hover:text-heading"}`}>
                        {cityName}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column (5 cols): Framed Visual Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center w-full">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-[2rem] bg-white p-0 border border-accent/25 overflow-hidden group">
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

              {/* System caption */}
              <div className="w-full mt-6 bg-card border border-border rounded-2xl px-5 py-4 shadow-md">
                <div className="flex justify-between items-center text-left">
                  <div>
                    <span className="text-[12px] text-accent font-heading font-semibold uppercase tracking-widest block">System Installed</span>
                    <h5 className="text-sm font-heading font-bold text-heading mt-1">
                      {activeTestimonial === 0 ? "Minimal Sliding System" :
                        activeTestimonial === 1 ? "Unitized Curtain Wall" :
                          "Slim Gliding Door"}
                    </h5>
                  </div>
                  <div className="border-l border-border pl-5 text-left">
                    <span className="text-[12px] text-body/60 font-heading font-semibold uppercase tracking-widest block">Performance</span>
                    <span className="text-sm font-heading font-bold text-accent block mt-1">
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

      <Section id="faqs" background="section" className="">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Frequently asked</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient">
              Useful answers before we begin.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card rounded-2xl border border-border overflow-hidden shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4.5 md:p-6 font-heading font-bold text-heading flex justify-between items-center hover:text-accent transition-colors"
                >
                  <span className="text-base md:text-lg">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-accent transform transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 md:p-6 md:pt-0 text-sm leading-relaxed bg-[#FAF9F5]/40 text-body/90 font-light">
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

      {/* CTA Banner Section
          Rebuilt as the darkest block on the page. It previously sat as a pale
          card on a pale ground with small centred text, giving the page's most
          important moment less weight than the FAQ above it. No decorative
          blur-blobs, no scale-on-hover — the contrast does the work. */}
      <section id="cta" className="bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <span className="block text-accent-bright font-heading font-bold uppercase tracking-widest text-xs md:text-sm">
              Plan with confidence
            </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl mt-5 font-heading font-bold leading-[1.12] tracking-tight text-balance">
              Bring engineering precision to your design.
            </h2>
            <p className="mt-5 text-white/75 text-base md:text-lg leading-relaxed font-light">
              Share your drawings, elevations or early concept. Our specialists will
              help define the most effective aluminium architectural solution.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary font-heading font-bold text-xs uppercase tracking-widest hover:bg-accent-bright transition-colors duration-300"
              >
                Contact Us
              </Link>
              <button
                type="button"
                onClick={() => openInquiryModal("General project consultation")}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/35 text-white font-heading font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/60 transition-colors duration-300 cursor-pointer"
              >
                Quick Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

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
