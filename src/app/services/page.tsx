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
  Layers,
  DoorOpen,
  LayoutGrid,
  Sun,
  Sparkles,
  Shield,
  Ruler,
  Thermometer,
  Eye,
  MessageSquare,
  Maximize2,
  Compass,
  Cpu,
  CheckSquare,
  Wrench,
  Award,
  Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ProcessSection from "@/components/ui/ProcessSection";

/* --------------------------------------------------- DATA ------------------- */

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
  dwgRef: string;
  alloy: string;
  thermalBreak: string;
  glassCap: string;
}

const categories = [
  {
    id: "glazing",
    label: "Glazing & Facades",
    icon: Layers,
    color: "#C28B45",
    description: "Ultra-slim profile frames and glass wall facades for unobstructed viewscapes",
    href: "/services/glazing-facades",
  },
  {
    id: "openings",
    label: "Doors & Windows",
    icon: DoorOpen,
    color: "#00515C",
    description: "Bi-folding systems, hinged doors, pivot entrances, and motorized profiles",
    href: "/services/doors-windows",
  },
  {
    id: "partitions",
    label: "Interior Partitions",
    icon: LayoutGrid,
    color: "#6B4226",
    description: "Acoustic glass dividers, telescopic tracks, and synchronized room partitions",
    href: "/services/interior-partitions",
  },
  {
    id: "outdoor",
    label: "Outdoor & Shading",
    icon: Sun,
    color: "#2E7D32",
    description: "Motorized pergolas, retractable roofs, screens, and custom architectural solutions",
    href: "/services/outdoor-shading",
  },
];

