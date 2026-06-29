"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
};

const values = [
  { step: "01", title: "Quality", desc: "Exacting materials, processes and checks." },
  { step: "02", title: "Innovation", desc: "Better systems for evolving architecture." },
  { step: "03", title: "Integrity", desc: "Clear advice, honest scope and accountability." },
  { step: "04", title: "Satisfaction", desc: "Responsive support before and after handover." },
  { step: "05", title: "Sustainability", desc: "Durable, recyclable, energy-aware solutions." }
];

const expertise = [
  { step: "01 / Design", title: "System Advisory", desc: "Application review, opening strategy, glass build-up and finish selection." },
  { step: "02 / Engineering", title: "Technical Detailing", desc: "Shop drawings, interface checks, performance criteria and value engineering." },
  { step: "03 / Delivery", title: "Project Execution", desc: "Measurement, production planning, installation and site coordination." },
  { step: "04 / Care", title: "After-Sales Support", desc: "Handover guidance, adjustment support and maintenance recommendations." }
];

const timeline = [
  { title: "Material control", desc: "Specified alloys, profile sections, coatings, glass, hardware, sealants and gaskets are reviewed for compatibility." },
  { title: "Process control", desc: "Critical dimensions, machining, assembly, drainage and finish are checked through fabrication." },
  { title: "Installation control", desc: "Substrate, level, anchors, perimeter sealing and operation are verified before handover." }
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 pb-16 md:py-36 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image
            src={IMAGES.hero}
            alt="Luxury modern villa facade"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="breadcrumbs text-xs md:text-sm text-body/70 mb-6 flex items-center gap-2 font-heading uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-accent" />
            <span className="text-heading">About us</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Our story</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-6 leading-[1.1] max-w-3xl tracking-tight">
            Built on precision.<br />Driven by possibility.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-xl leading-relaxed font-light">
            We bring engineering discipline and design sensitivity together to create aluminium systems worthy of exceptional architecture.
          </p>
        </div>
      </section>

      {/* Story Grid Section */}
      <Section background="main" className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <aside className="lg:col-span-5 space-y-4">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Company overview</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
              Every view deserves a better frame.
            </h2>
          </aside>
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <p className="text-body/90 text-sm md:text-base leading-relaxed font-light">
              Shree Hari Alu was founded around a simple conviction: architectural aluminium should feel as considered as the spaces it defines.
            </p>
            <p className="text-body/90 text-sm md:text-base leading-relaxed font-light">
              We work across residential, commercial, hospitality, institutional and industrial projects, supporting teams from early product selection through fabrication, site coordination, installation and handover. Our role is not merely to supply a window, door or facade. It is to resolve the complete interface between structure, glass, hardware, weather and daily use.
            </p>
            <p className="text-body/90 text-sm md:text-base leading-relaxed font-light">
              That means asking better questions, documenting decisions clearly and respecting tolerances at every stage. The result is architecture that looks lighter, operates more smoothly and performs for the long term.
            </p>
            <div className="border-l-4 border-accent pl-5 py-2 italic font-heading font-bold text-heading text-base md:text-lg my-5 md:my-8 bg-section/30 pr-4 rounded-r-lg">
              “Quality is not an inspection at the end. It is a decision repeated at every drawing, cut, corner and fixing.”
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision Section */}
      <Section background="section" className="relative overflow-hidden border-t border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
          <div className="bg-card p-6 md:p-10 rounded-3xl border border-border hover:border-accent/45 transition-all duration-500 shadow-lg">
            <span className="text-accent text-[10px] uppercase tracking-widest font-heading font-bold block mb-2.5">Our mission</span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-heading mb-3.5 leading-snug tracking-tight">
              Deliver world-class aluminium architectural systems with exceptional quality and innovation.
            </h3>
            <p className="text-body/90 text-sm leading-relaxed font-light">
              We make premium performance accessible through expert guidance, disciplined execution and transparent project ownership.
            </p>
          </div>
          <div className="bg-card p-6 md:p-10 rounded-3xl border border-border hover:border-accent/45 transition-all duration-500 shadow-lg">
            <span className="text-accent text-[10px] uppercase tracking-widest font-heading font-bold block mb-2.5">Our vision</span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-heading mb-3.5 leading-snug tracking-tight">
              Become India’s most trusted aluminium architectural solutions provider.
            </h3>
            <p className="text-body/90 text-sm leading-relaxed font-light">
              Trusted by designers for detail, by builders for delivery and by owners for lasting value.
            </p>
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section background="main" className="">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">What guides us</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading">
            Values you can see in the finished work.
          </h2>
          <p className="text-body/80 text-sm md:text-base leading-relaxed mt-4 font-light">
            Our standards are practical. They shape the way we communicate, fabricate, install and stand behind every project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:border-accent/40 transition-all duration-350 flex flex-col justify-start">
              <span className="text-accent text-3xl font-heading font-bold block mb-2.5">{v.step}</span>
              <div className="space-y-2">
                <h4 className="text-lg font-heading font-bold text-heading tracking-tight">{v.title}</h4>
                <p className="text-xs text-body/85 leading-relaxed font-light">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Manufacturing Excellence Section (Split features, Cream background) */}
      <section className="relative flex flex-col lg:flex-row bg-section text-body min-h-[550px] border-t border-b border-border">
        <div className="w-full lg:w-1/2 relative h-[350px] lg:h-auto">
          <Image
            src={IMAGES.commercial}
            alt="Precision manufacturing facility details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#001518]/5" />
        </div>
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center space-y-4">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Manufacturing excellence</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">
            Precision begins before the site.
          </h2>
          <p className="text-body/85 leading-relaxed text-sm md:text-base font-light">
            Controlled fabrication translates approved drawings into repeatable quality. Profiles are measured, machined, assembled and checked against system requirements before dispatch.
          </p>
          <ul className="space-y-4">
            {[
              "Approved material and hardware traceability",
              "Profile, drainage and corner-joint checks",
              "Glass and gasket compatibility review",
              "Pre-dispatch inspection and careful packaging"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-sm font-semibold text-heading">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team Expertise Section */}
      <Section background="main" className="">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Team expertise</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading">
            Specialists who understand the whole opening.
          </h2>
          <p className="text-body/85 text-sm md:text-base leading-relaxed mt-4 font-light">
            Our project teams connect architectural intent, structural logic, fabrication reality and installation sequence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {expertise.map((exp, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:border-accent/40 transition-all duration-300 space-y-3">
              <span className="text-accent text-[10px] font-heading font-bold tracking-widest uppercase block border-b border-border pb-2">{exp.step}</span>
              <h4 className="text-lg font-heading font-bold text-heading tracking-tight">{exp.title}</h4>
              <p className="text-xs text-body/80 leading-relaxed font-light">{exp.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quality Standards Section */}
      <Section background="section" className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Quality standards</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading leading-tight tracking-tight">
              Measured against the demands of the building.
            </h2>
            <p className="text-body/80 leading-relaxed text-sm md:text-base pt-2 font-light">
              Performance is evaluated system by system, not assumed from appearance.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="relative border-l border-accent/25 pl-6 md:pl-8 space-y-6 md:space-y-10 py-2">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative space-y-2">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-section z-10"></span>
                  <h4 className="text-xl font-heading font-bold text-heading tracking-tight">{item.title}</h4>
                  <p className="text-body/80 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" background="main" className="">
        <div className="luxury-glass-light rounded-[32px] p-8 md:p-16 shadow-xl relative overflow-hidden text-center w-full border border-accent/30">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 cad-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Work with us</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight max-w-2xl mx-auto">
              Bring technical clarity to your next elevation.
            </h2>
            <p className="text-body/80 text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Invite our team into the conversation early and let us help align architecture, performance and budget.
            </p>
            <div className="pt-4">
              <Button href="/request-quote" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
