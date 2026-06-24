"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, VolumeX, Thermometer } from "lucide-react";
import Button from "./Button";

const finishes = [
  { id: "gold", name: "Anodized Gold", hex: "#C9A86A" },
  { id: "obsidian", name: "Obsidian Black", hex: "#001518" },
  { id: "bronze", name: "Architectural Bronze", hex: "#4E443C" },
  { id: "white", name: "Satin White", hex: "#F3F2EC" }
];

const profiles = [
  { id: "sliding", name: "Slimline Sliding", wind: "Class A4 (High)", desc: "Horizontal sliding sash with minimal interlocking sightlines." },
  { id: "casement", name: "Casement Frame", wind: "Class A4 (Max)", desc: "Compression-sealed hinged frame for maximum weather sealing." },
  { id: "pivot", name: "Statement Pivot", wind: "Class A3 (Medium)", desc: "Large-format rotation pivot panel for dramatic entrance scale." }
];

const glazingOptions = [
  { id: "clear", name: "Clear Single Glazed", tint: "rgba(186, 230, 253, 0.25)", acoustic: "32 dB", thermal: "2.8 U-value", desc: "Standard high-clarity single pane." },
  { id: "dgu", name: "Double Glazed DGU", tint: "rgba(201, 168, 106, 0.2)", acoustic: "42 dB", thermal: "1.4 U-value", desc: "Thermal air cavity double glazing for insulation." },
  { id: "acoustic", name: "Acoustical Laminated", tint: "rgba(212, 175, 55, 0.35)", acoustic: "48 dB", thermal: "1.2 U-value", desc: "Insulated multi-layer acoustic shielding." }
];

