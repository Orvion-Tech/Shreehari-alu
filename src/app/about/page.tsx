"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  detail: "/why_shreehari_details.png",
  commercial: "/commercial_glass_facade.png",
  villa: "/villa_modern_glazing.png"
};

const values = [
  { step: "01", title: "Quality", desc: "Exacting materials, processes and checks." },
  { step: "02", title: "Innovation", desc: "Better systems for evolving architecture." },
  { step: "03", title: "Integrity", desc: "Clear advice, honest scope and accountability." },
  { step: "04", title: "Satisfaction", desc: "Responsive support before and after handover." },
  { step: "05", title: "Sustainability", desc: "Durable, recyclable, energy-aware solutions." }
];

const timeline = [
  { title: "Material control", desc: "Specified alloys, profile sections, coatings, glass, hardware, sealants and gaskets are reviewed for compatibility." },
  { title: "Process control", desc: "Critical dimensions, machining, assembly, drainage and finish are checked through fabrication." },
  { title: "Installation control", desc: "Substrate, level, anchors, perimeter sealing and operation are verified before handover." }
];

const advantages = [
  { title: "Premium Quality Materials", desc: "Carefully specified profiles, glass, hardware, gaskets, sealants and coatings." },
  { title: "Advanced Engineering", desc: "Solutions considered for spans, loads, movement, drainage and interfaces." },
  { title: "Weather Resistance", desc: "Layered water management and sealing details designed for local exposure." },
  { title: "Energy Efficiency", desc: "Glass and frame strategies that reduce unwanted heat and improve comfort." },
  { title: "Sound Insulation", desc: "Appropriate glass, seals and system selection for quieter interiors." },
  { title: "High Security", desc: "Robust sections, dependable locking and safety-conscious glazing options." },
  { title: "Sustainable Materials", desc: "Durable, recyclable aluminium paired with daylight and ventilation strategies." },
  { title: "Low Maintenance", desc: "Resilient finishes, accessible hardware and clear care recommendations." },
  { title: "Custom Designs", desc: "Configurations, finishes and details developed around the architecture." },
  { title: "Professional Installation", desc: "Trained teams, correct tools, interface checks and controlled handover." },
  { title: "After-Sales Support", desc: "Responsive advice, adjustment support and long-term maintenance guidance." }
];

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

