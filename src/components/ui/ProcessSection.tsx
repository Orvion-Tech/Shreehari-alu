"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Compass,
  Layers,
  Cpu,
  Wrench,
  Award,
  Phone,
} from "lucide-react";

const steps = [
  { num: "01", title: "Consultation & Survey", desc: "On-site survey with precise measurements.", icon: MessageSquare },
  { num: "02", title: "Design & Engineering", desc: "Drawings and wind-load calculations.", icon: Compass },
  { num: "03", title: "Material Selection", desc: "Premium profiles, glass and seals.", icon: Layers },
  { num: "04", title: "Fabrication & QC", desc: "Precision cutting and testing.", icon: Cpu },
  { num: "05", title: "Installation", desc: "Structural fixing and sealing.", icon: Wrench },
  { num: "06", title: "Project Handover", desc: "Cleaning, keys and warranties.", icon: Award },
  { num: "07", title: "After-Sales Support", desc: "Annual checks and support.", icon: Phone },
];

const N = steps.length;
const VBW = 100;
const TOP = 46;
const GAP = 118;
const VBH = TOP * 2 + GAP * (N - 1); // 812

const NODES = steps.map((s, i) => ({
  x: i % 2 === 0 ? 32 : 68,
  y: TOP + i * GAP,
}));

