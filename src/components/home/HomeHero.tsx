"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Home hero — one photograph and a title; the numbers arrive on scroll.
 *
 * Design intent
 * - The first screen is only the photograph and the centred copy: a
 *   tracked eyebrow, a two-line serif title, one sub-line and one call to
 *   action. Nothing else competes for the eye.
 * - The four company stats live in a charcoal band directly below the
 *   fold. They fade up and count when the visitor scrolls to them, so the
 *   opening screen stays quiet and the numbers get their own moment.
 * - The veil is a neutral charcoal, never the brand teal, so the image
 *   keeps its own light.
 *
 * Swapping the image: change HERO_IMAGE. A 16:9 (or wider) photograph of
 * at least 2560 px works best; keep the calmer part of the scene behind
 * the centre so the title always has contrast.
 */

const HERO_IMAGE = {
  src: "/villa_modern_glazing.png",
  alt: "Two-storey villa at dusk with floor-to-ceiling slim aluminium glazing",
  /** The current source is square, so this keeps the house in frame. */
  position: "center 34%",
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

function CountUp({
  value,
  delay,
  start,
}: {
  value: number;
  delay: number;
  start: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !start || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, delay, start, reduceMotion]);

  // Server-rendered with the final value so the number is never missing.
  return <span ref={ref}>{value}</span>;
}

export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLDListElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <>
      {/* ================= First screen: photograph + copy ================= */}
      <section
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white"
        style={{ backgroundColor: INK }}
        aria-label="Introduction"
      >
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
              a bottom band, a soft edge vignette, and a pool of shade behind
              the centred copy so the title reads over lit glazing. */}
          <div className="absolute inset-0" style={{ backgroundColor: `${INK}3D` }} />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${INK}A6 0%, transparent 24%, transparent 62%, ${INK}E6 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 50% 45%, transparent 42%, ${INK}A6 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(60% 46% at 50% 56%, ${INK}B8 0%, ${INK}73 45%, transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
            style={{ backgroundImage: GRAIN }}
          />
        </div>

        {/* ---------- Copy: centred, biased a little below the middle ---------- */}
        <div className="container relative mx-auto flex flex-1 flex-col items-center justify-center px-5 pb-24 pt-36 text-center sm:px-8 md:pb-28 md:pt-40">
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

        {/* ---------- Scroll cue ---------- */}
        <motion.a
          href="#hero-stats"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="group absolute inset-x-0 bottom-7 mx-auto flex w-max flex-col items-center gap-3 font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white md:bottom-9"
        >
          Scroll
          <span className="relative block h-12 w-px overflow-hidden bg-white/15" aria-hidden="true">
            {!reduceMotion && (
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-accent-bright"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
              />
            )}
          </span>
        </motion.a>
      </section>

      {/* ================= Below the fold: the numbers ================= */}
      <section
        id="hero-stats"
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: INK }}
        aria-label="Company at a glance"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN }}
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-5 py-12 sm:px-8 md:py-16">
          <dl
            ref={statsRef}
            className="mx-auto grid max-w-5xl grid-cols-2 border-t border-white/[0.14] lg:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={statsInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
                className={`flex flex-col items-center px-4 pt-7 text-center md:pt-9 ${
                  i % 2 === 1 ? "border-l border-white/[0.12]" : ""
                } ${i >= 2 ? "mt-4 lg:mt-0 lg:border-l lg:border-white/[0.12]" : ""}`}
              >
                <dd className="font-display text-[2.75rem] font-medium leading-none tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
                  <CountUp value={s.value} delay={0.2 + i * 0.12} start={statsInView} />
                  <span className="text-accent-bright">{s.suffix}</span>
                </dd>
                <dt className="mt-3 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 md:text-[11px] md:tracking-[0.24em]">
                  {s.label}
                </dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
