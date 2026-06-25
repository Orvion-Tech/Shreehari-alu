"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Shield,
  Ruler,
  Thermometer,
  Eye,
} from "lucide-react";
import Button from "@/components/ui/Button";



interface SystemItem {
  num: string;
  id: string;
  title: string;
  consumerTitle: string;
  simpleDesc: string;
  features: string[];
  benefits: string;
  apps: string;
  img: string;
  images: string[];
  dwgRef: string;
  alloy: string;
  thermalBreak: string;
  glassCap: string;
}

const systems: SystemItem[] = [
  {
    num: "01", id: "slimline",
    title: "Alcom Ultra Luxury 18 mm Slimline System",
    consumerTitle: "Panoramic Minimalist Glass Sliding Walls",
    simpleDesc: "Lavish sliding glass walls with paper-thin 18mm center borders, designed to provide endless ocean or lawn views.",
    features: ["Super slim 18mm visible center frame", "Seamless hidden bottom floor track layout", "Extremely tall glass panels up to 4.5 meters"],
    benefits: "Blocks heat while giving a 98% unobstructed visual landscape.",
    apps: "Luxury Villas · Master Suites · Luxury Penthouses",
    img: "/services/brochure-img-6.jpg",
    images: ["/services/brochure-img-6.jpg", "/services/brochure-img-5.jpg", "/services/brochure-img-7.jpg"],
    dwgRef: "DWG-SL-18UL",
    alloy: "Alloy 6063-T6 Premium Temper", thermalBreak: "24mm Polyamide Insulating Struts",
    glassCap: "Double Laminated (8mm + 12Argon + 8mm)"
  },
  {
    num: "02", id: "structural-glazing",
    title: "Alcom Ultra Luxury 20 mm Fusion System",
    consumerTitle: "Storm-Safe Sliding Patio Doors",
    simpleDesc: "Thin-border sliding doors reinforced with internal steel chambers to resist storm deflection and driving rains.",
    features: ["Slim 20mm visible center interlocks", "Built-in heavy storm track drainage blocks", "High thermal insulation double-glass design"],
    benefits: "Safe from rain and wind pressure while keeping borders minimal.",
    apps: "High-Wind Coasts · High-Rise Apartments · Hilltop Resorts",
    img: "/services/brochure-img-7.jpg",
    images: ["/services/brochure-img-7.jpg", "/services/brochure-img-6.jpg", "/services/brochure-img-8.jpg"],
    dwgRef: "DWG-FS-20UL",
    alloy: "Alloy 6063-T6 Structural Reinforcement", thermalBreak: "28mm Polyamide Thermal Barrier",
    glassCap: "Heavy Temp Laminated (10mm + 14Argon + 10mm)"
  },
  {
    num: "03", id: "curtain-wall",
    title: "Alcom Luxury 19 mm Minimal System",
    consumerTitle: "Acoustic Silence Sliding Windows",
    simpleDesc: "Sleek minimal sliding window frames detailed with double acoustic rubber seals to block heavy road noises.",
    features: ["Sleek 19mm minimal center divider", "Accommodates up to 26mm noise-proof glass", "Stainless steel track rails for silent glides"],
    benefits: "Keeps city bedrooms quiet and isolated from road noises.",
    apps: "Bedrooms facing main streets · City Apartments",
    img: "/services/brochure-img-8.jpg",
    images: ["/services/brochure-img-8.jpg", "/services/brochure-img-9.jpg", "/services/brochure-img-10.jpg"],
    dwgRef: "DWG-MN-19L",
    alloy: "Alloy 6063-T6 Precision Profile", thermalBreak: "20mm Polyamide Insulating Gasket",
    glassCap: "Acoustic Double Pane (6mm Acoustic + 12Argon + 8mm)"
  },
  {
    num: "04", id: "glass-facades",
    title: "Alcom Classic Capped Curtain Wall",
    consumerTitle: "Tall Commercial Glass Facades",
    simpleDesc: "Traditional exterior glass walls with narrow, protective aluminum caps, engineered to insulate commercial showrooms.",
    features: ["Stick curtain wall capped profiles", "Integrated condensation water collection trays", "Concealed ventilation push-out slots"],
    benefits: "Ensures no water leaks in tall glass buildings.",
    apps: "Showrooms · Commercial Office Blocks · Entrance Towers",
    img: "/services/brochure-img-16.jpg",
    images: ["/services/brochure-img-16.jpg", "/services/brochure-img-15.jpg", "/services/brochure-img-17.jpg"],
    dwgRef: "DWG-CW-CAP",
    alloy: "Alloy 6082-T6 Structural Grade", thermalBreak: "Triple EPDM Gasket Cavity Girdle",
    glassCap: "Toughened Laminated (8mm Clear + 1.52PVB + 8mm Low-E)"
  },
  {
    num: "05", id: "acp-facades",
    title: "Alcom Structural Semi-Unitized Curtain Wall",
    consumerTitle: "Seamless Flush-Glass Building Facades",
    simpleDesc: "Exterior glass walls mounted using hidden structural clips, creating a flat, seamless commercial facade.",
    features: ["Seamless flush exterior glass finish", "Wind-load certified brackets for safety", "Custom color silicone seal lines"],
    benefits: "Accelerates construction speed and looks like a clean mirror wall.",
    apps: "Car Dealerships · Glass Corporate Headquarters",
    img: "/services/brochure-img-18.jpg",
    images: ["/services/brochure-img-18.jpg", "/services/brochure-img-16.jpg", "/services/brochure-img-17.jpg"],
    dwgRef: "DWG-CW-SEMU",
    alloy: "Alloy 6063-T6 Toggle Rail extrusion", thermalBreak: "Custom Silicone Isolation Padding",
    glassCap: "Double Reflective Low-E (6mm Ref + 14Argon + 6mm Toughened)"
  },
  {
    num: "06", id: "skylights",
    title: "Alcom Skylight Facade System",
    consumerTitle: "Sunlit Glass Roofs & Skylights",
    simpleDesc: "Sloped or curved glass roofs built with galvanized steel frameworks to flood interior courtyards with natural light.",
    features: ["Galvanized steel interior subframe structural strength", "Integrated collector channels for absolute waterproofing", "Solar heat protection Laminated glass options"],
    benefits: "Provides direct sky daylight without rain leakage worries.",
    apps: "Villa Atriums · Shopping Malls · Swimming Pools",
    img: "/services/brochure-img-21.jpg",
    images: ["/services/brochure-img-21.jpg", "/services/brochure-img-22.jpg", "/services/brochure-img-23.jpg"],
    dwgRef: "DWG-SK-FAC",
    alloy: "Galvanized Subframe & Alloy 6063-T6 Caps", thermalBreak: "Double-Gutter Leak Proof Drainage System",
    glassCap: "Heat Shield Laminated (8mm Solar + 12Argon + 6.6PVB)"
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function CADBlueprintProfile({ systemId }: { systemId: string }) {
  if (systemId.includes("slimline") || systemId.includes("fusion") || systemId.includes("minimal")) {
    return (
      <svg className="w-full h-full text-accent/80 opacity-90 p-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="5" y="5" width="90" height="90" strokeDasharray="1,2" stroke="currentColor" strokeWidth="0.3" />
        <rect x="25" y="80" width="50" height="15" rx="1" fill="rgba(194, 139, 69, 0.05)" />
        <line x1="38" y1="80" x2="38" y2="95" />
        <line x1="62" y1="80" x2="62" y2="95" />
        <rect x="34" y="20" width="8" height="60" fill="rgba(194, 139, 69, 0.1)" />
        <rect x="58" y="20" width="8" height="60" fill="rgba(194, 139, 69, 0.1)" />
        <line x1="38" y1="22" x2="38" y2="78" strokeWidth="1.5" stroke="#00373E" />
        <line x1="62" y1="22" x2="62" y2="78" strokeWidth="1.5" stroke="#00373E" />
        <line x1="20" y1="50" x2="80" y2="50" strokeDasharray="1,1" />
        <path d="M20 48v4M80 48v4" />
        <text x="50" y="46" textAnchor="middle" fontSize="3" fill="currentColor" stroke="none" className="font-mono tracking-widest uppercase">18mm Interlock Sightline</text>
        <circle cx="38" cy="80" r="1.5" strokeWidth="0.5" />
        <circle cx="62" cy="80" r="1.5" strokeWidth="0.5" />
      </svg>
    );
  }

  return (
    <svg className="w-full h-full text-accent/80 opacity-90 p-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="5" y="5" width="90" height="90" strokeDasharray="1,2" stroke="currentColor" strokeWidth="0.3" />
      <rect x="40" y="10" width="20" height="80" fill="rgba(194, 139, 69, 0.05)" />
      <rect x="36" y="50" width="28" height="6" rx="0.5" fill="rgba(194, 139, 69, 0.15)" />
      <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" />
      <rect x="15" y="48" width="20" height="10" strokeWidth="1" stroke="#00373E" />
      <rect x="65" y="48" width="20" height="10" strokeWidth="1" stroke="#00373E" />
      <text x="50" y="8" textAnchor="middle" fontSize="3" fill="currentColor" stroke="none" className="font-mono tracking-widest uppercase">Mullion Profile Section</text>
    </svg>
  );
}

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-500" />
      
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                index === i ? "bg-white scale-125 w-3" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GlazingPage() {
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"photo" | "blueprint">("photo");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isDrawerOpen]);

  const openDrawer = useCallback((system: SystemItem) => {
    setSelectedSystem(system);
    setDrawerTab("photo");
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1F2937] antialiased">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#FAF9F5] pt-24 pb-28 border-b border-primary/5">
        {/* CAD Grid Backdrop */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(194,139,69,0.04)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Text content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#C28B45]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#C28B45] uppercase">Division 01</span>
                <span className="text-[9px] font-mono text-primary/40 tracking-wider">/ GLAZING & FACADES</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-primary leading-[1.05] tracking-tight font-heading">
                Glazing & <br />
                <span className="gold-shimmer-text">Facades</span>.
              </h1>

              <p className="text-base sm:text-lg text-secondary/80 font-light max-w-xl leading-relaxed font-sans">
                Ultra-slim profile frames, minimal glass walls, structural skylights, and flush mirror curtain walls detailed for high wind loads and monsoon security.
              </p>

              {/* Elegant scroll anchor link */}
              <div className="pt-4">
                <a
                  href="#glazing-catalog"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest font-heading text-primary hover:text-[#C28B45] transition-colors border-b border-primary/20 pb-1"
                >
                  Explore Catalog ↓
                </a>
              </div>
            </div>

            {/* Right Column: Large Luxury Visual Frame */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#C28B45]/20 luxury-ticks bg-white">
                <Image
                  src="/services/brochure-img-6.jpg"
                  alt="Glazing & Facades showcase"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
                  sizes="420px"
                  priority
                  loading="eager"
                />
                {/* Thin overlay to blend with theme */}
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog anchor */}
      <span id="glazing-catalog" className="block scroll-mt-24" />

      {/* Breadcrumb navigator */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-10 font-sans">
        <div className="flex items-center gap-2 text-xs text-primary/50">
          <Link href="/" className="hover:text-[#C28B45] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-[#C28B45] transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-semibold">Glazing & Facades</span>
        </div>
      </div>

      {/* Systems Directory Section */}
      <section className="border-t border-primary/5 mt-12">
        {systems.map((system, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={system.id}
              className={`relative flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} ${
                isEven ? "bg-[#FAF9F5]" : "bg-white"
              } min-h-[480px] border-b border-primary/5`}
            >
              {/* Image half */}
              <div className="w-full lg:w-1/2 relative h-[320px] lg:h-auto overflow-hidden group">
                <ImageCarousel images={system.images} alt={system.consumerTitle} />
                <div className="absolute top-6 left-6 font-mono text-[9px] text-white bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full tracking-widest uppercase border border-white/10 z-30 pointer-events-none">
                  PROFILE {system.num} // {system.dwgRef}
                </div>
              </div>

              {/* Content half */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="text-accent font-heading font-bold uppercase tracking-widest text-[10px]">
                    {system.dwgRef}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary font-heading leading-tight tracking-tight">
                    {system.consumerTitle}
                  </h3>
                  <span className="text-xs text-primary/45 font-mono block font-bold uppercase tracking-wide">
                    {system.title}
                  </span>
                  <p className="text-body text-xs md:text-sm font-light leading-relaxed">
                    {system.simpleDesc}
                  </p>
                </div>

                {/* Features Checklist */}
                <ul className="grid grid-cols-1 gap-2.5">
                  {system.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs md:text-sm font-medium text-heading">
                      <CheckCircle2 className="w-4.5 h-4.5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Specs Summary line */}
                <div className="flex gap-4 border-t border-primary/5 pt-4 text-xs font-sans text-primary/60">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary/45 block">Alloy</span>
                    <strong className="text-heading">{system.alloy.split(" ")[0]} {system.alloy.split(" ")[1] || ""}</strong>
                  </div>
                  <div className="w-px bg-primary/15" />
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#C28B45]/70 block">Barrier</span>
                    <strong className="text-accent">{system.thermalBreak.split(" ")[0]} {system.thermalBreak.split(" ")[1] || ""}</strong>
                  </div>
                  <div className="w-px bg-primary/15" />
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary/45 block">Glass Cap</span>
                    <strong className="text-heading">{system.glassCap.split(" ")[0]} {system.glassCap.split(" ")[1] || ""}</strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button 
                    onClick={() => openDrawer(system)} 
                    variant="primary" 
                    size="sm" 
                    className="gold-glow hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    View Specs Matrix →
                  </Button>
                  <Button 
                    href={`/request-quote?system=${encodeURIComponent(system.consumerTitle)}`} 
                    variant="outline" 
                    size="sm"
                    className="cursor-pointer"
                  >
                    Inquire Quote
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedSystem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[540px] md:w-[620px] z-50 bg-white shadow-2xl flex flex-col border-l border-primary/10"
            >
              <div className="p-6 border-b border-primary/5 bg-[#FAF9F5] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-[#C28B45] font-mono font-bold text-sm border border-[#C28B45]/20">{selectedSystem.num}</div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#C28B45] font-bold block">SYSTEM SPECIFICATION</span>
                    <h3 className="text-lg font-bold text-primary tracking-tight leading-none">{selectedSystem.consumerTitle}</h3>
                  </div>
                </div>
                <button onClick={closeDrawer} className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:text-[#C28B45] hover:border-[#C28B45] transition-all cursor-pointer bg-white shadow-sm"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-primary/45 font-bold uppercase">Visual Representation</span>
                    <div className="bg-[#FAF9F5] border border-primary/5 p-1 rounded-full flex gap-1 font-sans">
                      <button onClick={() => setDrawerTab("photo")} className={`text-[9px] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${drawerTab === "photo" ? "bg-primary text-white" : "text-primary/60 hover:text-primary"}`}>Photography</button>
                      <button onClick={() => setDrawerTab("blueprint")} className={`text-[9px] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${drawerTab === "blueprint" ? "bg-primary text-white" : "text-primary/60 hover:text-primary"}`}>CAD Blueprint section</button>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-primary/5 shadow-inner bg-[#FAF9F5]">
                    <AnimatePresence mode="wait">
                      {drawerTab === "photo" ? (
                        <motion.div key="photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                          <ImageCarousel images={selectedSystem.images} alt={selectedSystem.consumerTitle} />
                        </motion.div>
                      ) : (
                        <motion.div key="blueprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-white">
                          <CADBlueprintProfile systemId={selectedSystem.id} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#C28B45]"><Eye className="w-4 h-4" /><span className="text-[10px] font-mono tracking-widest uppercase font-bold">System Profile Summary</span></div>
                  <h4 className="text-sm font-semibold text-primary">{selectedSystem.title}</h4>
                  <p className="text-sm text-primary/75 leading-relaxed font-sans font-light">{selectedSystem.simpleDesc}</p>
                  <p className="text-sm text-[#C28B45] italic font-serif leading-relaxed">{selectedSystem.benefits}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C28B45]"><Sparkles className="w-4 h-4" /><span className="text-[10px] font-mono tracking-widest uppercase font-bold">Key Architectural Features</span></div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedSystem.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-primary/5">
                        <CheckCircle2 className="w-4 h-4 text-[#C28B45] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-primary/80 font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C28B45]"><Ruler className="w-4 h-4" /><span className="text-[10px] font-mono tracking-widest uppercase font-bold">Technical Specifications Matrix</span></div>
                  <div className="rounded-2xl border border-primary/5 overflow-hidden text-xs font-sans shadow-sm">
                    {[
                      { label: "Aluminium Profile Alloy", value: selectedSystem.alloy },
                      { label: "Thermal Insulation Barrier", value: selectedSystem.thermalBreak },
                      { label: "Sash Glazing Thickness Capacity", value: selectedSystem.glassCap },
                      { label: "CAD Block Reference Code", value: selectedSystem.dwgRef },
                      { label: "Recommended Application Zones", value: selectedSystem.apps },
                    ].map((spec, i) => (
                      <div key={spec.label} className={`grid grid-cols-[160px_1fr] gap-4 p-4 ${i % 2 === 0 ? "bg-[#FAF9F5]" : "bg-white"} ${i < 4 ? "border-b border-primary/5" : ""}`}>
                        <span className="text-[10px] font-mono text-primary/50 uppercase">{spec.label}</span>
                        <span className="font-bold text-primary/80">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-primary/5 bg-[#FAF9F5] flex flex-col sm:flex-row gap-3 font-sans">
                <Button href={`/request-quote?system=${encodeURIComponent(selectedSystem.consumerTitle)}`} variant="accent" className="flex-1 shadow-md shadow-[#C28B45]/10">Specify in Project Quote</Button>
                <Button href="/contact" variant="outline" className="flex-1">Consult Lead Engineer →</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  );
}
