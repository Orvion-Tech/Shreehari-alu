"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProcessSection from "@/components/ui/ProcessSection";
import { SERVICE_CATEGORIES, TOTAL_SYSTEMS, serviceHref } from "@/data/services";


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
    <>
      {/* ===================== PAGE HERO (light band) ===================== */}
      <section className="bg-section pt-28 pb-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="breadcrumbs text-xs text-body mb-5 flex items-center gap-2 font-heading uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-accent" />
            <span className="text-heading">Services</span>
          </div>

          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block mb-3">
            System Catalog
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-5 leading-tight max-w-4xl">
            Precision Crafted Aluminium Systems.
          </h1>

          <p className="text-base md:text-lg text-body max-w-2xl leading-relaxed font-light mb-8">
            Six divisions covering the complete building envelope — windows and doors, glazing systems, glass and roof solutions, louvers and sun control, cladding and facade panels, and balustrades and railings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/request-quote" variant="primary" className="hover:scale-105 transition-transform duration-300">
              Request Project Quote
            </Button>
            <button
              onClick={() => document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary/25 text-primary text-sm font-semibold hover:bg-primary/5 transition-all cursor-pointer"
            >
              Explore Systems <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================== STAT COUNTERS ===================== */}
      <Section background="main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: TOTAL_SYSTEMS, suffix: "", label: "Systems Offered" },
            { value: SERVICE_CATEGORIES.length, suffix: "", label: "Product Categories" },
            { value: 650, suffix: "+", label: "Projects Delivered" },
            { value: 30, suffix: "+", label: "Years Expertise" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center border border-border shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1.5">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-[12px] md:text-[11px] font-heading font-semibold uppercase tracking-widest text-body">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===================== DIVISION CATALOGUE (light premium cards) ===================== */}
      <Section id="services-grid" background="section" className="scroll-mt-28">
        <div className="max-w-2xl space-y-3 mb-10 md:mb-14">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">
            Our Divisions
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">
            Six capabilities, one standard of craft.
          </h2>
          <p className="text-body text-sm md:text-base leading-relaxed font-light">
            Explore each division to see the full range of engineered systems, finishes and applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const systems = cat.systems;
            const divisionImage = cat.heroImage;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                id={cat.id}
                className="scroll-mt-28 bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col"
              >
                <div className="relative h-56 md:h-64 w-full overflow-hidden">
                  <Image
                    src={divisionImage}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${cat.color}1A`, color: cat.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-accent font-heading font-bold uppercase tracking-widest text-[12px] block">
                        Division 0{idx + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-heading leading-tight">
                        {cat.label}
                      </h3>
                    </div>
                  </div>

                  <p className="text-body text-sm leading-relaxed font-light">
                    {cat.description}
                  </p>

                  <ul className="space-y-2.5 flex-grow">
                    {systems.map((system) => (
                      <li key={system.id} className="flex items-start text-sm text-heading font-medium">
                        <CheckCircle2 className="w-4.5 h-4.5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        {system.title}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Button href={serviceHref(cat.slug)} variant="primary" className="hover:scale-105 transition-transform duration-300" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                      Explore Division Systems
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ===================== OUR PROCESS SECTION ===================== */}
      <Section id="process" background="main" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">
            How We Work
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">
            Our Facade Engineering Process
          </h2>
          <p className="text-body max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            From initial blueprints to after-sales maintenance support, we check every millimeter of your custom glazing.
          </p>
        </div>

        <ProcessSection />
      </Section>

      {/* ===================== CONSULTATION CTA (light) ===================== */}
      <Section background="section">
        <div className="bg-card rounded-2xl p-8 md:p-16 shadow-lg border border-accent/30 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">
              Complimentary Facade Consulting
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight">
              Have architectural blueprints? Let us engineer the perfect match.
            </h2>

            <p className="text-body text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
              Upload your elevation drawings or hand-sketches. Our facade engineering team will analyze
              structural wind-loads, thermal criteria, and aesthetic requirements to recommend the ideal system profiles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button href="/request-quote" variant="primary" size="lg" className="hover:scale-105 transition-transform duration-300">
                Upload Elevation Blueprints
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-semibold py-3 px-5"
              >
                Speak with Lead Engineer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
