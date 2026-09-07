"use client";

import { useState } from "react";
import { ChevronRight, ArrowRight, RefreshCw, Calculator, Ruler, Eye } from "lucide-react";
import { SERVICE_CATEGORIES, getServiceCategory } from "@/data/services";

interface QuoteEstimatorProps {
  onEstimateComplete: (data: { product: string; quantity: string; notes: string }) => void;
}

const GLAZING_OPTIONS = [
  { id: "Single", label: "Single", detail: "6mm toughened, single pane" },
  { id: "DGU", label: "DGU Cavity", detail: "Double glazed unit with an insulating air cavity" },
  { id: "Acoustic", label: "Laminated", detail: "Laminated build-up with an acoustic interlayer" },
];

const FINISH_OPTIONS = ["Gold", "Obsidian Black", "Bronze", "White"];

export default function QuoteEstimator({ onEstimateComplete }: QuoteEstimatorProps) {
  const [step, setStep] = useState(1);
  const [categorySlug, setCategorySlug] = useState(SERVICE_CATEGORIES[0].slug);
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(7);
  const [glazing, setGlazing] = useState("DGU");
  const [finish, setFinish] = useState("Gold");

  const category = getServiceCategory(categorySlug) ?? SERVICE_CATEGORIES[0];
  const totalSqFt = width * height;

  const glazingDetail = GLAZING_OPTIONS.find((g) => g.id === glazing)?.detail ?? "";

  /** Systems from the chosen category — real catalogue entries, not guesses. */
  const suggestedSystems = category.systems.slice(0, 3).map((s) => s.title);

  const getExposureNote = () => {
    if (totalSqFt > 80) return "Large span — expect reinforced sections and a wind-load review";
    if (totalSqFt > 40) return "Medium span — standard reinforcement is normally sufficient";
    return "Small span — lightweight sections are normally sufficient";
  };

  const handleApplyEstimate = () => {
    const lines = [
      `Interactive estimate:`,
      `- Category: ${category.label}`,
      `- Approx. dimensions: ${width}ft x ${height}ft (${totalSqFt} sq ft)`,
      ...(category.usesGlazing ? [`- Glazing: ${glazing} — ${glazingDetail}`] : []),
      `- Finish: ${finish}`,
      `- Systems of interest: ${suggestedSystems.join(", ")}`,
      `- Note: ${getExposureNote()}`,
    ];

    onEstimateComplete({
      product: category.label,
      quantity: `${totalSqFt} sq ft (${width}ft x ${height}ft, 1 opening)`,
      notes: lines.join("\n"),
    });

    const targetElement = document.getElementById("quote-name");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-[#FCFBFA] rounded-2xl p-6 md:p-8 border border-accent/25 shadow-2xl text-heading mb-10 relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />

      {/* Step Tracker Header */}
      <div className="flex items-center justify-between border-b border-accent/15 pb-4 mb-6 relative z-10">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-accent" />
          <h3 className="text-base font-heading font-bold text-heading uppercase tracking-wider">Specs Estimator</h3>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 text-[11px] sm:text-[12px] uppercase font-heading font-bold tracking-wider sm:tracking-widest text-body/75">
          <span className={step === 1 ? "text-accent font-bold" : ""}>01 Category</span>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className={step === 2 ? "text-accent font-bold" : ""}>02 Size</span>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className={step === 3 ? "text-accent font-bold" : ""}>03 Spec</span>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className={step === 4 ? "text-accent font-bold" : ""}>04 Output</span>
        </div>
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in-up relative z-10">
          <div>
            <h4 className="text-sm font-heading font-bold text-heading">Select System Category</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">Which of our six divisions does this requirement fall under?</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = categorySlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setCategorySlug(cat.slug);
                    setStep(2);
                  }}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-300 border cursor-pointer flex items-start gap-3 ${
                    isActive
                      ? "bg-accent text-white border-accent shadow-md shadow-accent/15"
                      : "bg-white border-accent/15 text-body hover:text-heading hover:border-accent shadow-sm"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-white/15" : "bg-accent/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-accent"}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-wider leading-snug">
                      {cat.label}
                    </span>
                    <span className={`block text-[12px] font-light leading-snug mt-0.5 ${isActive ? "text-white/75" : "text-body/70"}`}>
                      {cat.systems.length} system{cat.systems.length > 1 ? "s" : ""}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Dimensions */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in-up relative z-10">
          <div>
            <h4 className="text-sm font-heading font-bold text-heading">Approximate Dimensions</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">
              {category.label} · adjust the sliders to the size you have in mind.
            </p>
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
                aria-label="Width in feet"
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
                aria-label="Height in feet"
              />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-accent/10 flex justify-between items-center text-xs shadow-sm font-medium">
            <span className="text-body/80">Total Surface Area:</span>
            <span className="font-bold text-heading">{totalSqFt} sq ft</span>
          </div>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="text-xs text-body/60 hover:text-heading uppercase tracking-wider font-semibold cursor-pointer">Back</button>
            <button type="button" onClick={() => setStep(3)} className="px-5 py-2 bg-accent hover:bg-[#b59556] text-white rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer">Continue</button>
          </div>
        </div>
      )}

      {/* Step 3: Glazing (where relevant) & Finish */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in-up relative z-10">
          <div>
            <h4 className="text-sm font-heading font-bold text-heading">
              {category.usesGlazing ? "Glazing & Finish" : "Finish"}
            </h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">
              {category.usesGlazing
                ? "Select the glass build-up and the target profile finish."
                : `${category.label} is not specified by glass build-up — choose the target finish.`}
            </p>
          </div>

          {category.usesGlazing && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {GLAZING_OPTIONS.map((gl) => (
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
              <p className="text-[12px] text-body/60 font-light">{glazingDetail}</p>
              <div className="h-[1px] bg-accent/15 my-2"></div>
            </>
          )}

          <div className="flex flex-wrap gap-2">
            {FINISH_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFinish(c)}
                className={`flex-grow p-2 rounded-lg text-center text-[12px] font-heading font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
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
            <button type="button" onClick={() => setStep(4)} className="px-5 py-2 bg-accent hover:bg-[#b59556] text-white rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer">See Summary</button>
          </div>
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 4 && (
        <div className="space-y-4 animate-fade-in-up relative z-10">
          <div>
            <h4 className="text-sm font-heading font-bold text-accent flex items-center"><Eye className="w-4 h-4 mr-1.5" /> Your Requirement Summary</h4>
            <p className="text-[11px] text-body/70 font-light mt-0.5">Indicative only — our team confirms every specification against your drawings.</p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-accent/10 space-y-2 text-xs shadow-sm">
            <div className="flex justify-between gap-4">
              <span className="text-body/75">Category:</span>
              <span className="font-bold text-heading text-right">{category.label}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-body/75">Total Size:</span>
              <span className="font-bold text-heading text-right">{totalSqFt} sq ft ({width}ft &times; {height}ft)</span>
            </div>
            {category.usesGlazing && (
              <div className="flex justify-between gap-4">
                <span className="text-body/75">Glazing:</span>
                <span className="font-bold text-heading text-right">{glazingDetail}</span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span className="text-body/75">Finish:</span>
              <span className="font-bold text-heading text-right">{finish}</span>
            </div>
            <div className="border-t border-accent/10 pt-2 space-y-1">
              <span className="text-body/75 block">Systems in this category:</span>
              <span className="font-semibold text-heading block text-right">{suggestedSystems.join(" · ")}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-accent/10 pt-2">
              <span className="text-body/75">Span guidance:</span>
              <span className="font-semibold text-accent text-right">{getExposureNote()}</span>
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