const allSystems: Record<string, SystemItem[]> = {
  glazing: [
    {
      num: "01", id: "slimline",
      title: "Alcom Ultra Luxury 18 mm Slimline System",
      consumerTitle: "Panoramic Minimalist Glass Walls",
      simpleDesc: "Lavish sliding glass walls with paper-thin 18mm center borders, designed to provide endless ocean or lawn views.",
      features: ["Super slim 18mm visible center frame", "Seamless hidden bottom floor track layout", "Extremely tall glass panels up to 4.5 meters"],
      benefits: "Blocks heat while giving a 98% unobstructed visual landscape.",
      apps: "Luxury Villas · Master Suites · Luxury Penthouses",
      img: "/services/brochure-img-6.jpg", dwgRef: "DWG-SL-18UL",
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
      img: "/services/brochure-img-7.jpg", dwgRef: "DWG-FS-20UL",
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
      img: "/services/brochure-img-8.jpg", dwgRef: "DWG-MN-19L",
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
      img: "/services/brochure-img-16.jpg", dwgRef: "DWG-CW-CAP",
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
      img: "/services/brochure-img-18.jpg", dwgRef: "DWG-CW-SEMU",
      alloy: "Alloy 6063-T6 Toggle Rail extrusion", thermalBreak: "Custom Silicone Isolation Padding",
      glassCap: "Double Reflective Low-E (6mm Ref + 14Argon + 6mm Toughened)"
    },
    {
      num: "06", id: "skylights",
      title: "Alcom Skylight Facade System",
      consumerTitle: "Sunlit Glass Roofs & Skylights",
      simpleDesc: "Sloped or curved glass roofs built with galvanized steel frameworks to flood interior courtyards with natural light.",
      features: ["Galvanized steel interior subframe structural strength", "Integrated collector channels for absolute waterproofing", "Solar heat protection laminated glass options"],
      benefits: "Provides direct sky daylight without rain leakage worries.",
      apps: "Villa Atriums · Shopping Malls · Swimming Pools",
      img: "/services/brochure-img-21.jpg", dwgRef: "DWG-SK-FAC",
      alloy: "Galvanized Subframe & Alloy 6063-T6 Caps", thermalBreak: "Double-Gutter Leak Proof Drainage System",
      glassCap: "Heat Shield Laminated (8mm Solar + 12Argon + 6.6PVB)"
    },
  ],
  openings: [
    {
      num: "07", id: "sliding-windows",
      title: "Alcom Serio Bi-fold System - 70",
      consumerTitle: "Folding Glass Patio Doors",
      simpleDesc: "Multiple glass panels that slide and fold flat to the side, completely opening up your living room to the garden deck.",
      features: ["Folds completely flat on bottom tracks", "Double weather seals to block storm drafts", "Low child-friendly floor thresholds available"],
      benefits: "Blends indoor rooms with outdoor gardens seamlessly.",
      apps: "Living Room Terraces · Patios · Garden Entrances",
      img: "/services/brochure-img-4.jpg", dwgRef: "DWG-BF-70S",
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
      img: "/services/brochure-img-11.jpg", dwgRef: "DWG-CS-50J",
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
      img: "/services/brochure-img-9.jpg", dwgRef: "DWG-PT-42P",
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
      img: "/services/brochure-img-9.jpg", dwgRef: "DWG-VN-40P",
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
      img: "/services/brochure-img-32.jpg", dwgRef: "DWG-GT-MOT",
      alloy: "Alloy 6063-T6 Balustrade Profile", thermalBreak: "Integrated Rubber EPDM Seal Blocks",
      glassCap: "Extra Clear Tempered Monolithic (10mm / 12mm)"
    },
  ],
  partitions: [
    {
      num: "12", id: "office-partitions",
      title: "Alcom Office Partition System",
      consumerTitle: "Soundproof Office Glass Partition Walls",
      simpleDesc: "Slim aluminum and glass walls to divide office rooms, providing sound insulation and visual connection.",
      features: ["Super slim track frames for minimal layout", "Acoustic gasket inserts inside glass tracks", "Available with custom logo frost film or clear glass"],
      benefits: "Brings daylight deep into workspaces while keeping meeting rooms private.",
      apps: "CEO Cabins · Conference Rooms · Shared Coworking spaces",
      img: "/services/brochure-img-33.jpg", dwgRef: "DWG-PT-OFF",
      alloy: "Alloy 6063-T5 Interior Grade", thermalBreak: "Acoustic Rubber Dampeners",
      glassCap: "Acoustic Laminated Glass (6mm + 1.52PVB Sound + 6mm)"
    },
    {
      num: "13", id: "glass-railings",
      title: "Alcom Telescopic Sliding Partition",
      consumerTitle: "Sliding Stackable Glass Dividers",
      simpleDesc: "Overlapping glass panels that slide and stack neatly against the wall, allowing you to instantly partition a large room.",
      features: ["Telescopic sliding rollers for ease", "Saves space by stacking together when open", "Whisper quiet roller hanger wheels"],
      benefits: "Splits or opens living spaces on demand without heavy doors.",
      apps: "Home Living Room Dividers · Office Meeting Rooms",
      img: "/services/brochure-img-30.jpg", dwgRef: "DWG-PT-TELE",
      alloy: "Alloy 6063-T6 Top Hanger Track", thermalBreak: "Vibration Dampening Rubber Rings",
      glassCap: "Toughened Monolithic (10mm / 12mm)"
    },
    {
      num: "14", id: "balustrades",
      title: "Alcom Synchro Sliding Glass Partition",
      consumerTitle: "Synchronized Sliding Room Dividers",
      simpleDesc: "Advanced sliding partition where sliding one glass panel automatically slides the remaining panels in sync.",
      features: ["Synchronized dual direction tracks", "Keeps floor flat and seamless (no bottom track)", "Anodized high durability hardware pulls"],
      benefits: "One-handed operation to slide open wide gaps without heavy load profiles.",
      apps: "Luxury Kitchen Entries · Master Bedroom Dividers",
      img: "/services/brochure-img-31.jpg", dwgRef: "DWG-PT-SYNC",
      alloy: "Alloy 6063-T6 Track Extrusion", thermalBreak: "Nylon Gasket Inserts",
      glassCap: "Clear Toughened Glass (10mm)"
    },
  ],
  outdoor: [
    {
      num: "15", id: "pergolas",
      title: "Alcom Motorized Pergolas & Louvre Systems",
      consumerTitle: "Motorized Shading Louvre Patio Roofs",
      simpleDesc: "Motorized aluminum patio roofs with louvers that tilt at the push of a button, letting in sun or blocking rain.",
      features: ["Tilting louver panels via remote control", "Internal water drainage post paths", "Built-in perimeter LED spotlights"],
      benefits: "100% waterproof when closed, allowing year-round patio use.",
      apps: "Villa Gardens · Rooftop Patios · Poolside Lounge Decks",
      img: "/services/brochure-img-19.jpg", dwgRef: "DWG-PG-MOT",
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
      img: "/services/brochure-img-22.jpg", dwgRef: "DWG-RF-RET",
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
      img: "/services/brochure-img-12.jpg", dwgRef: "DWG-MS-PLE",
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
      img: "/services/brochure-img-19.jpg", dwgRef: "DWG-SC-LVR",
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
      img: "/services/brochure-img-11.jpg", dwgRef: "DWG-VT-AIR",
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
      img: "/services/brochure-img-22.jpg", dwgRef: "DWG-CS-BESP",
      alloy: "Bespoke Grade Custom Alloys (6061-T6 / 6063-T6)", thermalBreak: "Project-Specific Custom Insulation Gaskets",
      glassCap: "Engineered Glass Assemblies (up to 48mm Thickness)"
    },
  ],
};



/* ----------------------------- ANIMATION VARIANTS --------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ------------------------------- STAT COUNTER ------------------------------- */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const stepTime = 16;
          const steps = duration / stepTime;
          const increment = target / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ------------------------------- MAIN COMPONENT ---------------------------- */

