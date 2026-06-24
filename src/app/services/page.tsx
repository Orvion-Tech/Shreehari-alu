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
} from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import Button from "@/components/ui/Button";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* ─────────────────────────────────────────────────── DATA ─────────────────── */

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
  },
  {
    id: "openings",
    label: "Doors & Windows",
    icon: DoorOpen,
    color: "#00515C",
    description: "Bi-folding systems, hinged doors, pivot entrances, and motorized profiles",
  },
  {
    id: "partitions",
    label: "Interior Partitions",
    icon: LayoutGrid,
    color: "#6B4226",
    description: "Acoustic glass dividers, telescopic tracks, and synchronized room partitions",
  },
  {
    id: "outdoor",
    label: "Outdoor & Shading",
    icon: Sun,
    color: "#2E7D32",
    description: "Motorized pergolas, retractable roofs, screens, and custom architectural solutions",
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

/* ───────────────────────────── ANIMATION VARIANTS ─────────────────────────── */

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

/* ─────────────────────────────── STAT COUNTER ─────────────────────────────── */

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

/* ─────────────────────────────── MAIN COMPONENT ──────────────────────────── */

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("glazing");
  const [modalSystem, setModalSystem] = useState<SystemItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Hash routing support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        for (const [catId, systems] of Object.entries(allSystems)) {
          const found = systems.find(s => s.id === hash);
          if (found) {
            setActiveCategory(catId);
            setTimeout(() => {
              document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" });
            }, 200);
            break;
          }
        }
      }
    }
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const openModal = useCallback((system: SystemItem) => {
    setModalSystem(system);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setModalSystem(null), 300);
  }, []);

  const currentSystems = allSystems[activeCategory] || [];
  const activeCategoryData = categories.find(c => c.id === activeCategory)!;

  return (
    <div className={`bg-[#FAFAF8] min-h-screen ${cormorant.variable}`}>

      {/* ═══════════════════ IMMERSIVE HERO SECTION ═══════════════════ */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/services/brochure-img-2.jpg"
            alt="Premium architectural aluminium systems"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00373E]/70 via-[#00373E]/50 to-[#00373E]/90" />
        </motion.div>

        {/* Floating geometric accents */}
        <div className="absolute top-20 right-20 w-72 h-72 border border-[#C28B45]/20 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none hidden lg:block" />
        <div className="absolute bottom-32 left-16 w-40 h-40 border border-white/10 rotate-45 pointer-events-none hidden lg:block" />

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center container mx-auto px-6 md:px-12 max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C28B45]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C28B45] uppercase">
                20 Elite Architectural Systems
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Precision Crafted
              <br />
              <span className="italic font-normal text-[#C28B45]">Aluminium</span> Systems
            </h1>

            <p className="text-base md:text-lg text-white/70 font-light max-w-xl leading-relaxed mb-10">
              From panoramic glass walls to motorized outdoor roofs — discover our complete 
              catalog of architectural aluminium solutions engineered for the extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/request-quote"
                variant="accent"
                className="shadow-xl shadow-[#C28B45]/20"
              >
                Request Project Quote
              </Button>
              <button
                onClick={() => document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all cursor-pointer"
              >
                Explore Systems <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#C28B45] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ FLOATING STAT COUNTERS ═══════════════════ */}
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
                <div className="text-3xl md:text-4xl font-light text-primary mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-secondary/60 uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORY TABS + GRID ═══════════════════ */}
      <section id="services-grid" className="pt-24 pb-32">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#C28B45] uppercase block mb-4">
              Our Catalog
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-primary leading-tight mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
              Explore by <span className="italic font-normal">Category</span>
            </h2>
            <p className="text-sm text-secondary/70 font-light max-w-lg mx-auto">
              Select a category below to browse our curated collection of precision-engineered aluminium systems.
            </p>
          </motion.div>

          {/* Category Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group relative flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white text-secondary border border-primary/10 hover:border-[#C28B45]/40 hover:shadow-md"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#C28B45]" : "text-secondary/50 group-hover:text-[#C28B45]"}`} />
                  {cat.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Category Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <Sparkles className="w-4 h-4 text-[#C28B45]" />
              <p className="text-sm text-secondary/70 font-light italic">{activeCategoryData.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Systems Card Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentSystems.map((system, idx) => (
                <motion.div
                  key={system.id}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-primary/5 hover:border-[#C28B45]/30 shadow-sm hover:shadow-2xl hover:shadow-[#C28B45]/10 transition-all duration-500 cursor-pointer"
                  onClick={() => openModal(system)}
                >
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={system.img}
                      alt={system.consumerTitle}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* System number badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-[#C28B45]/20">
                      <span className="text-[11px] font-mono font-bold text-primary">{system.num}</span>
                    </div>

                    {/* CAD Reference tag */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-[#C28B45]">{system.dwgRef}</span>
                    </div>

                    {/* Bottom overlay on hover */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                      <div className="flex flex-wrap gap-1.5">
                        {system.apps.split(" · ").map((app, i) => (
                          <span key={i} className="text-[9px] font-medium px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/10">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-primary leading-snug group-hover:text-[#C28B45] transition-colors">
                      {system.consumerTitle}
                    </h3>
                    <p className="text-xs text-secondary/70 font-light leading-relaxed line-clamp-2">
                      {system.simpleDesc}
                    </p>

                    {/* Feature pills */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-secondary/60">
                        <Shield className="w-3 h-3 text-[#C28B45]" />
                        <span>{system.alloy.split(" ")[1]}</span>
                      </div>
                      <div className="w-px h-3 bg-primary/10" />
                      <div className="flex items-center gap-1.5 text-[10px] text-secondary/60">
                        <Thermometer className="w-3 h-3 text-[#C28B45]" />
                        <span>Thermal Break</span>
                      </div>
                    </div>

                    {/* View details link */}
                    <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-[#C28B45] uppercase group-hover:tracking-[0.2em] transition-all">
                        View Details
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#C28B45]/10 flex items-center justify-center group-hover:bg-[#C28B45] transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-[#C28B45] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════ PREMIUM CONSULTATION CTA ═══════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(194,139,69,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(194,139,69,0.1),transparent_50%)]" />

        {/* Decorative border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C28B45]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C28B45]/40 to-transparent" />

        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
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

            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Have architectural blueprints?
              <br />
              <span className="italic font-normal text-[#C28B45]">Let us engineer the perfect match.</span>
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

      {/* ═══════════════════ FULLSCREEN MODAL ═══════════════════ */}
      <AnimatePresence>
        {isModalOpen && modalSystem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 md:p-6 border-b border-primary/5 bg-[#FAFAF8]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-sm font-mono font-bold text-[#C28B45]">{modalSystem.num}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{modalSystem.consumerTitle}</h3>
                    <span className="text-[10px] font-mono tracking-wider text-secondary/60">{modalSystem.dwgRef} · {modalSystem.title}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:text-[#C28B45] hover:border-[#C28B45] transition-all cursor-pointer bg-white"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">

                  {/* Left: Full-bleed Image */}
                  <div className="relative min-h-[300px] lg:min-h-full bg-stone-100">
                    <Image
                      src={modalSystem.img}
                      alt={modalSystem.consumerTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />

                    {/* Application tags on image */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                      {modalSystem.apps.split(" · ").map((app, i) => (
                        <span key={i} className="text-[10px] font-medium px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Details Content */}
                  <div className="p-6 md:p-10 space-y-8">

                    {/* Description */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#C28B45]" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-secondary/60 uppercase">Overview</span>
                      </div>
                      <p className="text-sm text-secondary leading-relaxed">
                        {modalSystem.simpleDesc}
                      </p>
                      <p className="text-sm text-primary font-medium leading-relaxed">
                        {modalSystem.benefits}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C28B45]" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-secondary/60 uppercase">Key Features</span>
                      </div>
                      <div className="space-y-2">
                        {modalSystem.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-primary/5">
                            <CheckCircle2 className="w-4 h-4 text-[#C28B45] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-secondary">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Specs Table */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-[#C28B45]" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-secondary/60 uppercase">Technical Specifications</span>
                      </div>
                      <div className="rounded-xl border border-primary/5 overflow-hidden text-sm">
                        {[
                          { label: "Aluminium Alloy", value: modalSystem.alloy },
                          { label: "Thermal Insulation", value: modalSystem.thermalBreak },
                          { label: "Glazing Capacity", value: modalSystem.glassCap },
                          { label: "Drawing Reference", value: modalSystem.dwgRef },
                        ].map((spec, i) => (
                          <div key={spec.label} className={`grid grid-cols-[140px_1fr] gap-4 p-3.5 ${i % 2 === 0 ? "bg-[#FAFAF8]" : "bg-white"} ${i < 3 ? "border-b border-primary/5" : ""}`}>
                            <span className="text-xs font-mono text-secondary/60">{spec.label}</span>
                            <span className="text-xs font-medium text-primary">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 md:p-6 border-t border-primary/5 bg-[#FAFAF8] flex flex-col sm:flex-row gap-3">
                <Button
                  href={`/request-quote?system=${encodeURIComponent(modalSystem.consumerTitle)}`}
                  variant="accent"
                  className="flex-1 shadow-md"
                >
                  Request Quote for This System
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="flex-1"
                >
                  Talk to Engineer →
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
