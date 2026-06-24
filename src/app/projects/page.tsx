"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  pergola: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
};

const filterCategories = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "hospitality", label: "Hospitality" },
  { id: "institutional", label: "Institutional" },
  { id: "industrial", label: "Industrial" }
];

const projects = [
  {
    id: 1,
    category: "residential",
    eyebrow: "Luxury villa",
    title: "Courtyard House",
    desc: "Large glazed openings frame garden courts while a restrained charcoal system keeps the architecture visually calm.",
    location: "Ahmedabad, Gujarat",
    scope: "Windows, doors, railings",
    product: "Slimline sliding · Casement",
    type: "Private residence",
    img: IMAGES.villa
  },
  {
    id: 2,
    category: "commercial",
    eyebrow: "Corporate office",
    title: "Meridian Business House",
    desc: "A disciplined glass grid, integrated entrance canopy and high-performance vision areas define a confident headquarters.",
    location: "Surat, Gujarat",
    scope: "Complete building envelope",
    product: "Curtain wall · Structural glazing",
    type: "Commercial building",
    img: IMAGES.commercial
  },
  {
    id: 3,
    category: "hospitality",
    eyebrow: "Hotel & resort",
    title: "Aranya Terrace",
    desc: "Motorised pergolas and folding glazed doors let the restaurant shift seamlessly between open-air and protected service.",
    location: "Udaipur, Rajasthan",
    scope: "Terrace enclosure",
    product: "Pergola · Bi-fold doors",
    type: "Hospitality",
    img: IMAGES.pergola
  },
  {
    id: 4,
    category: "residential",
    eyebrow: "Apartments",
    title: "Skyline Residences",
    desc: "Repeatable, weather-ready openings combine generous daylight with integrated insect protection and safe hardware.",
    location: "Vadodara, Gujarat",
    scope: "420 apartment openings",
    product: "Sliding · Fixed · Screens",
    type: "Residential development",
    img: IMAGES.villa
  },
  {
    id: 5,
    category: "institutional",
    eyebrow: "Healthcare & education",
    title: "Nova Care Institute",
    desc: "Controlled daylight, secure ventilation and robust, easy-care finishes support a calm and practical care environment.",
    location: "Rajkot, Gujarat",
    scope: "Facade, windows, partitions",
    product: "Casement · Curtain wall",
    type: "Hospital & training centre",
    img: IMAGES.commercial
  },
  {
    id: 6,
    category: "industrial",
    eyebrow: "Industrial",
    title: "Apex Manufacturing Campus",
    desc: "A practical facade, high-level ventilation and glazed office partitions bring clarity to a demanding production campus.",
    location: "Sanand, Gujarat",
    scope: "Administrative and factory blocks",
    product: "ACP facade · Louvers · Partitions",
    type: "Industrial project",
    img: IMAGES.commercial
  }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Page Hero */}
      <section className="relative py-20 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image 
            src={IMAGES.hero} 
            alt="Premium aluminium architectural projects" 
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
            <span className="text-heading">Projects</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Selected work</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Ideas delivered at building scale.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            A cross-section of residential, commercial, hospitality, institutional and industrial expertise.
          </p>
        </div>
      </section>

      {/* Projects Directory List Section */}
      <Section background="main">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Project showcase</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading leading-tight tracking-tight">
              Different briefs. Distinct responses.
            </h2>
          </div>
          <p className="text-body max-w-md text-sm leading-relaxed font-light">
            Each project is shown with its setting, aluminium scope and primary system selection.
          </p>
        </div>

        {/* Filter Bar Navigation */}
        <div className="flex flex-wrap justify-center border-b border-border mb-12 gap-2 relative">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-3 font-heading font-bold text-xs tracking-wider uppercase relative transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-accent" : "text-body/60 hover:text-heading"
                }`}
              >
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Horizontal Row Projects List */}
        <div className="space-y-12 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col lg:flex-row gap-8 items-stretch bg-card p-5 md:p-6 rounded-3xl border border-border hover:border-accent/40 transition-all duration-500 shadow-lg hover:shadow-2xl ${
                  idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-auto rounded-2xl overflow-hidden shadow-lg group">
                  <Image 
                    src={project.img} 
                    alt={project.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#001518]/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-5 py-1">
                  <div className="space-y-2">
                    <span className="text-accent text-[10px] font-bold tracking-widest font-heading uppercase block">{project.eyebrow}</span>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-heading leading-snug">{project.title}</h3>
                    <p className="text-body text-xs md:text-sm leading-relaxed font-light">{project.desc}</p>
                  </div>

                  {/* Metadata Specs Table */}
                  <div className="grid grid-cols-2 gap-4 bg-section/70 backdrop-blur-sm p-4 rounded-2xl border border-border">
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider font-heading font-bold text-body/60 block">Location</span>
                      <strong className="text-xs text-heading font-semibold">{project.location}</strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider font-heading font-bold text-body/60 block">Scope</span>
                      <strong className="text-xs text-heading font-semibold">{project.scope}</strong>
                    </div>
                    <div className="h-[1px] bg-border col-span-2"></div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider font-heading font-bold text-body/60 block">Product used</span>
                      <strong className="text-xs text-heading font-semibold">{project.product}</strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider font-heading font-bold text-body/60 block">Project type</span>
                      <strong className="text-xs text-heading font-semibold">{project.type}</strong>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" background="section">
        <div className="luxury-glass-light rounded-[32px] p-8 md:p-16 shadow-xl relative overflow-hidden text-center max-w-5xl mx-auto border border-accent/30">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 cad-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Your project could be next</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight max-w-2xl mx-auto">
              Share the elevation. Let’s define what it can become.
            </h2>
            <p className="text-body/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              We welcome residential, villa, apartment, commercial, hotel, healthcare, education and industrial enquiries.
            </p>
            <div className="pt-2">
              <Button href="/request-quote" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
                Submit a Project Brief
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
