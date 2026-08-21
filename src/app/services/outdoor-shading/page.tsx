"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
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
    num: "15", id: "pergolas",
    title: "Alcom Motorized Pergolas & Louvre Systems",
    consumerTitle: "Motorized Shading Louvre Patio Roofs",
    simpleDesc: "Motorized aluminum patio roofs with louvers that tilt at the push of a button, letting in sun or blocking rain.",
    features: ["Tilting louver panels via remote control", "Internal water drainage post paths", "Built-in perimeter LED spotlights"],
    benefits: "100% waterproof when closed, allowing year-round patio use.",
    apps: "Villa Gardens · Rooftop Patios · Poolside Lounge Decks",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-PG-MOT",
    alloy: "Alloy 6060-T6 Corrosion Resistant", thermalBreak: "Internal Rain Drainage Channels",
    glassCap: "Not Applicable (Heavy Solid Extruded Blades)"
  },
  {
    num: "16", id: "retractable-roofs",
    title: "Alcom Retractable Roof Systems",
    consumerTitle: "Retractable Folding Patio Fabric Roofs",
    simpleDesc: "Motorized canvas roof covers that fold back completely, letting you open up your terrace to the clear sky.",
    features: ["Retractable folding fabric tracks", "Weatherproof PVC tension canvas", "Automatic wind sensor retract shields"],
    benefits: "Provides instant shading or full open-air views on demand.",
    apps: "Hotel Restaurant Terraces · Open Villa Courtyards",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-RF-RET",
    alloy: "Alloy 6063-T6 Rail Guides & Supports", thermalBreak: "Anti-Corrosion Polyurethane Coatings",
    glassCap: "Not Applicable (Blackout PVC Waterproof Fabric)"
  },
  {
    num: "17", id: "mosquito-screens",
    title: "Alcom Pleated Mesh & Mosquito Screens",
    consumerTitle: "Invisible Pleated Mosquito Screens",
    simpleDesc: "Retractable pleated mesh screen doors that slide shut smoothly and disappear into a tiny 2cm frame when opened.",
    features: ["High density pleated mosquito netting", "Ultra-slim side-mounting framework", "Tension line cables for wind resistance"],
    benefits: "Lets fresh breeze into your rooms while blocking all insects.",
    apps: "Villa Bedroom Windows · Large Balcony Sliding Doors",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-MS-PLE",
    alloy: "Alloy 6063-T5 Screen Guide Profile", thermalBreak: "Zero Obstacle Bottom Guideline",
    glassCap: "Pleated Polyester Mesh (0.3mm High Durability)"
  },
  {
    num: "18", id: "sun-screens",
    title: "Alcom Sun Control Louvre Screens",
    consumerTitle: "Solar Heat Shield Louvre Screens",
    simpleDesc: "Exterior aluminum shade louvers that block direct sun glare, keeping your villa cool and private.",
    features: ["Fixed or remote tilting exterior louvers", "Reduces heat gain on large glass windows", "Adds modern visual depth to facade walls"],
    benefits: "Lowers air conditioning bills significantly and increases privacy.",
    apps: "West-facing Villa Walls · Penthouse Windows",
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-SC-LVR",
    alloy: "Alloy 6063-T6 Sun-shield Louver profile", thermalBreak: "Facilitates natural airflow ventilation gap",
    glassCap: "Not Applicable (Anodized Architectural Aluminium)"
  },
  {
    num: "19", id: "ventilation",
    title: "Alcom Fresh Air Ventilation Systems",
    consumerTitle: "Soundproof Fresh Air Intake Vents",
    simpleDesc: "Quiet fresh air intake vents built directly into window frames, letting fresh air in while keeping road noise out.",
    features: ["Acoustic lining pads to absorb outdoor sounds", "Double insect and dust filter screens", "Rain-proof outer hood covers"],
    benefits: "Provides continuous clean air flow in bedrooms during sleep.",
    apps: "Bedrooms · Child Nursery Rooms · Home Offices",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-VT-AIR",
    alloy: "Alloy 6063-T5 Acoustic Vent frame", thermalBreak: "Sound-Absorbing Micro-Fibre Glands",
    glassCap: "Not Applicable (Frame Inset Device)"
  },
  {
    num: "20", id: "custom",
    title: "Alcom Customized Architectural Solutions",
    consumerTitle: "Bespoke Custom Architectural Glass & Metal",
    simpleDesc: "Bespoke structural glass, canopy structures, and custom cladding profiles engineered for specific architect projects.",
    features: ["Custom metal profile extrusions", "Full structural safety review calculations", "Bespoke fittings casting design"],
    benefits: "Provides absolute visual freedom to execute unique designs.",
    apps: "Grand Villa Facades · Entrance Canopies",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-CS-BESP",
    alloy: "Bespoke Grade Custom Alloys (6061-T6 / 6063-T6)", thermalBreak: "Project-Specific Custom Insulation Gaskets",
    glassCap: "Engineered Glass Assemblies (up to 48mm Thickness)"
  },
];

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

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 hover:bg-card border border-border shadow-sm backdrop-blur-md flex items-center justify-center text-heading opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 hover:bg-card border border-border shadow-sm backdrop-blur-md flex items-center justify-center text-heading opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
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
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                index === i ? "bg-accent scale-100 w-4" : "w-1.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OutdoorShadingPage() {
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isDrawerOpen]);

  const openDrawer = useCallback((system: SystemItem) => {
    setSelectedSystem(system);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className="bg-background min-h-screen text-body antialiased">

      {/* ===================== HERO (light band) ===================== */}
      <section className="relative overflow-hidden bg-section pt-28 pb-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-body mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-body/60" />
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-body/60" />
            <span className="text-heading font-semibold">Outdoor &amp; Shading</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">
                Outdoor &amp; Shading Systems
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-heading leading-[1.08] tracking-tight">
                Outdoor &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Shading
                </span>
                .
              </h1>
              <p className="text-body text-base md:text-lg font-light max-w-xl leading-relaxed">
                Motorized shading louvers, retractable roof profiles, pleated insect meshes, and West-facing solar shades engineered for heavy wind limits and weather insulation.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="#outdoor-catalog" variant="primary" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Explore Catalog
                </Button>
                <Button href="/request-quote" variant="outline">
                  Request a Quote
                </Button>
              </div>
            </div>

            {/* Right: visual */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-lg bg-card">
                <Image
                  src="/services/brochure-img-19.jpg"
                  alt="Outdoor & Shading showcase"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
                  sizes="440px"
                  priority
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog anchor */}
      <span id="outdoor-catalog" className="block scroll-mt-28" />

      {/* ===================== SYSTEMS DIRECTORY ===================== */}
      <section>
        {systems.map((system, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={system.id}
              className={`relative flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} ${
                isEven ? "bg-background" : "bg-section"
              } min-h-[480px] border-b border-border`}
            >
              {/* Image half */}
              <div className="w-full lg:w-1/2 relative h-[320px] lg:h-auto overflow-hidden">
                <ImageCarousel images={system.images} alt={system.consumerTitle} />
                <div className="absolute top-5 left-5 z-30 bg-card/95 backdrop-blur-sm text-heading text-[11px] font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-border shadow-sm pointer-events-none">
                  {system.dwgRef}
                </div>
              </div>

              {/* Content half */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs block">
                    System {system.num}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-heading leading-tight">
                    {system.consumerTitle}
                  </h3>
                  <span className="text-sm text-body font-light block">
                    {system.title}
                  </span>
                  <p className="text-body text-sm md:text-base font-light leading-relaxed">
                    {system.simpleDesc}
                  </p>
                </div>

                {/* Features */}
                <ul className="grid grid-cols-1 gap-2.5">
                  {system.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-sm text-heading">
                      <CheckCircle2 className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="font-light">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Spec summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-border pt-5">
                  {[
                    { label: "Alloy", value: system.alloy },
                    { label: "Weather Barrier", value: system.thermalBreak },
                    { label: "Panel / Glazing", value: system.glassCap },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <span className="text-[11px] uppercase tracking-wider text-body block mb-1">{spec.label}</span>
                      <span className="text-sm text-heading font-medium leading-snug block">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button
                    onClick={() => openDrawer(system)}
                    variant="primary"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View Specifications
                  </Button>
                  <Button
                    href={`/request-quote?system=${encodeURIComponent(system.consumerTitle)}`}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ===================== SPEC DRAWER ===================== */}
      <AnimatePresence>
        {isDrawerOpen && selectedSystem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[540px] md:w-[620px] z-50 bg-card shadow-2xl flex flex-col border-l border-border"
            >
              <div className="p-6 border-b border-border bg-section flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-heading font-bold text-sm">{selectedSystem.num}</div>
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-accent block">System Specification</span>
                    <h3 className="text-lg font-heading font-bold text-heading tracking-tight leading-tight">{selectedSystem.consumerTitle}</h3>
                  </div>
                </div>
                <button onClick={closeDrawer} aria-label="Close" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-heading hover:text-accent hover:border-accent transition-all cursor-pointer bg-card shadow-sm"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Photography */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border bg-section">
                  <ImageCarousel images={selectedSystem.images} alt={selectedSystem.consumerTitle} />
                </div>

                {/* Summary */}
                <div className="space-y-3">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-accent block">System Overview</span>
                  <h4 className="text-base font-heading font-bold text-heading">{selectedSystem.title}</h4>
                  <p className="text-sm text-body leading-relaxed font-light">{selectedSystem.simpleDesc}</p>
                  <p className="text-sm text-accent font-medium leading-relaxed">{selectedSystem.benefits}</p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-accent block">Key Features</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedSystem.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-heading font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-4">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-accent block">Technical Specifications</span>
                  <div className="divide-y divide-border border-y border-border">
                    {[
                      { label: "Aluminium Profile Alloy", value: selectedSystem.alloy },
                      { label: "Weather / Insulation Barrier", value: selectedSystem.thermalBreak },
                      { label: "Panel / Glazing Capacity", value: selectedSystem.glassCap },
                      { label: "Drawing Reference", value: selectedSystem.dwgRef },
                      { label: "Recommended Applications", value: selectedSystem.apps },
                    ].map((spec) => (
                      <div key={spec.label} className="flex items-start justify-between gap-6 py-3.5">
                        <span className="text-sm text-body font-light flex-shrink-0 max-w-[45%]">{spec.label}</span>
                        <span className="text-sm text-heading font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-section flex flex-col sm:flex-row gap-3">
                <Button href={`/request-quote?system=${encodeURIComponent(selectedSystem.consumerTitle)}`} variant="primary" className="flex-1">Request a Quote</Button>
                <Button href="/contact" variant="outline" className="flex-1">Talk to an Engineer</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
