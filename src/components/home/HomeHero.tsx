"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Home hero — one photograph, a title, and the numbers.
 *
 * Design intent
 * - A single full-bleed image with a neutral charcoal grade. No colour
 *   cast: the veil is near-black so the photograph keeps its own light.
 * - Copy is centred and short: a tracked eyebrow, a two-line serif title,
 *   one sub-line and one call to action.
 * - The four company stats sit in a hairline-ruled strip along the bottom
 *   and count up once the strip fades in.
 *
 * Swapping the image: change HERO_IMAGE. A 16:9 (or wider) photograph of
 * at least 2560 px works best; keep the darker, calmer part of the scene
 * in the lower third so the title and stats always have contrast.
 */

const HERO_IMAGE = {
  src: "/villa_modern_glazing.png",
  alt: "Two-storey villa at dusk with floor-to-ceiling slim aluminium glazing",
  /** The current source is square, so this keeps the house in frame. */
  position: "center 30%",
};

const INK = "#0C0F12";
const ease = [0.16, 1, 0.3, 1] as const;

// Fine film grain, tiled. Keeps the large gradient from banding.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const TITLE_LINES = [
  { text: "Designed around", italic: false },
  { text: "the view.", italic: true },
];

const STATS = [
  { value: 650, suffix: "+", label: "Projects delivered" },
  { value: 30, suffix: "+", label: "Years of expertise" },
  { value: 42, suffix: "+", label: "Cities served" },
  { value: 96, suffix: "%", label: "Referral-led work" },
];

function CountUp({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, delay, reduceMotion]);

  // Server-rendered with the final value so the number is never missing.
  return <span ref={ref}>{value}</span>;
}

export default function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white"
      style={{ backgroundColor: INK }}
      aria-label="Introduction"
    >
      {/* ---------- Photograph ---------- */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Image
            src={HERO_IMAGE.src}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: HERO_IMAGE.position }}
          />
        </motion.div>

        {/* Neutral grade: a light wash, a top band that seats the header,
            a deep bottom band for the title and stats, and a soft vignette. */}
        <div className="absolute inset-0" style={{ backgroundColor: `${INK}3D` }} />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${INK}A6 0%, transparent 22%, transparent 32%, ${INK}CC 60%, ${INK}F7 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% 40%, transparent 40%, ${INK}A6 100%)`,
          }}
        />
        {/* Phones crop the square photograph tall, so the lit glazing sits
            right behind the title. This extra band only exists below lg. */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(180deg, transparent 18%, ${INK}B3 42%, ${INK}F2 70%, ${INK} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      {/* ---------- Copy: centred ---------- */}
      <div className="container relative mx-auto flex flex-1 flex-col items-center justify-end px-5 pb-8 pt-40 text-center sm:px-8 md:pb-12 md:pt-44">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="flex items-center gap-4 font-heading text-[10px] font-semibold uppercase tracking-[0.26em] text-accent-bright sm:text-[11px] sm:tracking-[0.36em]"
        >
          <span className="h-px w-8 bg-accent-bright/70 sm:w-12" aria-hidden="true" />
          Aluminium Windows &middot; Doors &middot; Facades
          <span className="h-px w-8 bg-accent-bright/70 sm:w-12" aria-hidden="true" />
        </motion.p>

        <h1 className="mt-7 font-display text-[3rem] leading-[0.96] text-white sm:text-[4.5rem] md:text-[5.75rem] lg:text-[6.75rem] xl:text-[7.5rem]">
          {TITLE_LINES.map((line, i) => (
            <span
              key={line.text}
              className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
            >
              <motion.span
                className={`block ${
                  line.italic ? "font-normal italic text-accent-bright" : ""
                }`}
                initial={reduceMotion ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.15, ease, delay: 0.35 + i * 0.14 }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-7 max-w-xl text-[15px] font-light leading-relaxed text-white/70 md:text-base"
        >
          Slimline aluminium systems, engineered and installed in Ahmedabad.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <Link
            href="/request-quote"
            className="group inline-flex items-center gap-4 rounded-full border border-white/25 bg-white/[0.06] py-2 pl-6 pr-2 font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-500 hover:border-accent-bright/70 hover:bg-accent-bright hover:text-primary"
          >
            Request a Quote
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/projects"
            className="luxury-underline font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors duration-300 hover:text-white"
          >
            View Projects
          </Link>
        </motion.div>
      </div>

      {/* ---------- Stats strip ---------- */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 1.05 }}
        className="container relative mx-auto px-5 pb-20 sm:px-8 md:pb-10"
      >
        <dl className="mx-auto grid max-w-5xl grid-cols-2 border-t border-white/[0.14] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center px-4 pt-6 text-center md:pt-8 ${
                i % 2 === 1 ? "border-l border-white/[0.12]" : ""
              } ${i >= 2 ? "mt-2 lg:mt-0 lg:border-l lg:border-white/[0.12]" : ""}`}
            >
              <dd className="font-display text-[2.75rem] font-medium leading-none tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
                <CountUp value={s.value} delay={1.15 + i * 0.12} />
                <span className="text-accent-bright">{s.suffix}</span>
              </dd>
              <dt className="mt-3 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 md:text-[11px] md:tracking-[0.24em]">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
