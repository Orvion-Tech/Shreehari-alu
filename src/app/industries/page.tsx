"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
};

const sectors = [
  { num: "01", title: "Residential", desc: "Weather protection, acoustic comfort and easy operation for apartments and private homes.", id: "residential" },
  { num: "02", title: "Luxury Villas", desc: "Minimal sightlines, large panels, pivot entrances, pergolas and seamless indoor-outdoor living." },
  { num: "03", title: "Commercial", desc: "Efficient facades, repeatable quality and durable systems for offices and mixed-use developments.", id: "commercial" },
  { num: "04", title: "Hotels & Resorts", desc: "Guest comfort, quiet rooms, memorable arrivals and refined outdoor experiences." },
  { num: "05", title: "Healthcare", desc: "Daylight, cleanability, controlled ventilation and dependable operation for care environments." },
  { num: "06", title: "Education", desc: "Robust windows, safe glazing and sun control for classrooms, campuses and institutions." },
  { num: "07", title: "Industrial", desc: "Large-scale ventilation, durable openings, partitions and facade systems built for demanding use.", id: "industrial" },
  { num: "08", title: "Retail", desc: "Transparent shopfronts, folding openings and premium entrances that support brand experience." },
  { num: "09", title: "Government", desc: "Documented performance, maintainability and long-life solutions for public infrastructure." }
];

export default function IndustriesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative py-12 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image
            src={IMAGES.hero}
            alt="Premium architectural systems for industries"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="breadcrumbs text-xs text-body/70 mb-4 flex items-center gap-2 font-heading uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-accent" />
            <span className="text-heading">Industries</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Sector expertise</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Systems shaped around how buildings live.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            Every sector brings different users, rhythms, risks and performance priorities. Our solutions respond accordingly.
          </p>
        </div>
      </section>

      {/* Industries Sectors Grid Section */}
      <Section background="main">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Industries we serve</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">
            Nine sectors. One exacting standard.
          </h2>
          <p className="text-body/85 text-xs md:text-sm leading-relaxed mt-3 font-light">
            We translate a project brief into the right combination of aluminium profiles, glass, hardware, interfaces and installation strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <div
              key={i}
              id={sector.id}
              className="bg-card p-6 md:p-8 rounded-3xl border border-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between scroll-mt-28 shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                <span className="text-accent text-xs font-heading font-bold tracking-wider block border-b border-border pb-2">{sector.num}</span>
                <h3 className="text-lg font-heading font-bold text-heading tracking-tight">{sector.title}</h3>
                <p className="text-body text-xs leading-relaxed font-light">{sector.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Split Feature: Residential Focus (Light section) */}
      <section className="relative flex flex-col lg:flex-row bg-section text-body min-h-[480px] border-t border-b border-border">
        <div className="w-full lg:w-1/2 relative h-[280px] lg:h-auto">
          <Image
            src={IMAGES.villa}
            alt="Residential luxury villa architectural glazing details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#001518]/5" />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Residential focus</span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
            Comfort that is felt, not seen.
          </h2>
          <p className="text-body/80 leading-relaxed text-xs md:text-sm font-light">
            For homes and villas, we prioritise slim views, gentle operation, water tightness, acoustic privacy, safety and finish durability.
          </p>
          <ul className="space-y-2">
            {[
              "Slimline sliding and large-format openings",
              "Insect protection and fresh-air strategies",
              "Security hardware and child-safe options",
              "Coordinated railings, skylights and pergolas"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-xs md:text-sm font-semibold text-heading">
                <CheckCircle2 className="w-4.5 h-4.5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Button href="/request-quote?sector=Residential" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
              Discuss a Residence
            </Button>
          </div>
        </div>
      </section>

      {/* Split Feature: Commercial Focus (Light section) */}
      <section className="relative flex flex-col lg:flex-row-reverse bg-white text-body min-h-[480px] border-b border-border">
        <div className="w-full lg:w-1/2 relative h-[280px] lg:h-auto">
          <Image
            src={IMAGES.commercial}
            alt="Commercial building envelope details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-primary/20" />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Commercial focus</span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
            Facade performance at building scale.
          </h2>
          <p className="text-body/80 leading-relaxed text-xs md:text-sm font-light">
            Commercial envelopes demand engineering, procurement discipline and coordination. We plan for grid logic, movement, drainage, access and repeatable installation quality.
          </p>
          <ul className="space-y-2">
            {[
              "Curtain wall and structural glazing systems",
              "Glass, ACP, canopy and entrance integration",
              "Shop drawings and interface coordination",
              "Sequence planning and quality documentation"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-xs md:text-sm font-semibold text-heading">
                <CheckCircle2 className="w-4.5 h-4.5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Button href="/request-quote?sector=Commercial" variant="primary" size="md">
              Discuss a Commercial Project
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Section id="cta" background="section">
        <div className="luxury-glass-light rounded-[32px] p-8 md:p-16 shadow-xl relative overflow-hidden text-center w-full border border-accent/30">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 cad-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Sector-specific consultation</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight max-w-2xl mx-auto">
              Tell us how the building needs to perform.
            </h2>
            <p className="text-body/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              We will help define the aluminium systems, glass, hardware and execution strategy to make it happen.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
                Talk to a Specialist
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
