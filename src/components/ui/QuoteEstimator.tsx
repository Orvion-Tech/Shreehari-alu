"use client";

import { useState } from "react";
import { ChevronRight, ArrowRight, RefreshCw, Calculator, Ruler, Eye } from "lucide-react";
import Button from "./Button";

interface QuoteEstimatorProps {
  onEstimateComplete: (data: { product: string; quantity: string; notes: string }) => void;
}

export default function QuoteEstimator({ onEstimateComplete }: QuoteEstimatorProps) {
  const [step, setStep] = useState(1);
  const [systemType, setSystemType] = useState("Windows");
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(7);
  const [glazing, setGlazing] = useState("DGU");
  const [finish, setFinish] = useState("Gold");

  const totalSqFt = width * height;

  const getGlassThickness = () => {
    if (glazing === "Single") return "6mm Toughened";
    if (glazing === "DGU") return "24mm (6mm + 12 Air + 6mm) Double Glazed";
    return "12.89mm (6mm + 0.89 PVB + 6mm) Acoustic Laminated";
  };

  const getWindLoad = () => {
    if (totalSqFt > 80) return "High Wind-Pressure (Requires Heavy Reinforcement Profiles)";
    if (totalSqFt > 40) return "Standard Wind-Pressure (Medium Reinforcement Profiles)";
    return "Low Wind-Pressure (Lightweight Profiles)";
  };

  const getRecommendedProfile = () => {
    if (systemType === "Windows") return "Series 45 Casement / Series 70 Sliding";
    if (systemType === "Doors") return "Series 55 Heavy Duty Hinged / Slimline Slider";
    if (systemType === "Facades") return "Stick Curtain Wall System (50mm Sightline)";
    return "Motorized Louvered Pergola with Integrated Gutters";
  };

  const handleApplyEstimate = () => {
    onEstimateComplete({
      product: systemType,
      quantity: `${totalSqFt} sq ft (${width}ft x ${height}ft, 1 opening)`,
      notes: `Interactive Estimate Specs:\n- System: ${systemType}\n- Dimensions: ${width}ft x ${height}ft\n- Glazing: ${glazing} (${getGlassThickness()})\n- Finish: ${finish}\n- Recommended Profile: ${getRecommendedProfile()}\n- Wind Load: ${getWindLoad()}`
    });

    const targetElement = document.getElementById("quote-name");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-[#FCFBFA] rounded-3xl p-6 md:p-8 border border-accent/25 shadow-2xl text-heading mb-10 relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />

      {/* Step Tracker Header */}
      <div className="flex items-center justify-between border-b border-accent/15 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-accent" />
          <h3 className="text-base font-heading font-bold text-heading uppercase tracking-wider">Specs Estimator</h3>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 text-[8px] sm:text-[10px] uppercase font-heading font-bold tracking-wider sm:tracking-widest text-body/75">
          <span className={step === 1 ? "text-accent font-bold" : ""}>01 Type</span>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className={step === 2 ? "text-accent font-bold" : ""}>02 Size</span>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className={step === 3 ? "text-accent font-bold" : ""}>03 Glaze</span>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className={step === 4 ? "text-accent font-bold" : ""}>04 Output</span>
        </div>
      </div>

      {/* Step 1: System Type */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in-up">
          <div>
            <h4 className="text-sm font-heading font-bold text-heading">Select Opening System Category</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">Which architectural category does this opening represent?</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Windows", "Doors", "Facade / Structural glazing", "Skylight / Pergola"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setSystemType(t === "Facade / Structural glazing" ? "Facade / Structural glazing" : t === "Skylight / Pergola" ? "Skylight / Pergola" : t);
                  setStep(2);
                }}
                className={`p-4 rounded-xl text-center text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  systemType === t 
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/15" 
                    : "bg-white border-accent/15 text-body hover:text-heading hover:border-accent shadow-sm"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Dimensions */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in-up">
          <div>
            <h4 className="text-sm font-heading font-bold text-heading">Specify Opening Dimensions</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">Adjust the sliders to input estimated dimensions.</p>
          </div>
          
          <div className="space-y-4 bg-[#FAF9F5] p-5 rounded-2xl border border-accent/15 relative overflow-hidden luxury-ticks">
            <div className="absolute inset-0 cad-grid-light opacity-50 pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-body/80 flex items-center"><Ruler className="w-3.5 h-3.5 mr-1" /> Width</span>
                <span className="text-accent font-bold">{width} ft</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full accent-accent h-1 bg-[#FCFBFA] rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1 relative z-10">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-body/80 flex items-center"><Ruler className="w-3.5 h-3.5 mr-1" /> Height</span>
                <span className="text-accent font-bold">{height} ft</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full accent-accent h-1 bg-[#FCFBFA] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-accent/10 flex justify-between items-center text-xs shadow-sm font-medium">
            <span className="text-body/80">Total Surface Area:</span>
            <span className="font-bold text-heading">{totalSqFt} sq ft</span>
          </div>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="text-xs text-body/60 hover:text-heading uppercase tracking-wider font-semibold cursor-pointer">Back</button>
            <button type="button" onClick={() => setStep(3)} className="px-5 py-2 bg-accent hover:bg-[#b59556] text-white rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer">Continue</button>
          </div>
        </div>
      )}

      {/* Step 3: Glazing & Finish */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in-up">
          <div>
            <h4 className="text-sm font-heading font-bold text-heading">Insulation & Aesthetic Specs</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">Select performance glazing layers and target profiles finish.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "Single", label: "Single" },
              { id: "DGU", label: "DGU Cavity" },
              { id: "Acoustic", label: "Laminated" }
            ].map((gl) => (
              <button
                key={gl.id}
                type="button"
                onClick={() => setGlazing(gl.id)}
                className={`p-2.5 rounded-lg text-center text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  glazing === gl.id 
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/15" 
                    : "bg-white border-accent/15 text-body hover:text-heading hover:border-accent shadow-sm"
                }`}
              >
                {gl.label}
              </button>
            ))}
          </div>

          <div className="h-[1px] bg-accent/15 my-2"></div>

          <div className="flex gap-2">
            {["Gold", "Obsidian Black", "Bronze", "White"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFinish(c)}
                className={`flex-grow p-2 rounded-lg text-center text-[10px] font-heading font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  finish === c 
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/15" 
                    : "bg-white border-accent/15 text-body hover:text-heading hover:border-accent shadow-sm"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(2)} className="text-xs text-body/60 hover:text-heading uppercase tracking-wider font-semibold cursor-pointer">Back</button>
            <button type="button" onClick={() => setStep(4)} className="px-5 py-2 bg-accent hover:bg-[#b59556] text-white rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer">Estimate Specs</button>
          </div>
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 4 && (
        <div className="space-y-4 animate-fade-in-up">
          <div>
            <h4 className="text-sm font-heading font-bold text-accent flex items-center"><Eye className="w-4 h-4 mr-1.5" /> Technical Estimate Report</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">Calculated engineering values for this opening size:</p>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-accent/10 space-y-2 text-xs shadow-sm">
            <div className="flex justify-between">
              <span className="text-body/75">Total Size:</span>
              <span className="font-bold text-heading">{totalSqFt} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body/75">Recommended Glass:</span>
              <span className="font-bold text-heading text-right">{getGlassThickness()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body/75">Recommended Profile:</span>
              <span className="font-bold text-heading text-right">{getRecommendedProfile()}</span>
            </div>
            <div className="flex justify-between border-t border-accent/10 pt-2">
              <span className="text-body/75">Wind Load Criteria:</span>
              <span className="font-semibold text-accent text-right">{getWindLoad()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-body/60 hover:text-heading uppercase tracking-wider font-semibold flex items-center justify-center cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reset Calculator
            </button>
            
            <button
              type="button"
              onClick={handleApplyEstimate}
              className="w-full sm:w-auto sm:ml-auto px-5 py-2.5 bg-accent hover:bg-[#b59556] text-white rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer shadow-lg shadow-accent/25"
            >
              Apply to Inquiry Form <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