export default function ServicesPage() {


  // Hash routing support for scrolling to categories on mount or hash changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 200);
          }
        }
      };

      // Run on initial load
      handleHashChange();

      // Listen for hash changes
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* Page Hero */}
      <section className="relative pt-28 pb-12 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image
            src="/services/brochure-img-2.jpg"
            alt="Premium architectural systems catalog"
            fill
            className="object-cover animate-[pulse-slow]"
            sizes="100vw"
            priority
            loading="eager"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-20 max-w-7xl">
          <div className="breadcrumbs text-xs text-body/70 mb-4 flex items-center gap-2 font-heading uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-accent" />
            <span className="text-heading">Services</span>
          </div>
          
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">
            System Catalog
          </span>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-4xl tracking-tight">
            Precision Crafted Aluminium Systems.
          </h1>
          
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light mb-8">
            From panoramic glass facades to motorized pergolas, explore our comprehensive collection of custom-engineered architectural solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              href="/request-quote"
              variant="accent"
              className="shadow-xl shadow-[#C28B45]/20 hover:scale-105 transition-transform duration-300"
            >
              Request Project Quote
            </Button>
            <button
              onClick={() => document.getElementById("services-catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/5 transition-all cursor-pointer bg-white/50 backdrop-blur-sm"
            >
              Explore Systems <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================== FLOATING STAT COUNTERS ===================== */}
      <section className="relative z-20 -mt-16">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 20, suffix: "+", label: "System Profiles" },
              { value: 48, suffix: "mm", label: "Max Glass Capacity" },
              { value: 4, suffix: "", label: "Product Categories" },
              { value: 15, suffix: "+", label: "Years Expertise" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-xl shadow-black/5 border border-[#C28B45]/10 hover:border-[#C28B45]/30 transition-all group"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-secondary/60 uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DIVISION CATALOGUE (SPLIT-FEATURE SECTIONS) ===================== */}
      <div id="services-grid" className="scroll-mt-32">
        {categories.map((cat, idx) => {
          const isEven = idx % 2 === 0;
          const systems = allSystems[cat.id] || [];
          
          // Image selected for this division
          const divisionImage = systems[0]?.img || "/services/brochure-img-2.jpg";

          return (
            <section
              key={cat.id}
              id={cat.id}
              className={`relative flex flex-col min-h-[480px] border-b border-primary/5 scroll-mt-28 ${
                isEven ? "lg:flex-row bg-white" : "lg:flex-row-reverse bg-[#FAF9F5]"
              }`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative h-[320px] lg:h-auto">
                <Image
                  src={divisionImage}
                  alt={cat.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#001518]/5 pointer-events-none" />
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-5">
                <span className="text-[#C28B45] font-heading font-bold uppercase tracking-widest text-xs md:text-sm">
                  DIVISION 0{idx + 1} {"//"} {cat.label}
                </span>
                
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary leading-tight tracking-tight">
                  {cat.label}
                </h2>
                
                <p className="text-secondary/80 leading-relaxed text-xs md:text-sm font-light">
                  {cat.description}
                </p>

                {/* Systems checklist */}
                <ul className="space-y-2">
                  {systems.map((system) => (
                    <li key={system.id} className="flex items-center text-xs md:text-sm font-semibold text-primary">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#C28B45] mr-3 flex-shrink-0" />
                      {system.title}
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Button 
                    href={cat.href} 
                    variant="accent" 
                    className="gold-glow hover:scale-105 transition-transform duration-300"
                  >
                    Explore Division Systems &rarr;
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===================== OUR PROCESS SECTION ===================== */}
      <section id="process" className="py-8 md:py-16 border-t border-primary/5 bg-[#FAF9F5]/40">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#C28B45] uppercase block mb-4">How We Work</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-primary leading-tight mb-4">
              Our Facade Engineering <span className="italic font-light">Process</span>
            </h2>
            <p className="text-xs md:text-sm text-secondary/70 font-light max-w-lg mx-auto">
              From initial blueprints to after-sales maintenance support, we check every millimeter of your custom glazing.
            </p>
          </div>

          <ProcessSection />

        </div>
      </section>

      {/* ===================== PREMIUM CONSULTATION CTA ===================== */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(194,139,69,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(194,139,69,0.1),transparent_50%)]" />

        {/* Decorative border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C28B45]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C28B45]/40 to-transparent" />

        <div className="container mx-auto px-6 md:px-12 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-2 rounded-full border border-[#C28B45]/20 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#C28B45]" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#C28B45] uppercase font-bold">
                Complimentary Facade Consulting
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white leading-tight mb-6">
              Have architectural blueprints?
              <br />
              <span className="italic font-light text-[#C28B45]">Let us engineer the perfect match.</span>
            </h2>

            <p className="text-base text-white/50 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload your elevation drawings or hand-sketches. Our facade engineering team will analyze 
              structural wind-loads, thermal criteria, and aesthetic requirements to recommend the ideal system profiles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/request-quote"
                variant="accent"
                size="lg"
                className="shadow-xl shadow-[#C28B45]/30 hover:scale-105 transition-transform"
              >
                Upload Elevation Blueprints
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#C28B45] transition-colors font-medium py-3 px-5"
              >
                Speak with Lead Engineer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
