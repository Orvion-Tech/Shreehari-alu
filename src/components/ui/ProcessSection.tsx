"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Maximize2, 
  Compass, 
  Layers, 
  Cpu, 
  CheckSquare, 
  Wrench, 
  Award, 
  Phone, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Target,
  Ruler,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Process Steps Data
const processSteps = [
  {
    num: "01",
    title: "Consultation & Survey",
    icon: MessageSquare,
    desc: "We review your blueprints, discuss design preferences, and perform a precise site survey with digital measurements.",
    img: "/services/brochure-img-2.jpg",
    specs: [
      { label: "Layout Review", val: "Understanding your vision & blueprints", icon: Ruler },
      { label: "Digital Survey", val: "Precision scanning of wall openings", icon: Target },
      { label: "Cost Planning", val: "Clear estimates & package proposals", icon: ShieldCheck },
    ],
  },
  {
    num: "02",
    title: "Design & Engineering",
    icon: Compass,
    desc: "We create detailed shop drawings, wind-pressure calculations, and structural layouts for your approval.",
    img: "/services/brochure-img-13.jpg",
    specs: [
      { label: "Custom Blueprints", val: "2D/3D visual plans of each frame", icon: Ruler },
      { label: "Safety Verification", val: "Sturdy designs that resist high winds", icon: Target },
      { label: "Final Approval", val: "Certified structural safety check", icon: ShieldCheck },
    ],
  },
  {
    num: "03",
    title: "Material Selection",
    icon: Layers,
    desc: "Sourcing premium architectural-grade aluminium profiles, thermal insulation barriers, and high-performance glass.",
    img: "/services/brochure-img-15.jpg",
    specs: [
      { label: "Aluminium Quality", val: "Architectural-grade premium frames", icon: Ruler },
      { label: "Insulation", val: "Weather seals & heat-barrier blocks", icon: Target },
      { label: "Glass Options", val: "Sound-blocking & energy-saving glass", icon: ShieldCheck },
    ],
  },
  {
    num: "04",
    title: "Fabrication & QC",
    icon: Cpu,
    desc: "Precision cutting and lock assembly in our advanced facility, followed by rigorous testing of lock actions and rain seal compression.",
    img: "/services/brochure-img-16.jpg",
    specs: [
      { label: "Frame Cutting", val: "Laser-accurate profile sizing", icon: Ruler },
      { label: "Corner Joints", val: "Super-strong leak-proof joints", icon: Target },
      { label: "Quality Inspection", val: "Millimeter size & glide verification", icon: ShieldCheck },
    ],
  },
  {
    num: "05",
    title: "Installation",
    icon: Wrench,
    desc: "Secure structural fixing at your site using heavy brackets, premium silicone, and professional hoisting.",
    img: "/services/brochure-img-18.jpg",
    specs: [
      { label: "Frame Mounting", val: "Heavy steel brackets for safety", icon: Ruler },
      { label: "Waterproofing", val: "Premium weather-proof silicone seals", icon: Target },
      { label: "Safe Hoisting", val: "Secure crane lift for large glass panes", icon: ShieldCheck },
    ],
  },
  {
    num: "06",
    title: "Project Handover",
    icon: Award,
    desc: "Final adjustments to rollers, deep cleaning of all frames and glass, and handing over keys and warranties.",
    img: "/services/brochure-img-24.jpg",
    specs: [
      { label: "Calibration", val: "effortless opening & smooth glide", icon: Ruler },
      { label: "Glass Polishing", val: "Spotless, factory-fresh cleaning", icon: Target },
      { label: "Handover Pack", val: "Warranties, user guides & keys", icon: ShieldCheck },
    ],
  },
  {
    num: "07",
    title: "After-Sales Support",
    icon: Phone,
    desc: "Dedicated support team for annual lock checkups, seal inspections, and swift hardware adjustments.",
    img: "/services/brochure-img-12.jpg",
    specs: [
      { label: "Quick Response", val: "Priority support for any concern", icon: Ruler },
      { label: "Maintenance", val: "Annual lock checks & track cleaning", icon: Target },
      { label: "Parts Guarantee", val: "Genuine spares for locks & fittings", icon: ShieldCheck },
    ],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [coords, setCoords] = useState({ x: 140.22, y: 88.54 });
  const stepperRef = useRef<HTMLDivElement>(null);

  // Simulate real-time coordinates changing for the CAD viewport
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: +(140 + Math.random() * 5).toFixed(2),
        y: +(88 + Math.random() * 5).toFixed(2),
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Center active step in horizontal scroll on mobile
  useEffect(() => {
    if (stepperRef.current) {
      const activeElement = stepperRef.current.children[activeStep] as HTMLElement;
      if (activeElement) {
        const containerWidth = stepperRef.current.offsetWidth;
        const elementOffset = activeElement.offsetLeft;
        const elementWidth = activeElement.offsetWidth;
        stepperRef.current.scrollTo({
          left: elementOffset - containerWidth / 2 + elementWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeStep]);

  const currentStep = processSteps[activeStep];
  const StepIcon = currentStep.icon;

  const nextStep = () => {
    if (activeStep < processSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full">
      {/* ================= STEPS NAVIGATION RAIL ================= */}
      <div className="hidden md:block relative mb-10 select-none">
        {/* Background track line */}
        <div className="absolute left-6 right-6 top-8 h-[2px] bg-primary/5 pointer-events-none" />
        
        {/* Active track filling line (Animated) */}
        <div className="absolute left-6 right-6 top-8 h-[2px] pointer-events-none overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Stepper buttons container */}
        <div 
          ref={stepperRef}
          className="flex justify-between items-center w-full overflow-x-auto pb-4 pt-4 px-4 scrollbar-none gap-6 snap-x snap-mandatory"
        >
          {processSteps.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStep === idx;
            const isCompleted = idx < activeStep;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className="flex-shrink-0 flex flex-col items-center cursor-pointer group snap-center z-10"
                style={{ minWidth: "90px" }}
              >
                {/* Node bubble */}
                <div className="relative">
                  <motion.div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border ${
                      isActive
                        ? "bg-accent text-white border-accent shadow-lg shadow-accent/25 scale-110"
                        : isCompleted
                        ? "bg-primary text-white border-primary"
                        : "bg-card text-primary/40 border-primary/10 hover:border-accent/50 hover:text-primary"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>

                  {/* Absolute small phase number tag */}
                  <span className={`absolute -top-1.5 -right-1.5 w-5.5 h-5.5 text-[10px] font-mono font-bold rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-accent border-accent" 
                      : "bg-card text-primary/60 border-primary/15"
                  }`}>
                    {step.num}
                  </span>

                  {/* Outer active pulse ring */}
                  {isActive && (
                    <motion.div 
                      layoutId="pulseRing"
                      className="absolute -inset-1.5 rounded-full border border-accent/40 pointer-events-none"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>

                {/* Step Title text under node */}
                <span className={`mt-3 block text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-widest text-center transition-all duration-300 ${
                  isActive 
                    ? "text-accent scale-105" 
                    : "text-body/85 group-hover:text-primary"
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= DETAILED BOARD ================= */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* LEFT COLUMN: Details & Telemetry Specs */}
            <div className="lg:col-span-7 bg-gradient-to-br from-card to-[#FAF9F6] rounded-3xl p-4 md:p-7 border-t-4 border-t-accent border-x border-b border-primary/5 premium-shadow flex flex-col justify-between relative overflow-hidden">
              {/* Subtle background watermark (outlined in gold accent) */}
              <div 
                className="absolute -top-4 -right-4 text-[7rem] font-bold font-mono tracking-tighter select-none pointer-events-none opacity-20"
                style={{ WebkitTextStroke: "1px rgba(194, 139, 69, 0.2)", color: "transparent" }}
              >
                {currentStep.num}
              </div>

              <div className="space-y-4 z-10">
                {/* Header */}
                <div className="border-b border-primary/10 pb-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[9px] font-mono tracking-[0.25em] text-accent uppercase font-bold">
                      Phase {currentStep.num} {"//"} Engineering Cycle
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-primary tracking-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs md:text-sm text-body/95 leading-relaxed mt-2 font-light max-w-2xl">
                    {currentStep.desc}
                  </p>
                </div>

                {/* Mobile CAD Viewport */}
                <div className="block lg:hidden bg-gradient-to-b from-[#032326] to-[#011417] rounded-xl p-3 border border-accent/20 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.25)]">
                  {/* CAD blueprint grid background */}
                  <div className="absolute inset-0 cad-grid opacity-15 pointer-events-none" />
                  
                  {/* Viewport coordinate overlay crosshairs */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/30 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/30 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/30 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/30 pointer-events-none" />

                  {/* Telemetry info */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-accent/90 tracking-wider pb-1.5 border-b border-accent/10">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" style={{ animationDuration: '3s' }} />
                      <span>VIEWPORT // DET_0{currentStep.num}</span>
                    </div>
                    <span className="text-white/70">TOLERANCE: +/-0.5mm</span>
                  </div>

                  {/* Mobile Image container */}
                  <div className="relative my-2 aspect-[16/9] w-full rounded-lg overflow-hidden border border-accent/20 bg-[#011417]/90 shadow-inner">
                    <Image
                      src={currentStep.img}
                      alt={currentStep.title}
                      fill
                      className="object-cover opacity-85 pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 320px"
                      priority
                    />
                    
                    {/* Laser scanner sweeping bar */}
                    <motion.div 
                      className="absolute left-0 right-0 h-[1px] bg-accent/90 shadow-[0_0_6px_rgba(194,139,69,0.9)] z-10"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                    />
                    
                    {/* Visual CAD Crosshair Target HUD (Center absolute) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 border border-accent/20 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
                      </div>
                      <div className="absolute w-10 h-[1px] bg-accent/20" />
                      <div className="absolute h-10 w-[1px] bg-accent/20" />
                    </div>
                  </div>

                  {/* Footer telemetry */}
                  <div className="flex justify-between items-center text-[7px] font-mono text-accent/50 tracking-wider pt-1.5 border-t border-accent/10">
                    <span>SHREE HARI GL-SYS V2.4</span>
                    <span className="text-white/85 font-bold animate-pulse">X:{coords.x} Y:{coords.y}</span>
                  </div>
                </div>

                {/* Telemetry Widgets Grid */}
                <div>
                  <h4 className="text-[9px] font-mono tracking-widest text-body/50 uppercase font-bold mb-2.5 flex items-center gap-1">
                    <span>[ TECHNICAL TELEMETRY LOG ]</span>
                  </h4>
                  
                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-3 gap-3">
                    {currentStep.specs.map((spec, i) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div 
                          key={spec.label}
                          className="bg-gradient-to-br from-[#FAF9F5] to-white rounded-xl p-3 border border-accent-light/50 hover:border-accent/35 hover:shadow-md hover:shadow-accent/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between pb-1.5 border-b border-primary/[0.03]">
                            <span className="text-[9px] font-mono text-body/80 uppercase tracking-wider block font-semibold">
                              {spec.label}
                            </span>
                            <div className="w-6 h-6 rounded-md bg-accent/5 flex items-center justify-center border border-accent/10 group-hover:bg-accent/10 transition-all">
                              <SpecIcon className="w-3 h-3 text-accent" />
                            </div>
                          </div>
                          
                          <div className="my-2 flex-grow">
                            <span className="text-xs font-bold text-primary tracking-tight leading-snug line-clamp-2">
                              {spec.val}
                            </span>
                          </div>

                          {/* Mini simulated status gauge */}
                          <div className="w-full bg-primary/5 h-[2px] rounded-full overflow-hidden mt-1 relative">
                            <motion.div 
                              className="bg-accent h-full rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: i === 0 ? "90%" : i === 1 ? "75%" : "95%" }}
                              transition={{ delay: 0.1 * i, duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Compact List Layout (Saves massive vertical space) */}
                  <div className="md:hidden border border-accent-light/50 rounded-xl divide-y divide-primary/[0.03] bg-gradient-to-br from-[#FAF9F5] to-white overflow-hidden">
                    {currentStep.specs.map((spec) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div key={spec.label} className="flex items-center justify-between p-2.5 gap-3">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <SpecIcon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span className="text-[9px] font-mono text-body/80 uppercase tracking-wider truncate font-semibold">{spec.label}</span>
                          </div>
                          <span className="text-xs font-bold text-primary text-right truncate min-w-0 flex-1">{spec.val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom footer & buttons */}
              <div className="border-t border-primary/5 pt-3.5 mt-5 flex flex-col sm:flex-row items-center gap-3 justify-between">
                <span className="text-[8px] font-mono text-body/45 uppercase tracking-widest">
                  SHREE HARI // SPEC {currentStep.num}
                </span>

                <div className="flex gap-2.5">
                  <button
                    onClick={prevStep}
                    disabled={activeStep === 0}
                    className={`px-3.5 py-2 rounded-lg border border-primary/10 text-[11px] font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeStep === 0 
                        ? "opacity-30 cursor-not-allowed text-body/40" 
                        : "text-primary hover:bg-primary/5 hover:border-primary/20"
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={activeStep === processSteps.length - 1}
                    className={`px-3.5 py-2 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeStep === processSteps.length - 1
                        ? "opacity-30 cursor-not-allowed bg-accent/40 text-white/50" 
                        : "bg-accent text-white hover:bg-accent/90 hover:scale-[1.01] shadow-md shadow-accent/15"
                    }`}
                  >
                    Next Phase <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CAD Viewport */}
            <div className="hidden lg:flex lg:col-span-5 bg-[#032326] rounded-3xl p-5 md:p-6 border border-accent/25 relative overflow-hidden flex-col justify-between min-h-0 shadow-2xl">
              {/* CAD blueprint grid background */}
              <div className="absolute inset-0 cad-grid opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(194,139,69,0.08),transparent_75%)] pointer-events-none" />

              {/* Viewport coordinate overlay crosshairs (Static SVG styling) */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent/40 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-accent/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-accent/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent/40 pointer-events-none" />

              {/* Viewport Telemetry Info */}
              <div className="flex justify-between items-start text-[8px] font-mono text-accent/60 tracking-wider z-10 pb-3 border-b border-accent/10">
                <div className="space-y-1">
                  <div>VIEWPORT // DET_0{currentStep.num}</div>
                  <div className="text-white/55">STATUS: CALIBRATED</div>
                </div>
                <div className="text-right space-y-1">
                  <div>TOLERANCE: +/-0.5mm</div>
                  <div className="text-white/80 animate-pulse">
                    COORDS: X:{coords.x} Y:{coords.y}
                  </div>
                </div>
              </div>

              {/* Center Image Frame */}
              <div className="relative my-3 aspect-[16/10] w-full max-w-[380px] mx-auto rounded-xl overflow-hidden border border-accent/25 bg-[#011417]/80 shadow-inner group">
                <Image
                  src={currentStep.img}
                  alt={currentStep.title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 350px"
                  priority
                />
                
                {/* Visual CAD Crosshair Target HUD (Center absolute) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 border border-accent/30 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-accent/70 rounded-full" />
                  </div>
                  <div className="absolute w-12 h-[1px] bg-accent/30" />
                  <div className="absolute h-12 w-[1px] bg-accent/30" />
                </div>

                {/* Laser scanner sweeping bar (Animated) */}
                <motion.div 
                  className="absolute left-0 right-0 h-[1.5px] bg-accent/90 shadow-[0_0_8px_rgba(194,139,69,0.9)] z-10"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                />

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-[#00373E]/10 pointer-events-none mix-blend-overlay" />
              </div>

              {/* Viewport footer specs */}
              <div className="flex justify-between items-center text-[8px] font-mono text-accent/60 tracking-wider z-10 pt-4 border-t border-accent/10">
                <span>SHREE HARI GL-SYS V2.4</span>
                <span>ASSEMBLY_DRAFT // OK</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