export default function ProductVisualizer() {
  const [frameColor, setFrameColor] = useState(finishes[0]);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [selectedGlazing, setSelectedGlazing] = useState(glazingOptions[0]);

  return (
    <div className="bg-[#FCFBFA] rounded-3xl p-6 md:p-10 border border-accent/25 shadow-2xl relative overflow-hidden text-heading mt-16 max-w-5xl mx-auto">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,168,106,0.08),transparent_50%)] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        
        {/* Left Side: Visual Canvas */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#FAF9F5] rounded-2xl border border-accent/20 p-6 relative min-h-[350px] md:min-h-[420px]">
          <div>
            <span className="text-accent text-[9px] font-heading font-bold uppercase tracking-widest block mb-1">Live Architectural Rendering</span>
            <h4 className="text-lg font-heading font-bold tracking-tight text-heading">{selectedProfile.name} Specs</h4>
          </div>

          {/* Interactive Profile SVG Rendering */}
          <div className="flex-grow flex items-center justify-center my-6">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 border border-accent/20 rounded-xl flex items-center justify-center bg-white overflow-hidden luxury-ticks cad-grid-light">
              
              {/* Dynamic Dimension Indicators */}
              <div className="absolute top-1.5 left-4 right-4 flex items-center justify-between text-[7px] text-accent font-heading font-bold uppercase tracking-widest pointer-events-none z-20">
                <span>w: 2400mm</span>
                <span className="h-[0.75px] bg-accent/30 flex-grow mx-2" />
                <span>tol: ±0.5mm</span>
              </div>
              <div className="absolute left-1.5 top-4 bottom-4 flex flex-col justify-between text-[7px] text-accent font-heading font-bold uppercase tracking-widest pointer-events-none z-20" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                <span>h: 2100mm</span>
                <span className="w-[0.75px] bg-accent/30 flex-grow my-2" />
                <span>scale: 1:15</span>
              </div>

              {/* Outer Window Frame (Dynamic color based on finish) */}
              <motion.div 
                className="absolute inset-5 border-[10px] rounded-lg shadow-xl"
                style={{ borderColor: frameColor.hex }}
                animate={{ borderColor: frameColor.hex }}
                transition={{ duration: 0.4 }}
              >
                {/* Outer Glazing Sheet */}
                <motion.div 
                  className="w-full h-full relative transition-colors duration-500 flex items-center justify-center"
                  style={{ backgroundColor: selectedGlazing.tint }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform translate-x-[-20%] rotate-12" />

                  {/* Profile Specific Details */}
                  {selectedProfile.id === "sliding" && (
                    <div className="absolute inset-y-0 left-1/2 w-1.5 bg-white/40 flex items-center justify-center">
                      <div className="w-[1px] h-full bg-white/60" />
                      <span className="absolute text-[8px] bg-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wider font-bold -translate-y-4">Slide</span>
                    </div>
                  )}

                  {selectedProfile.id === "casement" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="50" x2="100" y2="0" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="50" x2="100" y2="100" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
                    </svg>
                  )}

                  {selectedProfile.id === "pivot" && (
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/40">
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] text-accent animate-pulse">⟲</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
            </div>
          </div>

          {/* Performance Meters */}
          <div className="grid grid-cols-3 gap-3 border-t border-accent/15 pt-4 bg-white p-3.5 rounded-xl border border-accent/10 shadow-sm">
            <div className="text-center">
              <span className="text-[8px] text-body/75 uppercase tracking-wider block font-semibold">Sound Barrier</span>
              <div className="flex items-center justify-center text-xs font-bold text-accent mt-0.5">
                <VolumeX className="w-3.5 h-3.5 mr-1" />
                <span>{selectedGlazing.acoustic}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-[8px] text-body/75 uppercase tracking-wider block font-semibold">Thermal Rating</span>
              <div className="flex items-center justify-center text-xs font-bold text-accent mt-0.5">
                <Thermometer className="w-3.5 h-3.5 mr-1" />
                <span>{selectedGlazing.thermal}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-[8px] text-body/75 uppercase tracking-wider block font-semibold">Wind Load Limit</span>
              <div className="flex items-center justify-center text-xs font-bold text-accent mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span className="truncate">{selectedProfile.wind}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Options Selector */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-accent text-xs font-heading font-bold uppercase tracking-widest">Architectural Configurator</span>
              <h3 className="text-2xl font-heading font-bold tracking-tight text-heading mt-1">Select Custom Parameters</h3>
              <p className="text-body/80 text-xs font-light leading-relaxed mt-1">Adjust system specifications below to review design options and performance output.</p>
            </div>

            {/* 1. Profile Style */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-body/80">1. System Profile</label>
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {profiles.map((p) => {
                  const isSel = selectedProfile.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProfile(p)}
                      className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-center text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                        isSel ? "bg-accent text-white border-accent shadow-md shadow-accent/15" : "bg-white text-body hover:text-heading border border-accent/15 hover:border-accent shadow-sm"
                      }`}
                    >
                      {p.name.split(" ")[1] || p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Color Finish */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-body/80">2. Frame Finish Color</label>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {finishes.map((f) => {
                  const isSel = frameColor.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFrameColor(f)}
                      className={`flex items-center space-x-1.5 px-2 py-1.5 sm:space-x-2 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer border ${
                        isSel ? "border-accent bg-accent-light/30 text-heading font-bold" : "border-accent/15 bg-white text-body hover:text-heading shadow-sm"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20 block" style={{ backgroundColor: f.hex }} />
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Glazing Specification */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-body/80">3. Glazing Layer Insulation</label>
              <div className="space-y-2">
                {glazingOptions.map((g) => {
                  const isSel = selectedGlazing.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGlazing(g)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-left transition-all duration-300 border cursor-pointer ${
                        isSel ? "bg-accent-light/20 border-accent text-heading font-bold" : "bg-white border-accent/15 text-body hover:text-heading hover:border-accent shadow-sm"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block">{g.name}</span>
                        <span className="text-[10px] text-body/70 font-light block mt-0.5">{g.desc}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-accent block">{g.acoustic}</span>
                        <span className="text-[9px] text-body/70 font-light block">{g.thermal}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-accent/20 flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex items-center space-x-2 text-[10px] text-body/75">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span>Selections pre-fill the quote request sheet.</span>
            </div>
            <Button
              href={`/request-quote?service=${encodeURIComponent(`${selectedProfile.name} (${frameColor.name}, ${selectedGlazing.name})`)}`}
              variant="accent"
              size="md"
              className="w-full sm:w-auto ml-auto shadow-lg shadow-accent/25"
            >
              Get Custom Quote
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