export default function AboutPage() {
  return (
    <>
      {/* Page Hero (light) */}
      <section className="relative bg-section pt-28 pb-16 md:pt-32 md:pb-20 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="breadcrumbs text-xs md:text-sm text-body mb-6 flex items-center gap-2 font-heading uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-accent" />
            <span className="text-heading">About us</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Our story</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-heading mb-6 leading-[1.05] max-w-3xl tracking-tight">
            Built on precision.<br />Driven by possibility.
          </h1>
          <p className="text-base md:text-lg text-body max-w-xl leading-relaxed font-light">
            We bring engineering discipline and design sensitivity together to create aluminium systems worthy of exceptional architecture.
          </p>

          {/* Quick jump links to combined sections */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#why-choose-us" className="px-5 py-2.5 rounded-full text-[11px] font-heading font-bold uppercase tracking-widest text-primary bg-card border border-border shadow-sm hover:border-accent hover:text-accent transition-all">
              Why choose us
            </a>
            <a href="#industries" className="px-5 py-2.5 rounded-full text-[11px] font-heading font-bold uppercase tracking-widest text-primary bg-card border border-border shadow-sm hover:border-accent hover:text-accent transition-all">
              Industries we serve
            </a>
          </div>
        </div>
      </section>

      {/* Story Grid Section */}
      <Section background="main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <aside className="lg:col-span-5 space-y-4">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Company overview</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
              Every view deserves a better frame.
            </h2>
          </aside>
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <p className="text-body text-sm md:text-base leading-relaxed font-light">
              Shree Hari Alu was founded around a simple conviction: architectural aluminium should feel as considered as the spaces it defines.
            </p>
            <p className="text-body text-sm md:text-base leading-relaxed font-light">
              We work across residential, commercial, hospitality, institutional and industrial projects, supporting teams from early product selection through fabrication, site coordination, installation and handover. Our role is not merely to supply a window, door or facade. It is to resolve the complete interface between structure, glass, hardware, weather and daily use.
            </p>
            <p className="text-body text-sm md:text-base leading-relaxed font-light">
              That means asking better questions, documenting decisions clearly and respecting tolerances at every stage. The result is architecture that looks lighter, operates more smoothly and performs for the long term.
            </p>
            <div className="border-l-4 border-accent pl-6 py-3 font-heading font-bold text-heading text-base md:text-lg my-5 md:my-8 bg-card border border-border rounded-r-2xl shadow-sm">
              “Quality is not an inspection at the end. It is a decision repeated at every drawing, cut, corner and fixing.”
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision Section */}
      <Section background="section" className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
            <span className="text-accent text-[10px] uppercase tracking-widest font-heading font-bold block mb-2.5">Our mission</span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-heading mb-3.5 leading-snug tracking-tight">
              Deliver world-class aluminium architectural systems with exceptional quality and innovation.
            </h3>
            <p className="text-body text-sm leading-relaxed font-light">
              We make premium performance accessible through expert guidance, disciplined execution and transparent project ownership.
            </p>
          </div>
          <div className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
            <span className="text-accent text-[10px] uppercase tracking-widest font-heading font-bold block mb-2.5">Our vision</span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-heading mb-3.5 leading-snug tracking-tight">
              Become India’s most trusted aluminium architectural solutions provider.
            </h3>
            <p className="text-body text-sm leading-relaxed font-light">
              Trusted by designers for detail, by builders for delivery and by owners for lasting value.
            </p>
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section background="main">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-4">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">What guides us</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading leading-tight">
            Values you can see in the finished work.
          </h2>
          <p className="text-body max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            Our standards are practical. They shape the way we communicate, fabricate, install and stand behind every project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-2xl transition-all duration-500 flex flex-col justify-start">
              <span className="text-3xl font-heading font-bold block mb-2.5 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{v.step}</span>
              <div className="space-y-2">
                <h4 className="text-lg font-heading font-bold text-heading tracking-tight">{v.title}</h4>
                <p className="text-xs text-body leading-relaxed font-light">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Manufacturing Excellence Section (Split feature, light) */}
      <section className="relative flex flex-col lg:flex-row bg-section min-h-[550px] border-t border-b border-border">
        <div className="w-full lg:w-1/2 relative h-[350px] lg:h-auto">
          <Image
            src={IMAGES.detail}
            alt="Precision manufacturing facility details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Manufacturing excellence</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
            Precision begins before the site.
          </h2>
          <p className="text-body leading-relaxed text-sm md:text-base font-light">
            Controlled fabrication translates approved drawings into repeatable quality. Profiles are measured, machined, assembled and checked against system requirements before dispatch.
          </p>
          <ul className="space-y-3">
            {[
              "Approved material and hardware traceability",
              "Profile, drainage and corner-joint checks",
              "Glass and gasket compatibility review",
              "Pre-dispatch inspection and careful packaging"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-sm font-medium text-heading">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quality Standards Section */}
      <Section background="main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Quality standards</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
              Measured against the demands of the building.
            </h2>
            <p className="text-body leading-relaxed text-sm md:text-base pt-2 font-light">
              Performance is evaluated system by system, not assumed from appearance.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="relative border-l border-border pl-6 md:pl-8 space-y-6 md:space-y-10 py-2">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative space-y-2">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-background z-10"></span>
                  <h4 className="text-xl font-heading font-bold text-heading tracking-tight">{item.title}</h4>
                  <p className="text-body text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================= */}
      {/* WHY CHOOSE US (merged)                                        */}
      {/* ============================================================= */}
      <Section id="why-choose-us" background="section" className="scroll-mt-28 border-t border-border">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-4">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Why choose us</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading leading-tight">
            Eleven reasons. One accountable partner.
          </h2>
          <p className="text-body max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            Great outcomes come from aligned decisions across product, engineering, fabrication, installation and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-light">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </span>
                <h3 className="text-base font-heading font-bold text-heading tracking-tight">{adv.title}</h3>
                <p className="text-body text-xs leading-relaxed font-light">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats Band (Light Background) */}
      <section className="bg-background py-12 md:py-16 border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { count: "650+", label: "Project references" },
              { count: "25,000+", label: "Openings delivered" },
              { count: "42+", label: "Cities reached" },
              { count: "100%", label: "Quality ownership" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1.5 md:border-r border-border last:border-0">
                <div className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{stat.count}</div>
                <div className="text-[10px] text-body font-heading font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* INDUSTRIES (merged)                                           */}
      {/* ============================================================= */}
      <Section id="industries" background="main" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-4">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Industries we serve</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading leading-tight">
            Nine sectors. One exacting standard.
          </h2>
          <p className="text-body max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            We translate a project brief into the right combination of aluminium profiles, glass, hardware, interfaces and installation strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <div
              key={i}
              id={sector.id}
              className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between scroll-mt-28"
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

      {/* Split Feature: Residential Focus (light) */}
      <section className="relative flex flex-col lg:flex-row bg-section min-h-[480px] border-t border-b border-border">
        <div className="w-full lg:w-1/2 relative h-[280px] lg:h-auto">
          <Image
            src={IMAGES.villa}
            alt="Residential luxury villa architectural glazing details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Residential focus</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
            Comfort that is felt, not seen.
          </h2>
          <p className="text-body leading-relaxed text-sm md:text-base font-light">
            For homes and villas, we prioritise slim views, gentle operation, water tightness, acoustic privacy, safety and finish durability.
          </p>
          <ul className="space-y-2.5">
            {[
              "Slimline sliding and large-format openings",
              "Insect protection and fresh-air strategies",
              "Security hardware and child-safe options",
              "Coordinated railings, skylights and pergolas"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-sm font-medium text-heading">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Button href="/request-quote?sector=Residential" variant="primary" size="md" className="hover:scale-105 transition-transform duration-300">
              Discuss a Residence
            </Button>
          </div>
        </div>
      </section>

      {/* Split Feature: Commercial Focus (light) */}
      <section className="relative flex flex-col lg:flex-row-reverse bg-card min-h-[480px] border-b border-border">
        <div className="w-full lg:w-1/2 relative h-[280px] lg:h-auto">
          <Image
            src={IMAGES.commercial}
            alt="Commercial building envelope details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Commercial focus</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
            Facade performance at building scale.
          </h2>
          <p className="text-body leading-relaxed text-sm md:text-base font-light">
            Commercial envelopes demand engineering, procurement discipline and coordination. We plan for grid logic, movement, drainage, access and repeatable installation quality.
          </p>
          <ul className="space-y-2.5">
            {[
              "Curtain wall and structural glazing systems",
              "Glass, ACP, canopy and entrance integration",
              "Shop drawings and interface coordination",
              "Sequence planning and quality documentation"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-sm font-medium text-heading">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
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

      {/* CTA Section (light) */}
      <Section id="cta" background="section">
        <div className="bg-card rounded-2xl p-8 md:p-16 shadow-lg border border-border relative overflow-hidden text-center w-full">
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Work with us</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-heading leading-tight max-w-2xl mx-auto">
              Bring technical clarity to your next elevation.
            </h2>
            <p className="text-body text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Invite our team into the conversation early and let us help align architecture, performance and budget.
            </p>
            <div className="pt-4">
              <Button href="/request-quote" variant="primary" size="md" className="hover:scale-105 transition-transform duration-300">
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
