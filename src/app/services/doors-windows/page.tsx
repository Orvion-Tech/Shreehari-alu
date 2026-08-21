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
    num: "07", id: "sliding-windows",
    title: "Alcom Serio Bi-fold System - 70",
    consumerTitle: "Folding Glass Patio Doors",
    simpleDesc: "Multiple glass panels that slide and fold flat to the side, completely opening up your living room to the garden deck.",
    features: ["Folds completely flat on bottom tracks", "Double weather seals to block storm drafts", "Low child-friendly floor thresholds available"],
    benefits: "Blends indoor rooms with outdoor gardens seamlessly.",
    apps: "Living Room Terraces · Patios · Garden Entrances",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-BF-70S",
    alloy: "Alloy 6063-T6 Structural Profile", thermalBreak: "24mm Fiber-reinforced Polyamide Strip",
    glassCap: "Double Tempered (6mm + 12Air + 6mm)"
  },
  {
    num: "08", id: "casement-windows",
    title: "Alcom Jabron Casement System - 50",
    consumerTitle: "Hinged Glass Windows & Entry Doors",
    simpleDesc: "Classic swing-open windows and doors engineered with multi-point locks for heavy sealing and road soundproofing.",
    features: ["Swing open inside or outside structures", "Locks at multiple points for extreme security", "Accommodates mosquito mesh frames easily"],
    benefits: "Blocks heavy street noise and keeps driving rain out.",
    apps: "Bedrooms · Living Rooms · Main Frontages",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-CS-50J",
    alloy: "Alloy 6063-T6 Standard Extrusion", thermalBreak: "20mm Polyamide Thermal Break",
    glassCap: "Double Insulation (5mm + 9Air + 5mm)"
  },
  {
    num: "09", id: "aluminium-doors",
    title: "Alcom Premium Porton System - 42",
    consumerTitle: "Luxury Entry & Pivot Front Doors",
    simpleDesc: "Large-scale aluminum main entry doors that pivot on a heavy gear hinge, providing a grand entrance look.",
    features: ["Extra wide shutters up to 3.6 meters tall", "Maintenance-free anodized premium finish", "High security multi-point vertical keys"],
    benefits: "Creates a bold, flush-fitting luxury main entrance statement.",
    apps: "Main Entrances · Luxury Villa Fronts",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-PT-42P",
    alloy: "Alloy 6082-T6 Heavy Duty Core", thermalBreak: "Reinforced Polyurethane Fill Insulation",
    glassCap: "Blast-Safe Decorative Panel (Solid 4mm Plate + Laminated Glass)"
  },
  {
    num: "10", id: "bi-fold-doors",
    title: "Alcom Premium Venster System - 40",
    consumerTitle: "Corner Sliding Panoramic Windows",
    simpleDesc: "Sliding glass doors that open fully at a corner without any vertical steel mullions blocking the panorama.",
    features: ["No corner column structure required", "Corner seals locking tight in high-rise wind loads", "Ultra-smooth steel tracking rollers"],
    benefits: "Offers stunning 90-degree panoramic views of your balcony.",
    apps: "High-Rise Apartments · Penthouses",
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-VN-40P",
    alloy: "Alloy 6063-T6 Profile System", thermalBreak: "22mm Polyamide Barrier",
    glassCap: "Heavy-Duty Low-E (6mm + 12Argon + 6mm)"
  },
  {
    num: "11", id: "guillotine",
    title: "Alcom Guillotine Motorized Windows",
    consumerTitle: "Motorized Vertical Balcony Glass Railings",
    simpleDesc: "Motorized glass panels that slide down vertically. Fully down, they act as a solid glass balcony railing; up, they seal the space.",
    features: ["Motorized remote vertical movement", "Safety stop sensors to prevent pinches", "Thick tempered safety glass sheets"],
    benefits: "Converts open terraces into draft-free sunrooms in seconds.",
    apps: "High-rise Balconies · Restaurant Frontages · Penthouses",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    dwgRef: "DWG-GT-MOT",
    alloy: "Alloy 6063-T6 Balustrade Profile", thermalBreak: "Integrated Rubber EPDM Seal Blocks",
    glassCap: "Extra Clear Tempered Monolithic (10mm / 12mm)"
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

export default function DoorsWindowsPage() {
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
            <span className="text-heading font-semibold">Doors &amp; Windows</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">
                Windows &amp; Doors Systems
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-heading leading-[1.08] tracking-tight">
                Doors &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Windows
                </span>
                .
              </h1>
              <p className="text-body text-base md:text-lg font-light max-w-xl leading-relaxed">
                Expanding views and connecting environments with luxury bi-folding sliding systems, casements, large-scale custom pivots, and automated guillotine assemblies.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="#doors-catalog" variant="primary" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
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
                  src="/services/brochure-img-4.jpg"
                  alt="Doors & Windows showcase"
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
      <span id="doors-catalog" className="block scroll-mt-28" />

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
                    { label: "Thermal Break", value: system.thermalBreak },
                    { label: "Glazing", value: system.glassCap },
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
                      { label: "Thermal Insulation Barrier", value: selectedSystem.thermalBreak },
                      { label: "Sash Glazing Capacity", value: selectedSystem.glassCap },
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