const PATH_D = (() => {
  let d = `M ${NODES[0].x} ${NODES[0].y}`;
  for (let i = 1; i < N; i++) {
    const a = NODES[i - 1];
    const b = NODES[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  return d;
})();

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refRef = useRef<SVGPathElement | null>(null);
  const goldRef = useRef<SVGPathElement | null>(null);
  const beadRef = useRef<HTMLDivElement | null>(null);
  const mFillRef = useRef<HTMLDivElement | null>(null);
  const mBeadRef = useRef<HTMLDivElement | null>(null);

  const curRef = useRef(0);
  const lenRef = useRef(0);
  const activeRef = useRef(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = containerRef.current;
      const ref = refRef.current;
      const gold = goldRef.current;
      if (el && ref && gold) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // Progress tracks how far you have scrolled THROUGH the section itself:
        // 0 when the band top reaches the anchor line, 1 once you've scrolled its full height.
        const anchor = vh * 0.72;
        const target = clamp01((anchor - rect.top) / (rect.height || 1));

        // light eased follow — tracks scroll closely, smooths micro-jitter
        curRef.current += (target - curRef.current) * 0.16;
        if (Math.abs(target - curRef.current) < 0.0006) curRef.current = target;
        const cur = curRef.current;

        if (!lenRef.current) lenRef.current = ref.getTotalLength();
        const L = lenRef.current;
        const end = L * cur;

        // Draw ONE gold line: an actual growing path from the start up to the orb.
        const SAMPLES = 90;
        let d = "";
        for (let k = 0; k <= SAMPLES; k++) {
          const p = ref.getPointAtLength((end * k) / SAMPLES);
          d += (k === 0 ? "M" : "L") + p.x.toFixed(2) + " " + p.y.toFixed(2) + " ";
        }
        gold.setAttribute("d", d);

        // orb sits exactly at the leading tip
        const pe = ref.getPointAtLength(end);
        if (beadRef.current) {
          beadRef.current.style.left = `${(pe.x / VBW) * 100}%`;
          beadRef.current.style.top = `${(pe.y / VBH) * 100}%`;
        }
        if (mFillRef.current) mFillRef.current.style.height = `${cur * 100}%`;
        if (mBeadRef.current) mBeadRef.current.style.top = `${cur * 100}%`;

        let count = 0;
        for (let i = 0; i < N; i++) if (cur >= i / (N - 1) - 0.001) count++;
        if (count !== activeRef.current) {
          activeRef.current = count;
          setActiveCount(count);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef}>
      {/* ===================== DESKTOP / TABLET: vertical wavy weld ===================== */}
      <div className="hidden md:block relative mx-auto max-w-4xl h-[800px]">
        <svg
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="weldGradV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a9762f" />
              <stop offset="55%" stopColor="#C28B45" />
              <stop offset="100%" stopColor="#ffd591" />
            </linearGradient>
            <filter id="weldGlowV" x="-60%" y="-10%" width="220%" height="120%">
              <feGaussianBlur stdDeviation="4.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grey guide path (also used for sampling) — sits behind the gold seam */}
          <path
            ref={refRef}
            d={PATH_D}
            fill="none"
            stroke="rgba(27,28,27,0.13)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* the single visible gold seam — its shape grows to the orb each frame */}
          <path
            ref={goldRef}
            d={`M ${NODES[0].x} ${NODES[0].y}`}
            fill="none"
            stroke="url(#weldGradV)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#weldGlowV)"
          />
        </svg>

        {/* glowing weld bead */}
        <div
          ref={beadRef}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{ left: `${(NODES[0].x / VBW) * 100}%`, top: `${(NODES[0].y / VBH) * 100}%` }}
        >
          <span className="block w-3.5 h-3.5 rounded-full bg-[#ffcf87] ring-2 ring-accent shadow-[0_0_20px_7px_rgba(194,139,76,0.6)] animate-pulse" />
        </div>

        {/* nodes + labels */}
        {NODES.map((n, i) => {
          const s = steps[i];
          const Icon = s.icon;
          const lit = i < activeCount;
          const leftSide = n.x < 50;
          return (
            <div
              key={s.num}
              className="absolute z-10"
              style={{ left: `${(n.x / VBW) * 100}%`, top: `${(n.y / VBH) * 100}%`, width: 0, height: 0 }}
            >
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  lit
                    ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(194,139,76,0.55)]"
                    : "bg-primary border-white/25 text-white/70"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-heading font-bold flex items-center justify-center border-2 border-primary transition-colors duration-500 ${
                    lit ? "bg-white text-primary" : "bg-white/20 text-white/80"
                  }`}
                >
                  {s.num}
                </span>
              </div>

              <div
                className={`absolute top-1/2 -translate-y-1/2 w-[210px] ${
                  leftSide ? "right-[44px] text-right" : "left-[44px] text-left"
                }`}
              >
                <h4
                  className={`text-base font-heading font-bold tracking-tight transition-colors duration-500 ${
                    lit ? "text-heading" : "text-body/50"
                  }`}
                >
                  {s.title}
                </h4>
                <p className="text-xs leading-relaxed text-body/60 mt-1">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================== MOBILE: vertical weld list ===================== */}
      <div className="md:hidden relative max-w-md mx-auto">
        <div className="absolute left-7 top-6 bottom-6 w-[3px] -translate-x-1/2 rounded-full bg-black/10">
          <div
            ref={mFillRef}
            className="absolute left-0 right-0 top-0 rounded-full"
            style={{ height: "0%", background: "linear-gradient(180deg,#a9762f,#C28B45,#ffd591)" }}
          />
          <div
            ref={mBeadRef}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: "0%" }}
          >
            <span className="block w-3 h-3 rounded-full bg-[#ffcf87] ring-2 ring-accent shadow-[0_0_16px_6px_rgba(194,139,76,0.55)] animate-pulse" />
          </div>
        </div>

        <ol className="space-y-7">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const lit = i < activeCount;
            return (
              <li key={s.num} className="flex gap-5 items-center">
                <div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    lit
                      ? "bg-accent border-accent text-white shadow-[0_0_16px_rgba(194,139,76,0.5)]"
                      : "bg-primary border-white/25 text-white/70"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-heading font-bold flex items-center justify-center border-2 border-primary ${
                      lit ? "bg-white text-primary" : "bg-white/20 text-white/80"
                    }`}
                  >
                    {s.num}
                  </span>
                </div>
                <div>
                  <h4
                    className={`text-base font-heading font-bold tracking-tight transition-colors duration-500 ${
                      lit ? "text-heading" : "text-body/55"
                    }`}
                  >
                    {s.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-body/60">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
