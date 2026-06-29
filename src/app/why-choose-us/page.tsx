"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  pergola: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
};

const advantages = [
  { icon: "◆", title: "Premium Quality Materials", desc: "Carefully specified profiles, glass, hardware, gaskets, sealants and coatings." },
  { icon: "📐", title: "Advanced Engineering", desc: "Solutions considered for spans, loads, movement, drainage and interfaces." },
  { icon: "☔", title: "Weather Resistance", desc: "Layered water management and sealing details designed for local exposure." },
  { icon: "☀", title: "Energy Efficiency", desc: "Glass and frame strategies that reduce unwanted heat and improve comfort." },
  { icon: "≈", title: "Sound Insulation", desc: "Appropriate glass, seals and system selection for quieter interiors." },
  { icon: "▱", title: "High Security", desc: "Robust sections, dependable locking and safety-conscious glazing options." },
  { icon: "♻", title: "Sustainable Materials", desc: "Durable, recyclable aluminium paired with daylight and ventilation strategies." },
  { icon: "✓", title: "Low Maintenance", desc: "Resilient finishes, accessible hardware and clear care recommendations." },
  { icon: "✦", title: "Custom Designs", desc: "Configurations, finishes and details developed around the architecture." },
  { icon: "🛠", title: "Professional Installation", desc: "Trained teams, correct tools, interface checks and controlled handover." },
  { icon: "∞", title: "After-Sales Support", desc: "Responsive advice, adjustment support and long-term maintenance guidance." }
];

const deliverySteps = [
  { step: "01 / Understand", title: "Project Discovery", desc: "Brief, drawings, site context, performance goals and programme." },
  { step: "02 / Resolve", title: "System Engineering", desc: "Configuration, glass, hardware, interfaces, samples and approvals." },
  { step: "03 / Deliver", title: "Fabricate & Install", desc: "Controlled production, logistics, installation and quality checks." },
  { step: "04 / Support", title: "Handover & Care", desc: "Operation guidance, documentation, adjustment and after-sales help." }
];

export default function WhyChooseUsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section className="relative py-20 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image
            src={IMAGES.hero}
            alt="The Shree Hari standard"
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
            <span className="text-heading">Why choose us</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">The Shree Hari standard</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Details that protect the big idea.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            Our job is to preserve design intent while making every system reliable, buildable and satisfying to use.
          </p>
        </div>
      </section>

      {/* 11 Reasons Section */}
      <Section background="main">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Why choose us</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">
            Eleven reasons. One accountable partner.
          </h2>
          <p className="text-body/85 text-xs md:text-sm leading-relaxed mt-3 font-light">
            Great outcomes come from aligned decisions across product, engineering, fabrication, installation and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-card p-6 md:p-8 rounded-3xl border border-border hover:border-accent/35 transition-all duration-350 flex flex-col justify-between shadow-xl hover:-translate-y-1">
              <div className="space-y-3">
                <span className="text-accent text-xl font-heading font-bold block">{adv.icon}</span>
                <h3 className="text-base font-heading font-bold text-heading tracking-tight">{adv.title}</h3>
                <p className="text-body text-xs leading-relaxed font-light">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats Band (Light Background) */}
      <section className="bg-section py-12 border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { count: "650+", label: "Project references" },
              { count: "25,000+", label: "Openings delivered" },
              { count: "42+", label: "Cities reached" },
              { count: "100%", label: "Quality ownership" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1 md:border-r border-border last:border-0">
                <div className="text-2xl md:text-4xl font-heading font-bold text-heading tracking-tight">{stat.count}</div>
                <div className="text-[10px] text-body/70 font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Delivery Method (Cream background) */}
      <Section background="section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Our delivery method</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">
            A clear path from intent to installation.
          </h2>
          <p className="text-body/85 text-xs md:text-sm leading-relaxed mt-3 font-light">
            Each stage has an owner, a decision point and an output your project team can review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverySteps.map((step, idx) => (
            <div key={idx} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-accent/10 shadow-md hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-accent text-[10px] font-heading font-bold tracking-widest block mb-3 border-b border-accent/10 pb-1">{step.step}</span>
                <h4 className="text-base font-heading font-bold text-heading mb-2 tracking-tight">{step.title}</h4>
                <p className="text-xs text-body/80 leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Made for Indian Conditions */}
      <Section background="main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Made for Indian conditions</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
              International thinking. Local understanding.
            </h2>
            <p className="text-body text-base md:text-lg font-light leading-relaxed">
              Dust, heat, monsoon rain, coastal air, intense use and varied workmanship all affect system performance.
            </p>
            <p className="text-body/80 leading-relaxed text-xs md:text-sm font-light">
              Our detailing considers the real site, not an ideal diagram. That practical intelligence helps protect both the architecture and the owner’s investment.
            </p>
            <div className="pt-2">
              <Button href="/request-quote" variant="primary" size="md">
                Review Your Requirement
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-2xl premium-border gold-glow">
              <Image
                src={IMAGES.pergola}
                alt="Weather-ready aluminium pergola and glazing system"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" background="section">
        <div className="luxury-glass-light rounded-[32px] p-8 md:p-16 shadow-xl relative overflow-hidden text-center w-full border border-accent/30">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 cad-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Specify with confidence</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight max-w-2xl mx-auto">
              Let’s resolve the performance behind the elevation.
            </h2>
            <p className="text-body/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              Send us your openings, elevations or concept package for a focused technical conversation.
            </p>
            <div className="pt-2">
              <Button href="/request-quote" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
                Request Consultation
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
